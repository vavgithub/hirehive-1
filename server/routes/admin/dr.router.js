import express from 'express';
import { protect, roleProtect } from '../../middlewares/authMiddleware.js';
import { getAssignedCandidates, updateAssignee } from '../../controllers/admin/dr.controller.js';

const router = express.Router();

router.put('/update-assignee', updateAssignee);
router.get('/assigned-candidates', protect , roleProtect("Design Reviewer") , getAssignedCandidates);


export default router;