import express from "express";
import { registerUser, verifyEmail, loginUser } from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);

export default router;