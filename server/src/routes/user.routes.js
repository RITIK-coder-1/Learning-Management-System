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
} from "../controllers/user.controllers";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create OTP for register route 
- OTP validation and register route
------------------------------------------------------------------------------------------ */

// PUBLIC ROUTES

router.route("/register").post(upload.single("profilePic"), createRegisterOtp); // validate data and generate an OTP
router.route("/register/otp").post(registerUser); // validate the OTP and register the user
router.route("/login").post(createLoginOtp); // validate data and generate an OTP
router.route("/login/otp").post(loginUser); // validate the OTP and login the user

// SECURED ROUTES

export { router as userRouter };
