import express from 'express';
import { registerUser, authUser, logoutUser, getUserProfile, getAvailableDesignReviewers } from '../../controllers/admin/auth.controller.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/design-reviewers', getAvailableDesignReviewers);
export default router;