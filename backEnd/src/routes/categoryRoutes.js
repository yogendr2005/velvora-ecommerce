import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(protect, adminMiddleware, createCategory);

router
  .route("/:id")
  .put(protect, adminMiddleware, updateCategory)
  .delete(protect, adminMiddleware, deleteCategory);

export default router;