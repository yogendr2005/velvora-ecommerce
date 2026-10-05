import ActivityLog from "../models/ActivityLog.js";

export const getActivityLogs = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    const filter = {};

    if (req.query.action) {
      filter.action = req.query.action;
    }

    if (req.query.ip) {
      filter.ip = req.query.ip.trim();
    }

    if (req.query.email) {
      // escape regex characters so the search is a plain "contains"
      const escaped = req.query.email
        .trim()
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.email = { $regex: escaped };
    }

    const [logs, total, uniqueIps] = await Promise.all([
      ActivityLog.find(filter)
        .populate("user", "name email role")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      ActivityLog.countDocuments(filter),
      ActivityLog.distinct("ip", filter)
    ]);

    res.status(200).json({
      logs,
      total,
      uniqueIps: uniqueIps.length,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activity logs",
      error: error.message
    });
  }
};