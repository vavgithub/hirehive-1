import express from "express"
import { protect, roleProtect } from "../../middlewares/authMiddleware.js";
import { addTeamMember, changeMemberStatus, editTeamMember, getAllTeamMember, getDetailsForDashboard, reInviteMember } from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.get('/dashboard',protect,roleProtect("Admin"), getDetailsForDashboard);

router.post('/add-member',protect,roleProtect("Admin"), addTeamMember);

router.patch('/edit-member',protect,roleProtect("Admin"), editTeamMember);

router.post('/re-invite-member',protect,roleProtect("Admin"), reInviteMember);

router.post('/change-member-status',protect,roleProtect("Admin"), changeMemberStatus);

router.get('/get-all-members',protect,roleProtect("Admin"), getAllTeamMember);

router.get('/get-member/:id',protect,roleProtect("Admin"), getAllTeamMember);



export default router;                                                                               