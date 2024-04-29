import express from 'express';
import {createJob, getJobs, getTotalJobCount } from '../controllers/jobs.controller.js';

const router = express.Router();

// Route to create a new job
router.post('/createJobs', createJob);
router.get('/jobs', getJobs);
router.get('/jobsCount', getTotalJobCount);

export default router;
