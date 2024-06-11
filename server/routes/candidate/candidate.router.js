import express from 'express';
import { createCandidate, getCandidate } from '../../controllers/candidate/candidate.controller.js';
const router = express.Router();


router.get('/:jobId/candidates',getCandidate);
router.post('/createCandidates',createCandidate);

export default router;