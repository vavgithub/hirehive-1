import express from "express";
import { getAllCandidatesForJob, updateStatusAndStage } from "../../controllers/admin/candidate.controller.js";

const router = express.Router();


router.get('/:jobId', getAllCandidatesForJob);
router.patch("/update/:id",updateStatusAndStage)

export default router;