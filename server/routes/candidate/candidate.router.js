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
router.get('/jobs/searchJobs', searchJobs);
router.post('/filterJobs', filterJobs);
router.get('/allCandidates', allCandidate);
router.get('/stats', stats);
router.post('/createCandidate', createCandidate);
router.post('/apply/:jobId', submitApplication);
router.post('/:jobId/increment-apply-click', incrementApplyClickCount);

// === Parameterized Routes ===

// Routes that contain dynamic parameters
router.get('/:jobId/candidates', getCandidate);
router.get('/:jobId/stats', jobSpecificStats);
router.get('/:id', getCandidateById);


// not for the current use will removed it shortly
// router.post('/assign', protect, assignCandidate);
// router.get('/assigned/:reviewerId', protect, fetchAssignedCandidate);
router.patch('/update/:id', updateStatusAndStage);
// router.patch('/update-assignee', updateAssignee);
// router.patch('/update-rating/:id', updateRating);
// router.patch('/:id/assignee', updateCandidateStatusById);

export default router;
