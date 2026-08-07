import fs from "fs";
import os from "os";
import path from "path";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { VoiceInterviewSession } from "../../models/candidate/voiceInterviewSession.model.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates as Candidate } from "../../models/candidate/candidate.model.js";
import { uploadToS3 } from "../../utils/s3utility.js";
import { synthesizeQuestionAudio } from "../../utils/pollyTTS.js";
import { transcribeAudio } from "../../utils/geminiSTT.js";
import { sendEmail } from "../../utils/sentEmail.js";
import { getVoiceInterviewClosingContent } from "../../utils/emailTemplates.js";
import { captureError } from "../../utils/errorHandler.js";

const MAX_RETRIES_PER_QUESTION = 2;

/**
 * Lazily generates + caches TTS audio for a question snapshot on the session.
 */
async function ensureQuestionAudio(session, questionIndex) {
  const question = session.questions[questionIndex];
  if (question.audioUrl) return question.audioUrl;

  let spokenText = question.text;
  if (question.options?.length) {
    spokenText += ` Your options are: ${question.options.join(", ")}.`;
  }

  const audioUrl = await synthesizeQuestionAudio(spokenText);
  session.questions[questionIndex].audioUrl = audioUrl;
  await session.save();
  return audioUrl;
}

function buildQuestionResponsePayload(session) {
  const totalQuestions = session.questions.length;

  if (session.status === "completed") {
    return {
      success: true,
      status: "completed",
      totalQuestions,
    };
  }

  const question = session.questions[session.currentQuestionIndex];
  return {
    success: true,
    status: session.status,
    currentQuestionIndex: session.currentQuestionIndex,
    totalQuestions,
    question: {
      questionId: question.questionId,
      type: question.type,
      text: question.text,
      options: question.options,
      required: question.required,
      audioUrl: question.audioUrl,
    },
  };
}

/**
 * Writes the candidate's answer onto their embedded jobApplications[].questionResponses
 * (same array the text apply form uses). Applications have _id:false, so we match by jobId.
 *
 * Throws if matchedCount/modifiedCount is 0 — arrayFilters typos fail silently otherwise.
 */
async function writeAnswerToApplication({ candidateId, jobId, questionId, answer }) {
  const jobObjectId =
    jobId instanceof mongoose.Types.ObjectId
      ? jobId
      : new mongoose.Types.ObjectId(jobId);

  const result = await Candidate.updateOne(
    { _id: candidateId, "jobApplications.jobId": jobObjectId },
    {
      $push: {
        "jobApplications.$[app].questionResponses": { questionId, answer },
      },
    },
    {
      arrayFilters: [{ "app.jobId": jobObjectId }],
    }
  );

  if (result.matchedCount === 0) {
    throw new Error(
      `writeAnswerToApplication: no jobApplication matched for candidate=${candidateId} jobId=${jobId}`
    );
  }
  if (result.modifiedCount === 0) {
    throw new Error(
      `writeAnswerToApplication: matched but questionResponses not modified for candidate=${candidateId} jobId=${jobId}`
    );
  }

  return result;
}

/**
 * GET /api/v1/candidate/voice-interview/:jobId
 * Creates a session on first visit (upsert on candidateId+jobId), or resumes in-progress.
 */
export async function getOrCreateSession(req, res) {
  const { jobId } = req.params;
  const candidateId = req.candidate._id;

  try {
    let session = await VoiceInterviewSession.findOne({ candidateId, jobId });

    if (!session) {
      const job = await jobs.findById(jobId).populate("company_id");
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found." });
      }
      if (!job.questions || job.questions.length === 0) {
        return res.status(400).json({
          success: false,
          message: "This job has no interview questions configured.",
        });
      }

      // Answers are written onto jobApplications[].questionResponses — refuse
      // to start if there is no matching application (would fail silently/mid-turn).
      const hasApplication = req.candidate.jobApplications?.some(
        (app) => app.jobId?.toString() === jobId.toString()
      );
      if (!hasApplication) {
        return res.status(400).json({
          success: false,
          message:
            "No application found for this job. Apply to the job before starting the voice interview.",
        });
      }

      const companyId = job.company_id?._id ?? job.company_id;
      if (!companyId) {
        return res.status(400).json({
          success: false,
          message: "Job is missing company scoping (company_id).",
        });
      }

      const questionSnapshots = job.questions.map((q) => ({
        questionId: q._id,
        type: q.type,
        text: q.text,
        options: q.options,
        required: q.required,
        answerType: q.answerType,
      }));

      session = await VoiceInterviewSession.create({
        candidateId,
        jobId,
        companyId,
        status: "in_progress",
        questions: questionSnapshots,
        startedAt: new Date(),
      });
    }

    if (session.status !== "completed") {
      await ensureQuestionAudio(session, session.currentQuestionIndex);
    }

    return res.status(200).json(buildQuestionResponsePayload(session));
  } catch (err) {
    captureError(err, {
      file: "voiceInterview.controller.js",
      action: "getOrCreateSession",
      role: "candidate",
    });
    return res
      .status(500)
      .json({ success: false, message: "Failed to load interview session." });
  }
}

