import express from 'express';
import { registerUser, authUser, logoutUser, getUserProfile } from '../../controllers/admin/auth.controller.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
export default router;