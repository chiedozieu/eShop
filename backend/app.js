import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import router from "./routes/userRoute.js";
import cors from "cors";
import { upload } from "./multer.js";

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

// for multer
app.use("/", express.static("uploads"));

// Middleware for parsing cookies
app.use(cookieParser());

// config

if (process.env.NODE_ENV !== "production") {
  const result = dotenv.config({
    path: "backend/config/.env",
  });

  if (result.error) {
    console.error("Failed to load .env file", result.error);
    process.exit(1);
  }
}

// routes

app.use("/api/v2/user", router);

// Error handling middleware
app.use(errorHandler);

export default app;