/**
 * POST /api/v1/candidate/voice-interview/:jobId/answer
 * Synchronous per-turn: upload + STT (or tap) + advance in one request/response.
 *
 * Expects EITHER:
 *  - multipart/form-data with `audio` file (question type: 'text')
 *  - JSON body { selectedAnswer } (type: 'multiple' | 'multi-select')
 */
export async function submitAnswer(req, res) {
  const { jobId } = req.params;
  const candidateId = req.candidate._id;

  try {
    const session = await VoiceInterviewSession.findOne({ candidateId, jobId });
    if (!session || session.status === "completed") {
      return res
        .status(400)
        .json({ success: false, message: "No active interview session." });
    }

    const questionIndex = session.currentQuestionIndex;
    const question = session.questions[questionIndex];

    let responseEntry;

    if (question.type === "text") {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Audio file is required for this question.",
        });
      }

      const tempPath = path.join(os.tmpdir(), `answer-${uuidv4()}.webm`);
      fs.writeFileSync(tempPath, req.file.buffer);

      let transcript;
      try {
        transcript = await transcribeAudio(req.file.buffer, req.file.mimetype);
      } catch (sttErr) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

        if (session.currentQuestionRetryCount < MAX_RETRIES_PER_QUESTION) {
          session.currentQuestionRetryCount += 1;
          await session.save();
          return res.status(422).json({
            success: false,
            retry: true,
            retriesRemaining:
              MAX_RETRIES_PER_QUESTION - session.currentQuestionRetryCount,
            message:
              "We couldn't hear that clearly — please try answering again.",
          });
        }

        session.responses.push({
          questionId: question.questionId,
          inputMethod: "voice",
          transcript: "[transcription failed after retries]",
          retryCount: session.currentQuestionRetryCount,
        });
        session.currentQuestionIndex += 1;
        session.currentQuestionRetryCount = 0;
        await session.save();

        if (session.currentQuestionIndex >= session.questions.length) {
          return res.status(200).json(await completeSession(session));
        }

        await ensureQuestionAudio(session, session.currentQuestionIndex);
        return res.status(200).json({
          ...buildQuestionResponsePayload(session),
          skippedDueToError: true,
        });
      }

      const audioUrl = await uploadToS3(tempPath, "voice-interview-responses");

      responseEntry = {
        questionId: question.questionId,
        inputMethod: "voice",
        audioUrl,
        transcript,
        durationSeconds: req.body.durationSeconds
          ? Number(req.body.durationSeconds)
          : undefined,
        retryCount: session.currentQuestionRetryCount,
      };

      await writeAnswerToApplication({
        candidateId,
        jobId,
        questionId: question.questionId,
        answer: transcript,
      });
    } else {
      const { selectedAnswer } = req.body;
      if (selectedAnswer === undefined || selectedAnswer === null) {
        return res.status(400).json({
          success: false,
          message: "selectedAnswer is required for this question.",
        });
      }

      responseEntry = {
        questionId: question.questionId,
        inputMethod: "tap",
        selectedAnswer,
        retryCount: 0,
      };

      await writeAnswerToApplication({
        candidateId,
        jobId,
        questionId: question.questionId,
        answer: selectedAnswer,
      });
    }

    session.responses.push(responseEntry);
    session.currentQuestionIndex += 1;
    session.currentQuestionRetryCount = 0;
    await session.save();

    if (session.currentQuestionIndex >= session.questions.length) {
      return res.status(200).json(await completeSession(session));
    }

    await ensureQuestionAudio(session, session.currentQuestionIndex);
    return res.status(200).json(buildQuestionResponsePayload(session));
  } catch (err) {
    captureError(err, {
      file: "voiceInterview.controller.js",
      action: "submitAnswer",
      role: "candidate",
    });
    return res
      .status(500)
      .json({ success: false, message: "Failed to submit answer." });
  }
}

/**
 * Marks the session complete and sends the closing email via SES pipeline.
 */
async function completeSession(session) {
  session.status = "completed";
  session.completedAt = new Date();
  await session.save();

  try {
    const candidate = await Candidate.findById(session.candidateId);
    const job = await jobs.findById(session.jobId).select("jobTitle");
    if (candidate?.email) {
      const content = getVoiceInterviewClosingContent(
        candidate.firstName || "there",
        job?.jobTitle || "the role"
      );
      await sendEmail(
        candidate.email,
        "Your interview is complete",
        content
      );
    }
  } catch (emailErr) {
    captureError(emailErr, {
      file: "voiceInterview.controller.js",
      action: "completeSession",
      role: "candidate",
    });
  }

  return {
    success: true,
    status: "completed",
    totalQuestions: session.questions.length,
  };
}
