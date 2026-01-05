/* ---------------------------------------------------------------------------------------
index.utils.js
This is a centralized exporting file for every single utility
------------------------------------------------------------------------------------------ */

import ApiResponse from "./api/apiResponse";
import ApiError from "./api/apiError";
import asyncHandler from "./errorHandler/asyncHandler";
import mailSender from "./otp/mailSender";
import generateOTP from "./otp/otpGenerator";
import generateRefreshTokenString from "./tokens/generateRefreshTokenString";
import uploadOnCloudinary from "./files/cloudinary";
import deleteFromCloudinary from "./files/deleteFromCloudinary";
import calculateAge from "./additional/calculateAge";

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
};
