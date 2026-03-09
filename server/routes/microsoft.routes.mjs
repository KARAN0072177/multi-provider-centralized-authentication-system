import express from "express";
import {
  microsoftAuth,
  microsoftCallback
} from "../controllers/microsoft.controller.mjs";

const router = express.Router();

router.get("/microsoft", microsoftAuth);
router.get("/microsoft/callback", microsoftCallback);

export default router;