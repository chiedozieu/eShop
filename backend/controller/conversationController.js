import conversationModel from "../model/conversationModel.js";
import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";

const router = express.Router();

// create a new conversation
router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
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

// get user conversation

// router.get(
//   "/get-conversation/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const conversation = await conversationModel
//         .findOne({ members: { $in: [req.params.id] } })
//         .populate("members", "-password");
//       res.status(200).json({
//         message: true,
//         conversation,
//       });
//     } catch (error) {
//       return next(errorHandler(500, error.response.message));
//     }
//   })
// );

export default router;
