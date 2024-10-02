import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import messagesModel from "../model/messagesModel.js";
import { upload } from "../multer.js";

const router = express.Router();

// create new message

router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messagesData = req.body;
      if (req.file) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        messagesData.images = imageUrls;
      }

      messagesData.conversationId = req.body.conversationId;
      messagesData.sender = req.body.sender;
      messagesData.text = req.body.text;

      const message = new messagesModel({
        conversationId: messagesData.conversationId,
        text: messagesData?.text,
        sender: messagesData?.sender,
        images: messagesData?.images ? messagesData.images : undefined,
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

// get all messages with conversation id

router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await messagesModel
        .find({
          conversationId: req.params.id,
        })
        
      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

export default router;
