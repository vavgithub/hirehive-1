import express from "express";
import {
  getAllCandidatesForJob,
  getAllCandidatesWithStats,
  getCandidateById,
  getQuestionnaireDetails,
  getRandomQuestions,
  submitQuestionnaireAttempt,
  updateStatusAndStage,
  uploadAssessmentRecording,
} from "../../controllers/admin/candidate.controller.js";
import { protectCandidate } from "../../middlewares/authMiddleware.js";
import { uploadVideo  } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/getData/data/allCandidatesWithStats", getAllCandidatesWithStats);

router.get("/:jobId", getAllCandidatesForJob);
// router.get('/data/:id', getCandidateById);
router.get("/:candidateId/job/:jobId", getCandidateById);

router.patch("/update/:id", updateStatusAndStage);

router.get("/questions/random", getRandomQuestions);

router.post("/questionnaire/:candidateId/", submitQuestionnaireAttempt);

router.post(
    '/upload-recording',
    protectCandidate,
    uploadVideo,
    uploadAssessmentRecording
  );

router.get("/assessment/:candidateId", getQuestionnaireDetails);

export default router;
