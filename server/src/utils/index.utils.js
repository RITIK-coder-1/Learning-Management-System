/* ---------------------------------------------------------------------------------------
index.utils.js
This is a centralized exporting file for every single utility
------------------------------------------------------------------------------------------ */

import ApiResponse from "./api/apiResponse.js";
import ApiError from "./api/apiError.js";
import asyncHandler from "./errorHandler/asyncHandler.js";
import mailSender from "./otp/mailSender.js";
import generateOTP from "./otp/otpGenerator.js";
import generateRefreshTokenString from "./tokens/generateRefreshTokenString.js";
import uploadOnCloudinary from "./files/cloudinary.js";
import deleteFromCloudinary from "./files/deleteFromCloudinary.js";
import calculateAge from "./additional/calculateAge.js";
import deleteCourse from "./additional/deleteCourse.js";

export {
  ApiResponse,
  ApiError,
  asyncHandler,
  mailSender,
  generateOTP,
  generateRefreshTokenString,
  uploadOnCloudinary,
  deleteFromCloudinary,
  calculateAge,
  deleteCourse,
};
