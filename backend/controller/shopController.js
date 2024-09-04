
import express from "express";
import path from "path";
import fs from "fs";
import { isAuthenticated } from "../middleware/auth.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { upload } from "../multer.js";
import shopModel from "../model/shopModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";

const router = express.Router();

// Route to create a shop and send activation email
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await shopModel.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(errorHandler(400, "User already exists"));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: filename,
        url: fileUrl,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };

     // Create the activation token function
     const createActivationToken = (seller) => {
        return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
          expiresIn: "10m",
        });
      };

    // Generate activation token
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

   

    // Send activation email
    await sendMail({
      email: seller.email,
      subject: "Activate your shop",
      message: `Hello ${seller.name}, please click the link to activate your shop: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${seller.email} to activate your shop`,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});

// Route to activate the seller/shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Log when the activation route is hit
      console.log("Activation route hit");

      const { activation_token } = req.body;
      console.log("Received activation token:", activation_token);

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(errorHandler(400, "Invalid activation token"));
      }

      const { name, email, password, avatar, address, phoneNumber } = newSeller;

      // Check if seller already exists before creating a new one
      let seller = await shopModel.findOne({ email });
      if (seller) {
        console.log("Seller already exists, not creating again");
        return next(errorHandler(400, "Seller already exists. Please login"));
      }

      // Create the seller in the database
      seller = await shopModel.create({
        name,
        email,
        password,
        avatar,
        address,
        phoneNumber,
      });

      // Send token to client if seller creation is successful
      sendToken(seller, 201, res);
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

export default router;
