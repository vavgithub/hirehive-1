import express from 'express';
import { allCandidate, assignCandidate, createCandidate, fetchActiveJobs, fetchAssignedCandidate, getCandidate, getCandidateById, jobSpecificStats, stats, updateAssignee, updateCandidateStatusById, updateRating, updateStatusAndStage } from '../../controllers/candidate/candidate.controller.js';
import { protect } from '../../middlewares/authMiddleware.js';
const router = express.Router();


router.get("/activeJobs" , fetchActiveJobs);
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
router.get('/assigned/:reviewerId', protect , fetchAssignedCandidate);
router.post('/assign', protect, assignCandidate);



export default router;