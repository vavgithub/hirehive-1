import express from 'express';
import { 
  allCandidate,  
  disconnectTelegram,  
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
import { protect, protectCandidate, roleProtect } from '../../middlewares/authMiddleware.js';
import { incrementApplyClickCount } from '../../controllers/admin/jobs.controller.js';

const router = express.Router();

const staffRoles = ['Admin', 'Hiring Manager', 'Design Reviewer'];

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


router.post('/submit-design-task', protectCandidate, submitDesignTask);

router.post('/disconnect-telegram', protectCandidate, disconnectTelegram);

// === Parameterized Routes ===

// Routes that contain dynamic parameters — staff only (full candidate docs)
router.get('/:jobId/candidates', protect, roleProtect(staffRoles), getCandidate);
router.get('/:jobId/stats', jobSpecificStats);
router.get('/:id', protect, roleProtect(staffRoles), getCandidateById);

export default router;
