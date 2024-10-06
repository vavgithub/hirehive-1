import express from "express";
import { getAllCandidatesForJob, getCandidateById, updateStatusAndStage } from "../../controllers/admin/candidate.controller.js";

const router = express.Router();


router.get('/:jobId', getAllCandidatesForJob);
// router.get('/data/:id', getCandidateById);
router.get('/:candidateId/job/:jobId', getCandidateById);
router.patch("/update/:id",updateStatusAndStage)

export default router;