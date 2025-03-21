import express from "express";
import {
  getAllCandidatesForJob,
  getAllCandidatesWithStats,
  getCandidateById,
  getCandidateJobs,
  getQuestionnaireDetails,
  getRandomQuestions,
  submitQuestionnaireAttempt,
  updateCandidateProfessionalDetails,
  updateStatusAndStage,
  uploadAssessmentRecording,
} from "../../controllers/admin/candidate.controller.js";
import { protect, protectCandidate, roleProtect } from "../../middlewares/authMiddleware.js";
import { uploadVideo  } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/getData/data/allCandidatesWithStats", getAllCandidatesWithStats);

router.get("/:jobId", getAllCandidatesForJob);
// router.get('/data/:id', getCandidateById);
router.get("/:candidateId/job/:jobId", getCandidateById);

router.patch("/update-candidate/:id/:jobId",protect, roleProtect(["Hiring Manager","Admin"]), updateCandidateProfessionalDetails);

router.get("/:candidateId/jobs",protect, roleProtect("Hiring Manager"), getCandidateJobs);

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
