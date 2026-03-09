import express from "express";
import { registerUser, verifyEmail, loginUser, linkOAuthAccount } from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/link-oauth", linkOAuthAccount);

export default router;