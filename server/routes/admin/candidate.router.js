import express from "express";
import {
  addNotes,
  getAllCandidatesForJob,
  getAllCandidatesWithStats,
  getCandidateById,
  getCandidateJobs,
  getQuestionnaireDetails,
  getRandomQuestions,
  shortlistCandidate,
  submitQuestionnaireAttempt,
  toggleShortlistCandidate,
  updateCandidateProfessionalDetails,
  updateStatusAndStage,
  uploadAssessmentRecording,
} from "../../controllers/admin/candidate.controller.js";
import { protect, protectCandidate, roleProtect } from "../../middlewares/authMiddleware.js";
import { uploadVideo  } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get('/shortlisted',shortlistCandidate);
router.get("/getData/data/allCandidatesWithStats",protect, getAllCandidatesWithStats);

router.get("/:jobId", getAllCandidatesForJob);

router.get("/:candidateId/job/:jobId", getCandidateById);

router.post('/:candidateId/job/:jobId/shortlist',toggleShortlistCandidate);

router.post("/:candidateId/:jobId/addNotes", addNotes);

router.patch("/update-candidate/:id/:jobId",protect, roleProtect(["Hiring Manager","Admin"]), updateCandidateProfessionalDetails);

router.get("/:candidateId/jobs",protect, roleProtect(["Admin","Hiring Manager"]), getCandidateJobs);

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
