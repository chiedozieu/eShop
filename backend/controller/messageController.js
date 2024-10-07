import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import messagesModel from "../model/messagesModel.js";
import { upload } from "../multer.js";
import conversationModel from "../model/conversationModel.js";

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
      const messages = await messagesModel.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

router.get(
  "/get-unseen-messages/:conversationId/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const unseenMessages = await messagesModel.find({
        conversationId: req.params.conversationId,
        sender: { $ne: req.params.userId }, // exclude messages sent by the user
        seen: false, // only return unseen messages
      });

      res.status(200).json({
        success: true,
        unseenMessagesCount: unseenMessages.length,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// update seen
router.put(
  "/update-seen/:conversationId/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversationId = req.params.conversationId;
      const userId = req.params.userId;
      const messages = await messagesModel.updateMany(
        { conversationId, sender: { $ne: userId } },
        { $set: { seen: true } }
      );
      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// Get total unseen

router.get(
  "/get-total-unseen/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.userId;

      // Get all conversations for the user
      const conversations = await conversationModel.find({
        members: { $in: [userId] },
      });

      // Calculate total unseen messages across all conversations
      let totalUnseen = 0;
      for (const conversation of conversations) {
        const unseenCount = await messagesModel.countDocuments({
          conversationId: conversation._id,
          sender: { $ne: userId },
          seen: false,
        });
        totalUnseen += unseenCount;
      }

      res.status(200).json({ totalUnseen });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);


// Update the status of a message
router.put("/update-status/:id", catchAsyncErrors(async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const status = req.body.status;
    const message = await messagesModel.findByIdAndUpdate(messageId, { status });
    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
}));

export default router;

