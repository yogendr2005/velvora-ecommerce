import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, adminMiddleware, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, adminMiddleware, updateProduct)
  .delete(protect, adminMiddleware, deleteProduct);

export default router;