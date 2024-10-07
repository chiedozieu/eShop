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
    methods: ["GET", "POST"],
  },
});

// Middleware setup
app.use(cors());
app.use(express.json());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("hello");
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};
// Create a message object with a  seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// Event handling for socket connections
io.on("connection", (socket) => {
  console.log("user connected");

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and get messages
  const messages = {};
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });

    const user = getUser(receiverId);
    // Error handling: Check if the receiver exists
    if (!user) {
      console.error(`User with id ${receiverId} not found`);
      socket.emit("error", { message: "User not found" });
      return; // Exit the function if the user does not exist
    }

    // store the message in the message object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }
    // send message to the receiver
    try {
      io.to(user?.socketId).emit("getMessage", message);
      io.emit("updateUnseenCount", {
        conversationId: message.conversationId,
        userId: receiverId,
      });
      // for status (1)
      // io.emit("updateStatus", {
      //   conversationId: message.conversationId,
      //   userId: receiverId,
      //   status: "delivered",
      // });
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // // Error handling: Check if the sender exists
    if (!user) {
      console.error(`User with id ${senderId} not found`);
      socket.emit("error", { message: "Sender not found" });
      return;
    }

    //update the seen flag/feature
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;
        // send a seen message to the sender
        io.to(user?.socketId).emit("seenMessage", {
          senderId,
          receiverId,
          messageId,
        });

        // emit event to update status (2)
      // io.emit("updateStatus", {
      //   conversationId: message.conversationId,
      //   userId: receiverId,
      //   status: "seen",
      // });
      } else {
        console.error(
          `Message with id ${messageId} not found for sender ${senderId}`
        );
        socket.emit("error", { message: "Message not found" });
      }
    } else {
      console.error(`No messages found for sender ${senderId}`);
      socket.emit("error", { message: "No messages found" });
    }
  });

  //update and get the last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    // send the last message to the receiver
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Chat Server is running on port ${process.env.PORT || 4000}`);
});
