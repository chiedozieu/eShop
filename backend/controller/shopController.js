import express from "express";
import path from "path";
import fs from "fs";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";
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
router.post(
  "/create-shop",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
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
        selectedState: req.body.selectedState,
        selectedCity: req.body.selectedCity,
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
  })
);

// Route to activate the seller/shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(errorHandler(400, "Invalid activation token"));
      }

      const {
        name,
        email,
        password,
        avatar,
        selectedState,
        selectedCity,
        address,
        phoneNumber,
      } = newSeller;

      // Check if seller already exists before creating a new one
      let seller = await shopModel.findOne({ email: newSeller.email });
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
        selectedState,
        selectedCity,
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

// logout from shop

router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout successful!",
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// get shop info

router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await shopModel.findById(req.params.id);

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

//   shop review
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, shopId } = req.body;
      const shop = await shopModel.findById(shopId);

      const review = {
        user,
        rating,
        comment,
        shopId,
      };

      const isReviewed = shop.reviews.find(
        (rev) => rev.user?._id === req.user?._id
      );
      if (isReviewed) {
        shop.reviews.forEach((rev) => {
          if (rev.user?._id === req.user?._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        shop.reviews.push(review);
      }
      let avg = 0;
      shop.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      shop.ratings = avg / shop.reviews.length;

      await shop.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: "Review created successfully",
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

//  Update shop profile picture

router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existShop = await shopModel.findById(req.seller._id);

      // Delete old avatar if it exists
      if (existShop.avatar && existShop.avatar.public_id) {
        const existAvatarPath = `uploads/${existShop.avatar.public_id}`;
        fs.unlinkSync(existAvatarPath);
      }

      const fileUrl = path.join(req.file.filename); // Replace with actual URL
      const publicId = req.file.filename; // Assuming this is the file's public ID

      const shop = await shopModel.findByIdAndUpdate(
        req.seller._id,
        {
          avatar: {
            public_id: publicId,
            url: fileUrl,
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// Update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        description,
        avatar,
        selectedState,
        selectedCity,
        address,
        phoneNumber,
      } = req.body;

      const shop = await shopModel.findById(req.seller._id);

      if (!shop) {
        return next(errorHandler(400, "Shop not found"));
      }

      // Update fields only if they are provided in the request
      if (name) shop.name = name;
      if (description) shop.description = description;
      if (selectedState) shop.selectedState = selectedState;
      if (selectedCity) shop.selectedCity = selectedCity;
      if (address) shop.address = address;
      if (phoneNumber) shop.phoneNumber = phoneNumber;

      // Only update avatar if new data is provided
      if (avatar && avatar.public_id && avatar.url) {
        shop.avatar = avatar;
      }

      await shop.save();

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// All sellers ---admin only

router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await shopModel.find().sort({
        createdAt: -1
      });

      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

// delete seller ---admin only (AllSellers.jsx)

router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await shopModel.findById(req.params.id);
      if(!seller){
        return next(errorHandler(400, "Seller not found"));
      }
      await shopModel.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully",
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

export default router;
