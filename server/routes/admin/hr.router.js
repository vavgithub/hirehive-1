import express from "express"
import { changeApplicationStatus, getCandidateScores, moveCandidate, moveMultipleCandidates, noShow, rateMultipleCandidates, rejectCandidate, rejectMultipleCandidates, rescheduleCall, rescheduleScreening, scheduleCall, scheduleScreening, scoreRoundTwo, sendDesignTask, submitBudgetScore, updateAssigneeForMultipleCandidates, updateCandidateRating } from "../../controllers/admin/hr.controller.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/reject-candidate', protect, rejectCandidate);

router.post('/reject-multiple-candidates', protect, rejectMultipleCandidates);

router.post('/move-candidate', protect, moveCandidate);

router.post('/move-multiple-candidates', protect, moveMultipleCandidates);

router.post('/update-assignee-multiple-candidates', protect, updateAssigneeForMultipleCandidates);

router.post('/no-show', protect, noShow);

router.post('/update-candidate-rating', protect, updateCandidateRating);

router.post('/rate-multiple-candidates', protect, rateMultipleCandidates);

router.get('/candidate/:candidateId/job/:jobId/scores', protect, getCandidateScores);

// router.post('/schedule-screening', protect,scheduleScreening)
router.post('/schedule-call' , protect , scheduleCall)

router.post('/reschedule-call' , protect , rescheduleCall);

router.post('/reschedule-screening' , protect , rescheduleScreening);

router.post('/submit-budget-score' , protect ,submitBudgetScore);

router.post('/score-round-two', protect, scoreRoundTwo);

router.post('/send-design-task', protect,sendDesignTask)

router.post('/change-status/:candidateId/:jobId', protect,changeApplicationStatus)


export default router;                                                                               