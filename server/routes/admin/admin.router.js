import express from "express"
import { protect, roleProtect } from "../../middlewares/authMiddleware.js";
import { addTeamMember, approveRequest, changeMemberStatus, editTeamMember, getAllTeamMember, getCalendarDetails, getDashboardDetailsSecondary, getDetailsForDashboard, reInviteMember, rejectRequest, removeTeamMember, resetScreeningParam, updateScreeningParam } from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.get('/dashboard',protect,roleProtect("Admin"), getDetailsForDashboard);

router.get('/dashboard-secondary',protect,roleProtect("Admin"), getDashboardDetailsSecondary);

router.post('/add-member',protect,roleProtect("Admin"), addTeamMember);

router.patch('/edit-member',protect,roleProtect("Admin"), editTeamMember);

router.post('/re-invite-member',protect,roleProtect("Admin"), reInviteMember);

router.post('/change-member-status',protect,roleProtect("Admin"), changeMemberStatus);

router.get('/get-all-members',protect,roleProtect("Admin"), getAllTeamMember);

router.get('/get-member/:id',protect,roleProtect("Admin"), getAllTeamMember);

router.post('/register/approve-request',protect,roleProtect('Admin'), approveRequest);

router.post('/register/reject-request',protect,roleProtect('Admin'), rejectRequest);

router.post('/remove-member', protect, roleProtect('Admin'), removeTeamMember);

router.post('/update-screening-param',protect,roleProtect("Admin"), updateScreeningParam);

router.post('/reset-screening-param',protect,roleProtect("Admin"), resetScreeningParam);

router.get('/get-calendar-details',protect,getCalendarDetails)

export default router;                                                                               