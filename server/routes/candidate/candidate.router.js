import express from 'express';
import { createCandidate, getCandidate, getCandidateById, updateAssignee, updateRating, updateStatusAndStage } from '../../controllers/candidate/candidate.controller.js';
const router = express.Router();


router.get('/:jobId/candidates',getCandidate);
router.get('/:id',getCandidateById);
router.post('/createCandidates',createCandidate);
router.patch('/update/:id',updateStatusAndStage);
router.patch('/update-assignee',updateAssignee);
router.patch('/update-rating/:id',updateRating)

export default router;