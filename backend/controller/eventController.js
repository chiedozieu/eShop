import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { upload } from "../multer.js";
import eventModel from "../model/eventModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import shopModel from "../model/shopModel.js";
import { isSeller } from "../middleware/auth.js";
import fs from "fs";

const router = express.Router();

// create event

router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await shopModel.findById(shopId);
      if (!shop) {
        return next(errorHandler(400, "Shop Id is invalid"));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const eventProduct = await eventModel.create(eventData);

        res.status(201).json({
          success: true,
          eventProduct,
        });
      }
    } catch (error) {
      return next(errorHandler(400, error));
    }
  })
);

// get all events of the site

router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await eventModel.find();

      res.status(201).json({
        success: true, 
        events,
      });
    } catch (error) {
      return next(errorHandler(400, error));
    } 
  })
);

// get all events of a shop

router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await eventModel.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(errorHandler(400, error));
    }
  })
);

// delete event of a shop

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const eventData = await eventModel.findById(productId);

      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          console.log(err);
        });
      });
      const event = await eventModel.findByIdAndDelete(productId);
      if (!event) {
        return next(errorHandler(500, "Event not found"));
      }

      res.status(201).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(errorHandler(400, error));
    }
  })
);

export default router;
