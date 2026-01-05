/* ---------------------------------------------------------------------------------------
user.routes.js
This file handles all the user related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { upload, verifyJwt } from "../middleware/index.middleware.js";
import {
  registerUser,
  createRegisterOtp,
  createLoginOtp,
  loginUser,
  logoutUser,
  getUser,
  updateUserDetails,
} from "../controllers/user.controllers";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create OTP for register route 
- OTP validation and register route
- Create OTP for login route 
- OTP validation and login route
- Logout user
- Update the user's details
------------------------------------------------------------------------------------------ */

// PUBLIC ROUTES

router.route("/register").post(upload.single("profilePic"), createRegisterOtp); // validate data and generate an OTP
router.route("/register/otp").post(registerUser); // validate the OTP and register the user
router.route("/login").post(createLoginOtp); // validate data and generate an OTP
router.route("/login/otp").post(loginUser); // validate the OTP and login the user

// SECURED ROUTES

router.route("/logout").post(verifyJwt, logoutUser); // log the user out
router.route("/profile").post(verifyJwt, getUser); // getting a user's details
router.route("/profile/details").patch(verifyJwt, updateUserDetails); // updating a user's details

export { router as userRouter };
