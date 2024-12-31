// auth.routes.js

import express from 'express';
import { applyToJob, createPassword,forgotPassword, getCandidateAppliedJobs, getCandidateDashboard, loginCandidate, logoutCandidate, registerCandidate ,resetPassword, uploadProfilePictureController, uploadResumeController, verifyOtp ,  verifyOTPForgot } from '../../controllers/candidate/auth.controller.js';
import { protectCandidate } from '../../middlewares/authMiddleware.js';
import { uploadProfilePicture, uploadResume } from '../../middlewares/uploadMiddleware.js';

const router = express.Router();


router.post("/upload-resume", uploadResume , uploadResumeController);


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

// Add this new route for profile picture upload (no auth required)
router.post("/upload-profile-picture", uploadProfilePicture, uploadProfilePictureController);

// auth.routes.js

router.get('/applied-jobs', protectCandidate, getCandidateAppliedJobs);

//forgot password handling for candidate
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp-pass', verifyOTPForgot);
router.post('/reset-password', resetPassword);



export default router;
