import express from "express";

import { getActivityLogs } from "../controllers/activityController.js";
import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/activity", protect, adminMiddleware, getActivityLogs);

export default router;