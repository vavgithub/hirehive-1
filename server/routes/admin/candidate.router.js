import express from "express";
import { getAllCandidatesForJob, getAllCandidatesWithStats, getCandidateById, getRandomQuestions, updateStatusAndStage } from "../../controllers/admin/candidate.controller.js";

const router = express.Router();

router.get("/getData/data/allCandidatesWithStats", getAllCandidatesWithStats)

router.get('/:jobId', getAllCandidatesForJob);
// router.get('/data/:id', getCandidateById);
router.get('/:candidateId/job/:jobId', getCandidateById);
router.patch("/update/:id",updateStatusAndStage);

router.get("/questions/random",getRandomQuestions);


export default router;