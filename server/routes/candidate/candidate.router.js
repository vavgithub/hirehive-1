import express from 'express';
import { createCandidate, getCandidate, getCandidateById, updateStatusAndStage } from '../../controllers/candidate/candidate.controller.js';
const router = express.Router();


router.get('/:jobId/candidates',getCandidate);
router.get('/:id',getCandidateById);
router.post('/createCandidates',createCandidate);
router.patch('/update/:id',updateStatusAndStage);

export default router;