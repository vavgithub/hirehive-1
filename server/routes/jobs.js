import express from 'express';
import {createJob, getJobs, getTotalJobCount } from '../controllers/jobs.controller.js';

const router = express.Router();

// Route to create a new job
router.post('/jobs', createJob);
router.get('/getJobs', getJobs);
router.get('/jobs/count', getTotalJobCount);

export default router;
