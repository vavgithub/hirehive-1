import express from 'express';
import { allCandidate, assignCandidate, createCandidate, fetchActiveJobs, fetchAssignedCandidate, filterJobs, getCandidate, getCandidateById, jobSpecificStats, searchJobs, stats, submitApplication, updateAssignee, updateCandidateStatusById, updateRating, updateStatusAndStage } from '../../controllers/candidate/candidate.controller.js';
import { protect } from '../../middlewares/authMiddleware.js';
import { incrementApplyClickCount } from '../../controllers/admin/jobs.controller.js';
const router = express.Router();

router.post('/:jobId/increment-apply-click', incrementApplyClickCount);

router.post('/apply/:jobId', submitApplication);
router.get("/activeJobs" , fetchActiveJobs);
router.get('/searchJobs', searchJobs);
router.post('/filterJobs', filterJobs);
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