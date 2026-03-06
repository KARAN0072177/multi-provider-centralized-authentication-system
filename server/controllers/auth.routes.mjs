import express from "express";
import { registerUser } from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/register", registerUser);

export default router;