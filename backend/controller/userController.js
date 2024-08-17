import express from "express";
import path from "path";
import { upload } from "../multer.js";
import userModel from "../model/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { sendToken } from "../utils/jwtToken.js";

const router = express.Router();

// Create the activation token function
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Route to create a user and send activation email
export const createUser = router.post(
  "/create-user",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const userEmail = await userModel.findOne({ email });
      if (userEmail) {
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

      const user = {
        name: name,
        email: email,
        password: password,
        avatar: {
          public_id: filename,
          url: fileUrl,
        },
      };

      const activationToken = createActivationToken(user);

      const activationUrl = `http://localhost:3000/activation/${activationToken}`;

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `Hello ${user.name}, please click the link to activate your account: ${activationUrl}`,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
        });
      } catch (error) {
        return next(errorHandler(500, error.message));
      }
    } catch (error) {
      next(error);
    }
  }
);

// Route to activate the user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_Token } = req.body;

      const newUser = jwt.verify(
        activation_Token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(errorHandler(400, "Invalid activation token"));
      }

      const { name, email, password, avatar } = newUser;

      let user = await userModel.findOne({ email });

      if (user) {
        return next(errorHandler(400, "User already exists"));
      }

      user = await userModel.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  })
);

export default router;
