import express from 'express';
import { protect, roleProtect } from '../../middlewares/authMiddleware.js';
import { autoAssignPortfolios, getAssignedCandidates, updateCandidateAssignee } from '../../controllers/admin/dr.controller.js';

const router = express.Router();

router.put('/update-assignee', updateCandidateAssignee);

router.post('/auto-assign-portfolios',autoAssignPortfolios)

router.get('/assigned-candidates', protect , roleProtect("Design Reviewer") , getAssignedCandidates);


export default router;