import express from "express";
import {
  googleAuth,
  googleCallback,
  setUsername,
  linkGoogleAccount
} from "../controllers/google.controller.mjs";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

router.post("/set-username", setUsername);
router.post("/link-google", linkGoogleAccount);

export default router;