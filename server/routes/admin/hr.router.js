import express from "express"
import { getCandidateScores, moveCandidate, rejectCandidate, rescheduleScreening, scheduleScreening, sendDesignTask, submitBudgetScore, updateCandidateRating } from "../../controllers/admin/hr.controller.js";

const router = express.Router();

router.post('/reject-candidate', rejectCandidate);

router.post('/move-candidate', moveCandidate);

router.post('/update-candidate-rating', updateCandidateRating);

router.get('/candidate/:candidateId/job/:jobId/scores', getCandidateScores);

router.post('/schedule-screening',scheduleScreening)

router.post('/reschedule-screening',rescheduleScreening);

router.post('/submit-budget-score' ,submitBudgetScore);

router.post('/send-design-task',sendDesignTask)



export default router;                                                                               