import express from "express"
import { changeApplicationStatus, getCandidateScores, moveCandidate, moveMultipleCandidates, noShow, rateMultipleCandidates, rejectCandidate, rejectMultipleCandidates, rescheduleCall, rescheduleScreening, scheduleCall, scheduleScreening, scoreRoundTwo, sendDesignTask, submitBudgetScore, updateAssigneeForMultipleCandidates, updateCandidateRating } from "../../controllers/admin/hr.controller.js";

const router = express.Router();

router.post('/reject-candidate', rejectCandidate);

router.post('/reject-multiple-candidates', rejectMultipleCandidates);

router.post('/move-candidate', moveCandidate);

router.post('/move-multiple-candidates', moveMultipleCandidates);

router.post('/update-assignee-multiple-candidates', updateAssigneeForMultipleCandidates);

router.post('/no-show', noShow);

router.post('/update-candidate-rating', updateCandidateRating);

router.post('/rate-multiple-candidates', rateMultipleCandidates);

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