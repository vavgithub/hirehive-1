// auth.routes.js

import express from 'express';
import { applyToJob, createPassword, getCandidateAppliedJobs, getCandidateDashboard, loginCandidate, logoutCandidate, registerCandidate, verifyOtp } from '../../controllers/candidate/auth.controller.js';
import { protectCandidate } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to register a candidate
router.post('/register', registerCandidate);

// Route to create a password for the candidate
router.post('/create-password', createPassword);

// Route to verify OTP
router.post('/verify-otp', verifyOtp);
router.post('/login', loginCandidate);
router.post('/logout', logoutCandidate);



// Protected route for candidate dashboard
router.get('/dashboard', protectCandidate, getCandidateDashboard);
router.post('/apply-job', protectCandidate, applyToJob);

// auth.routes.js

router.get('/applied-jobs', protectCandidate, getCandidateAppliedJobs);



export default router;
