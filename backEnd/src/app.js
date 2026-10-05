import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Needed to read the real client IP behind Render/Railway/etc.
app.set("trust proxy", 1);

const allowedOrigins = [
  "https://velvoraecommerce.netlify.app",
];

// http://localhost:ANY_PORT and http://127.0.0.1:ANY_PORT
const localhostRegex = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const isDev = process.env.NODE_ENV !== "production";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        (isDev && localhostRegex.test(origin))
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
console.log(
  "ROOT REQUEST RECEIVED",
  req.method,
  req.originalUrl,
  new Date().toISOString()
);

  res.json({
    message: "Velvora Backend API is running",
  });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);


export default app;