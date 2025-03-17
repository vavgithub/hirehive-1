import express from "express"
import { protect, roleProtect } from "../../middlewares/authMiddleware.js";
import { addTeamMember, getAllTeamMember } from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.post('/add-member',protect,roleProtect("Admin"), addTeamMember);

router.get('/get-all-members',protect,roleProtect("Admin"), getAllTeamMember);

router.get('/get-member/:id',protect,roleProtect("Admin"), getAllTeamMember);



export default router;                                                                               