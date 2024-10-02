import express from "express"
import { moveCandidate, rejectCandidate } from "../../controllers/admin/hr.controller.js";

const router = express.Router();

router.post('/reject-candidate', rejectCandidate);
router.post('/move-candidate', moveCandidate);

export default router;