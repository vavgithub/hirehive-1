import express from 'express';
import {activeJobsFilterCount, archiveJob, closedJobsFilterCount, closeJob, createJob, deleteJob, draftJob, draftJobsFilterCount, editJob, filterJobs, getJobById, getJobs, getTotalJobCount , jobsStats, searchJobs, unarchiveJob, updateJob } from '../../controllers/admin/jobs.controller.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/jobsStats', jobsStats);
router.get('/activeJobsFilterCount', activeJobsFilterCount);
router.get('/draftJobsFilterCount', draftJobsFilterCount);
router.get('/closedJobsFilterCount', closedJobsFilterCount);
router.get('/jobsCount', getTotalJobCount);
router.get('/searchJobs', searchJobs);
router.get('/getJobById/:id', getJobById);
router.get('/jobs', getJobs);

// Protected routes (authentication required)
router.post('/createJobs', authenticate, createJob);
router.post('/filterJobs', authenticate, filterJobs);
router.delete('/deleteJob/:id', authenticate, deleteJob);
router.put('/updateJob/:id', authenticate, updateJob);
router.put('/archiveJob/:id', authenticate, archiveJob);
router.put('/closeJob/:id', authenticate, closeJob);
router.put('/unarchiveJob/:id', authenticate, unarchiveJob);
router.put('/draftJob/:id', authenticate, draftJob);
router.put('/editJob/:id', authenticate, editJob);

export default router;
