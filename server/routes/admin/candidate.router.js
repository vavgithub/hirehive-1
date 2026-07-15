import express from "express";
import {
  addNotes,
  getAllCandidates,
  getAllCandidatesForJob,
  getAllCandidatesWithStats,
  getAssessmentQuestionsById,
  getCandidateById,
  getCandidateJobs,
  getJobBasedQuestionnaireDetails,
  getQuestionnaireDetails,
  getRandomAssessmentQuestions,
  getRandomQuestions,
  shortlistCandidate,
  submitQuestionnaireAttempt,
  toggleShortlistCandidate,
  updateCandidateProfessionalDetails,
  updateCandidateProfile,
  updateStatusAndStage,
  uploadAssessmentRecording,
} from "../../controllers/admin/candidate.controller.js";
import { protect, protectCandidate, roleProtect } from "../../middlewares/authMiddleware.js";
import { uploadVideo  } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

const staffRoles = ['Admin', 'Hiring Manager', 'Design Reviewer'];

router.post('/shortlisted/:company_id',protect, shortlistCandidate);

router.post("/getData/data/allCandidatesWithStats",protect, getAllCandidatesWithStats);

router.post("/getData/data/allCandidatesWithFilters",protect, getAllCandidates);

router.get("/:candidateId/job/:jobId", protect, roleProtect(staffRoles), getCandidateById);

router.post('/:candidateId/job/:jobId/shortlist',protect, toggleShortlistCandidate);

router.post("/:candidateId/:jobId/addNotes", protect, addNotes);

router.patch("/update-candidate/:id/:jobId",protect, roleProtect(["Hiring Manager","Admin"]), updateCandidateProfessionalDetails);

router.get("/:candidateId/jobs",protect, roleProtect(["Admin","Hiring Manager"]), getCandidateJobs);

router.patch("/update/:id", updateStatusAndStage);

router.patch("/update-candidate-profile/:id" , protect, roleProtect(["Hiring Manager","Admin"]), updateCandidateProfile);

// router.get("/questions/random", getRandomQuestions);
router.post("/assessment-questions/random", protectCandidate, getRandomAssessmentQuestions);
router.get("/assessment-questions",protect,roleProtect(['Admin','Hiring Manager']), getAssessmentQuestionsById);

router.post("/questionnaire/:candidateId/",protectCandidate, submitQuestionnaireAttempt);

router.post(
    '/upload-recording',
    protectCandidate,
    uploadVideo,
    uploadAssessmentRecording
  );

// router.get("/assessment/:candidateId", getQuestionnaireDetails);
router.get("/get-assessment/:candidateId/:jobId", protect, roleProtect(['Admin','Hiring Manager']), getJobBasedQuestionnaireDetails);

router.post("/:jobId", getAllCandidatesForJob);

export default router;
