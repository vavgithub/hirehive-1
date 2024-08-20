import express from 'express';
import { allCandidate, createCandidate, getCandidate, getCandidateById, jobSpecificStats, stats, updateAssignee, updateCandidateStatusById, updateRating, updateStatusAndStage } from '../../controllers/candidate/candidate.controller.js';
const router = express.Router();


router.get('/:jobId/candidates',getCandidate);
router.get('/allCandidates',allCandidate)
router.get("/stats",stats)
router.get("/:jobId/stats", jobSpecificStats);
router.get('/:id',getCandidateById);
router.post('/createCandidate',createCandidate);
router.patch('/update/:id',updateStatusAndStage);
router.patch('/update-assignee',updateAssignee);
router.patch('/update-rating/:id',updateRating)
router.patch('/:id/assignee', updateCandidateStatusById);

export default router;