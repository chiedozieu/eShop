import express from "express";
import productModel from "../model/productModel.js";
import { upload } from "../multer.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import shopModel from "../model/shopModel.js";
import { isSeller } from "../middleware/auth.js"; 

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

// get all product of a shop

router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await productModel.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(errorHandler(400, error));
    }
  })
);

// delete product of a shop

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await productModel.findByIdAndDelete(productId);
      if (!product) {
        return next(errorHandler(500, "Product not found"));
      }
      res.status(201).json({
        success: true,
       message: "Product deleted successfully"
      });
    } catch (error) {
      return next(errorHandler(400, error));
    }
  })
);


// logout from shop

router.get('/logout', catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie('seller_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })

    res.status(201).json({
      success: true,
      message: 'Logout successful!'
    })
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
 }));



export default router;
