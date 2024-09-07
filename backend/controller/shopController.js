
import express from "express";
import path from "path";
import fs from "fs";
import { isSeller } from "../middleware/auth.js";
import { sendShopToken } from "../utils/shopToken.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import { upload } from "../multer.js";
import shopModel from "../model/shopModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";

const router = express.Router();

  // Create the activation token function
  const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "10m",
    });
  };


// Route to create a shop and send activation email
router.post("/create-shop", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
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
}));

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
      let seller = await shopModel.findOne({ email: newSeller.email});
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
      sendShopToken(seller, 201, res);

       // Send activation confirmation email
    await sendMail({
      email: seller.email,
      subject: "Activation successful",
      message: `Hello ${seller.name}, your shop has been activated`,
    });

    res.status(201).json({
      success: true,
    });

      
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);



// login shop

router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(errorHandler(400, "Please enter a valid email & password"));
      }

      const user = await shopModel.findOne({ email }).select("+password");

      if (!user) {
        return next(
          errorHandler(
            400,
            "User not found, please enter a valid email & password or kindly register"
          )
        );
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(errorHandler(400, "Please enter a valid email & password"));
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  })
);


// load shop or store shop // Goto Apps.js add useEffect // redux

router.get( 
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
  
      const seller = await shopModel.findById(req.seller._id);
      if (!seller) {
        return next(errorHandler(400, "User doesn't exists")); 
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
     return next(errorHandler(500, error.message));
    }
  })
);

export default router;