import express from 'express';
import {activeJobsFilterCount, archiveJob, closedJobsFilterCount, createJob, deleteJob, draftJobsFilterCount, editJob, filterJobs, getJobById, getJobs, getTotalJobCount , jobsStats, searchJobs, unarchiveJob, updateJob } from '../controllers/jobs.controller.js';

const router = express.Router();

// Route to create a new job
router.post('/createJobs', createJob);
router.post('/filterJobs', filterJobs);
router.get('/jobs', getJobs);
router.get('/jobsStats', jobsStats);
router.get('/activeJobsFilterCount',activeJobsFilterCount)
router.get('/draftJobsFilterCount',draftJobsFilterCount)
router.get('/closedJobsFilterCount', closedJobsFilterCount);

router.get('/jobsCount', getTotalJobCount);
router.get('/searchJobs', searchJobs);
router.get('/getJobById/:id', getJobById);

router.delete('/deleteJob/:id', deleteJob);
router.put('/updateJob/:id', updateJob);
router.put('/archiveJob/:id/', archiveJob);
router.put('/unarchiveJob/:id/', unarchiveJob);

router.put('/editJob/:id', editJob);

export default router;
