import express from 'express';
import { protectInternal } from '../../middlewares/internalMiddleware.js';
import { getFeedbackExamples } from '../../controllers/internal/feedback.controller.js';

const router = express.Router();

router.get('/feedback-examples', protectInternal, getFeedbackExamples);

export default router;
