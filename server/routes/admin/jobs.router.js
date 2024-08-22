import express from 'express';
import {activeJobsFilterCount, archiveJob, closedJobsFilterCount, closeJob, createJob, deleteJob, draftJob, draftJobsFilterCount, editJob, filterJobs, getJobById, getJobs, getTotalJobCount , jobsStats, searchJobs, unarchiveJob, updateJob } from '../../controllers/admin/jobs.controller.js';

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
router.post('/createJobs', createJob);
router.post('/filterJobs', filterJobs);
router.delete('/deleteJob/:id', deleteJob);
router.put('/updateJob/:id', updateJob);
router.put('/archiveJob/:id', archiveJob);
router.put('/closeJob/:id', closeJob);
router.put('/unarchiveJob/:id', unarchiveJob);
router.put('/draftJob/:id', draftJob);
router.put('/editJob/:id', editJob);

export default router;
