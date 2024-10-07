import conversationModel from "../model/conversationModel.js";
import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import { isAuthenticated, isSeller } from "../middleware/auth.js";

const router = express.Router();

// create a new conversation
router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        groupTitle,
        userId,
        sellerId,
        productImage,
        productName,
        productPrice,
      } = req.body;
      const isConversationExist = await conversationModel.findOne({
        groupTitle,
      });
      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await conversationModel.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
          productImage,
          productName,
          productPrice,
        });
        res.status(200).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// get seller conversation

router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await conversationModel
        .find({
          members: { $in: [req.params.id] },
        })
        .sort({
          updatedAt: -1,
          createdAt: -1,
        });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// get user conversation

router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await conversationModel
        .find({
          members: { $in: [req.params.id] },
        })
        .sort({
          updatedAt: -1,
          createdAt: -1,
        });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// update the last conversation

router.put(
  "/update-last-message/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await conversationModel.findByIdAndUpdate(
        req.params.id,
        { lastMessage, lastMessageId }
      );

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  })
);

export default router;
