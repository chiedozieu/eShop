import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./db/database.js";

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for uncaught exceptions");

  server.close(() => {
    process.exit(1);
  });
});

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

// DB connection
connectDatabase();

// server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

//handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
