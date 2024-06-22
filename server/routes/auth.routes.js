import express from "express";
import { login, logout, refresh, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

export default router
