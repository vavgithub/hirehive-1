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
import {  uploadMiddleware  } from "../../middlewares/uploadMiddleware.js";

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
    async (req, res, next) => {
      try {
        await new Promise((resolve, reject) => {
          uploadMiddleware(req, res, (err) => {
            if (err) {
              console.error('Upload middleware error:', err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
        next();
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || 'File upload failed'
        });
      }
    },
    uploadAssessmentRecording
  );

router.get("/assessment/:candidateId", getQuestionnaireDetails);

export default router;
