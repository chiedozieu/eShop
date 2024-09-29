import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import messagesModel from "../model/messagesModel.js";

const router = express.Router();

// create new message

router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messagesData = req.body;
      if (req.file) {
        const file = req.files;
        const imageUrls = file.map((file) => `${file.filename}`);
        messagesData.images = imageUrls;
      }

      messagesData.conversationId = req.body.conversationId;
      messagesData.sender = req.body.sender;

      const message = new messagesModel({
        conversationId: messagesData.conversationId,
        sender: messagesData.sender,
        images: messagesData.images ? messagesData.images : null,
      });
      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

export default router;
