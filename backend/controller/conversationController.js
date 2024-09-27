import conversationModel from "../model/conversationModel";
import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";

const router = express.Router();

// create a new conversation
router.post('create-new-conversation', catchAsyncErrors(async (req, res, next) => {
    try {
        const {groupTitle} = req.body;
    } catch (error) {
        return next(errorHandler(500, error.response.message));
    }
}))