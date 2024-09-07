import express from "express";
import productModel from "../model/productModel.js";
import { upload } from "../multer.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import shopModel from "../model/shopModel.js";

const router = express.Router();

// create product

router.post(
  "/create-product",
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
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await productModel.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(errorHandler(400, error));
    }
  })
);

export default router;
