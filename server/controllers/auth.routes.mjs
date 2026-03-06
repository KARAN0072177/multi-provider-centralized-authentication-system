import express from "express";
import { registerUser, verifyEmail } from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/register", registerUser);  // registration route
router.post("/verify-email", verifyEmail); // email verification route

export default router;