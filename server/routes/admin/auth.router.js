import express from 'express';
import { registerUser, authUser, logoutUser, getUserProfile, getAvailableDesignReviewers, uploadProfilePicture, resetPassword, verifyOTP, forgotPassword, initializeRegistration, verifyOTPforAdmin, setPassword, completeHiringManagerRegistration, inviteTeamMember, completeDesignReviewerRegistration, addTeamMembers, skipAddMember, sendInviteOTP } from '../../controllers/admin/auth.controller.js';
import { protect, protectWithoutVerification } from '../../middlewares/authMiddleware.js';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeUploadDir, uploadsDir } from '../../config/paths.js';

const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadsDir = path.join(__dirname, '..', 'uploads');

// Initialize the uploads directory
await initializeUploadDir();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Error handling middleware for multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};


router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/design-reviewers', getAvailableDesignReviewers);

router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

router.post(
    '/profile-picture',
    protect,
    upload.single('profilePicture'),
    handleMulterError,
    uploadProfilePicture
  );


// Registration flow routes
router.post('/register/init', initializeRegistration);
router.post('/register/verify-otp-for-admin', verifyOTPforAdmin);
router.post('/register/set-password', setPassword);
router.post('/register/complete-hiring-manager', completeHiringManagerRegistration);
router.post('/register/skip-add-member',protectWithoutVerification, skipAddMember)
router.post('/register/send-invite-otp', sendInviteOTP);

// Team member invitation routes
router.post('/register/add-team-member', protectWithoutVerification , addTeamMembers);
router.post('/register/complete-design-reviewer', completeDesignReviewerRegistration);

  
export default router;