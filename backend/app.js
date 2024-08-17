import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./controller/userController.js"; // Import the whole router, not just createUser
import { errorMiddleware } from "./middleware/error.js";

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

// Serve static files from the "uploads" directory
app.use("/", express.static("uploads"));

// Middleware for parsing cookies
app.use(cookieParser());

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  const result = dotenv.config({
    path: "backend/config/.env",
  });

  if (result.error) {
    console.error("Failed to load .env file", result.error);
    process.exit(1);
  }
}

// Use the user routes
app.use("/api/v2/user", userRoutes); // Use the router directly

// Error handling middleware
app.use(errorMiddleware);

export default app;
