import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.get(
  "/admin",
  protect,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/:id/status",
  protect,
  adminMiddleware,
  updateOrderStatus
);

export default router;