import express from "express"
import { changeApplicationStatus, getCandidateScores, moveCandidate, noShow, rejectCandidate, rescheduleCall, rescheduleScreening, scheduleCall, scheduleScreening, scoreRoundTwo, sendDesignTask, submitBudgetScore, updateCandidateRating } from "../../controllers/admin/hr.controller.js";

const router = express.Router();

router.post('/reject-candidate', rejectCandidate);

router.post('/move-candidate', moveCandidate);

router.post('/no-show', noShow);

router.post('/update-candidate-rating', updateCandidateRating);

router.get('/candidate/:candidateId/job/:jobId/scores', getCandidateScores);

// router.post('/schedule-screening',scheduleScreening)
router.post('/schedule-call' , scheduleCall)

router.post('/reschedule-call' , rescheduleCall);

router.post('/reschedule-screening' , rescheduleScreening);

router.post('/submit-budget-score' ,submitBudgetScore);

router.post('/score-round-two', scoreRoundTwo);

router.post('/send-design-task',sendDesignTask)

router.post('/change-status/:candidateId/:jobId',changeApplicationStatus)


export default router;                                                                               