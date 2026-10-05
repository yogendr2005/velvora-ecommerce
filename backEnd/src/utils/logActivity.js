import ActivityLog from "../models/ActivityLog.js";
import getClientIp from "./getClientIp.js";

// Fire-and-forget: a logging failure must never break login/register.
const logActivity = (req, { action, user = null, email }) => {
  ActivityLog.create({
    user,
    email,
    action,
    ip: getClientIp(req),
    userAgent: req.headers["user-agent"]
  }).catch((error) => {
    console.error("Activity log failed:", error.message);
  });
};

export default logActivity;