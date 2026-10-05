import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    email: { type: String, trim: true, lowercase: true },
    action: {
      type: String,
      enum: ["login", "login_failed", "register"],
      required: true
    },
    ip: { type: String, index: true },
    userAgent: String
  },
  { timestamps: true }
);

// Auto-delete logs older than 90 days (IP addresses are personal data)
activityLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;