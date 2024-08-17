import express from "express";
import path from "path";
import { upload } from "../multer.js";
import userModel from "../model/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import fs from "fs";

const router = express.Router();

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
          } else {
            res.json({ message: "Successfully deleted file" });
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
      const newUser = await userModel.create(user);
      res.status(201).json({
        success: true,
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);
