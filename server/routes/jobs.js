import express from 'express';
import {createJob, filterJobs, getJobs, getTotalJobCount , searchJobs } from '../controllers/jobs.controller.js';

const router = express.Router();

// Route to create a new job
router.post('/createJobs', createJob);
router.post('/filterJobs', filterJobs);
router.get('/jobs', getJobs);
router.get('/jobsCount', getTotalJobCount);
router.get('/searchJobs', searchJobs);

export default router;
