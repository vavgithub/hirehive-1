import express from 'express';
import { protect, roleProtect } from '../../middlewares/authMiddleware.js';
import { autoAssignPortfolios, getAssignedCandidates, getUnderReviewStats, submitScoreReview, updateCandidateAssignee } from '../../controllers/admin/dr.controller.js';

const router = express.Router();

router.put('/update-assignee', updateCandidateAssignee);

router.post('/auto-assign-portfolios', autoAssignPortfolios)

router.get('/assigned-candidates', protect , roleProtect("Design Reviewer") , getAssignedCandidates);

router.post('/submit-score-review' , protect , roleProtect("Design Reviewer") ,submitScoreReview);

router.get('/under-review-stats' , protect , getUnderReviewStats)


export default router;