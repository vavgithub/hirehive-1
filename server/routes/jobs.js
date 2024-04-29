import express from 'express';
import {createJob } from '../controllers/jobs.controller.js';

const router = express.Router();

// Route to create a new job
router.post('/jobs', createJob);

export default router;
