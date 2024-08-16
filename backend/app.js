import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// for multer
app.use(fileUpload({ useTempFiles: true }));

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

// Error handling
app.use(errorHandler);

export default app;
