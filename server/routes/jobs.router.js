import express from 'express';
import {activeJobsFilterCount, createJob, deleteJob, filterJobs, getJobs, getTotalJobCount , jobsStats, searchJobs, updateJob } from '../controllers/jobs.controller.js';

const router = express.Router();

// Route to create a new job
router.post('/createJobs', createJob);
router.post('/filterJobs', filterJobs);
router.get('/jobs', getJobs);
router.get('/jobsStats', jobsStats);
router.get('/activeJobsFilterCount',activeJobsFilterCount)    
router.get('/jobsCount', getTotalJobCount);
router.get('/searchJobs', searchJobs);


router.delete('/deleteJob/:id', deleteJob);
router.put('/editJob/:id', updateJob);

export default router;
