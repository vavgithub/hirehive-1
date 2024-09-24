import express from 'express';
import { 
  allCandidate, 
  assignCandidate, 
  createCandidate, 
  fetchActiveJobs, 
  fetchAssignedCandidate, 
  filterJobs, 
  getCandidate, 
  getCandidateById, 
  jobSpecificStats, 
  searchJobs, 
  stats, 
  submitApplication, 
  updateAssignee, 
  updateCandidateStatusById, 
  updateRating, 
  updateStatusAndStage 
} from '../../controllers/candidate/candidate.controller.js';
import { protect } from '../../middlewares/authMiddleware.js';
import { incrementApplyClickCount } from '../../controllers/admin/jobs.controller.js';

const router = express.Router();

// === Specific Routes ===

// Routes that do not contain dynamic parameters
router.get('/jobs/open', fetchActiveJobs);
router.get('/searchJobs', searchJobs);
router.get('/allCandidates', allCandidate);
router.get('/stats', stats);
router.post('/createCandidate', createCandidate);
router.post('/assign', protect, assignCandidate);
router.post('/apply/:jobId', submitApplication);
router.post('/:jobId/increment-apply-click', incrementApplyClickCount);
router.post('/filterJobs', filterJobs);
router.patch('/update-assignee', updateAssignee);

// === Parameterized Routes ===

// Routes that contain dynamic parameters
router.get('/assigned/:reviewerId', protect, fetchAssignedCandidate);
router.get('/:jobId/candidates', getCandidate);
router.get('/:jobId/stats', jobSpecificStats);
router.get('/:id', getCandidateById);
router.patch('/update/:id', updateStatusAndStage);
router.patch('/update-rating/:id', updateRating);
router.patch('/:id/assignee', updateCandidateStatusById);

export default router;
