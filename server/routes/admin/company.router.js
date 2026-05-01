import express from 'express';
import { protect } from '../../middlewares/authMiddleware.js';
import { getMultiReviewerSettings, updateMultiReviewerSettings } from '../../controllers/admin/company.controller.js';

const router = express.Router();

router.get('/multi-reviewer-settings', protect, getMultiReviewerSettings);
router.put('/multi-reviewer-settings', protect, updateMultiReviewerSettings);

export default router;

