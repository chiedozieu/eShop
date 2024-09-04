import catchAsyncErrors from "./catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    

  const { token } = req.cookies;
   
  if (!token) {
    return next(errorHandler(401, "Please login to continue"));
  }
 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log('Token valid, decoded:', decoded);
    req.user = await userModel.findById(decoded.id);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    next(errorHandler(401, "Invalid token, please login again"));
  }
});
