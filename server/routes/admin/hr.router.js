import express from "express"
import { moveCandidate, rejectCandidate, updateCandidateRating } from "../../controllers/admin/hr.controller.js";

const router = express.Router();

router.post('/reject-candidate', rejectCandidate);
router.post('/move-candidate', moveCandidate);
router.post('/update-candidate-rating', updateCandidateRating);

export default router;