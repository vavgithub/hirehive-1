import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Snapshot of a single question, copied from job.questions at session
 * creation time. We snapshot rather than reference live so that an admin
 * editing question wording mid-flight doesn't change what an in-progress
 * candidate is answering.
 */
const questionSnapshotSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    type: {
      type: String,
      enum: ["multiple", "text", "multi-select"],
      required: true,
    },
    text: { type: String, required: true },
    options: [String],
    required: { type: Boolean, default: false },
    answerType: {
      type: String,
      enum: ["array", "text", "number", "link"],
      default: "text",
    },
    // Polly TTS audio — S3 object key in VOICE_INTERVIEW_S3_BUCKET (not a public URL).
    // Generated lazily on first fetch; clients get a fresh presigned GET on each response.
    audioUrl: String,
  },
  { _id: false }
);

const responseSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    inputMethod: { type: String, enum: ["voice", "tap"], required: true },
    // Candidate response audio — S3 object key (presigned GET minted on read).
    audioUrl: String,
    transcript: String,
    durationSeconds: Number,
    // Mixed because multi-select answers are arrays, multiple/text are strings.
    selectedAnswer: Schema.Types.Mixed,
    retryCount: { type: Number, default: 0 },
    respondedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const voiceInterviewSessionSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      // Model is registered as "candidates" (see candidate.model.js)
      ref: "candidates",
      required: true,
      index: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
      index: true,
    },
    // Mirrors candidate.jobApplications[].companyDetails._id convention
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed", "abandoned", "failed"],
      default: "not_started",
      index: true,
    },
    questions: [questionSnapshotSchema],
    currentQuestionIndex: { type: Number, default: 0 },
    currentQuestionRetryCount: { type: Number, default: 0 },
    responses: [responseSchema],
    startedAt: Date,
    completedAt: Date,
    // Hook for a future cleanup job (none exists yet — see scheduledJobs.js pattern)
    lastError: String,
  },
  { timestamps: true }
);

voiceInterviewSessionSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export const VoiceInterviewSession = mongoose.model(
  "VoiceInterviewSession",
  voiceInterviewSessionSchema
);
