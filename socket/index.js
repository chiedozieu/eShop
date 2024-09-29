import { Server as SocketIOServer } from "socket.io"; 
import http from "http";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";


dotenv.config({
  path: "./.env",
});

const app = express();
const server = http.createServer(app);

// Initialize socket.io server with the HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

// Middleware setup
app.use(cors());
app.use(express.json());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("hello");
});

// // Event handling for socket connections
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // Example event listener
//   socket.on("message", (data) => {
//     console.log("Received message:", data);
//   });

//   // Event for client disconnecting
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });


server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});