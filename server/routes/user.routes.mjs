import express from "express";
import authMiddleware from "../middleware/auth.middleware.mjs";
import { getProfile } from "../controllers/user.controller.mjs";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

export default router;