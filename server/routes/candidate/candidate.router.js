import express from 'express';
import { 
  allCandidate,  
  fetchActiveJobs,    
  filterJobs, 
  filterSearchJobs, 
  getCandidate, 
  getCandidateById, 
  jobSpecificStats, 
  searchJobs, 
  stats, 
  submitApplication,    
  submitDesignTask,    
  updateStatusAndStage 
} from '../../controllers/candidate/candidate.controller.js';
import { protect, protectCandidate } from '../../middlewares/authMiddleware.js';
import { incrementApplyClickCount } from '../../controllers/admin/jobs.controller.js';

const router = express.Router();

// === Specific Routes ===

// Routes that do not contain dynamic parameters
router.get('/jobs/open', fetchActiveJobs);
router.get('/jobs/searchJobs', searchJobs);
router.post('/filterJobs', filterJobs);
router.post('/filterSearchJobs', filterSearchJobs);
// router.get('/allCandidates', allCandidate);
router.get('/stats', stats);

router.post('/apply/:jobId', submitApplication);
router.post('/:jobId/increment-apply-click', incrementApplyClickCount);

// === Parameterized Routes ===

// Routes that contain dynamic parameters
router.get('/:jobId/candidates', getCandidate);
router.get('/:jobId/stats', jobSpecificStats);
router.get('/:id', getCandidateById);

router.post('/submit-design-task', protectCandidate, submitDesignTask);



export default router;
