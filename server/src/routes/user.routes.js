/* ---------------------------------------------------------------------------------------
user.routes.js
This file handles all the user related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { upload, verifyJwt } from "../middleware/index.middleware.js";
import {
  registerUser,
  createRegisterOtp,
} from "../controllers/user.controllers";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create OTP for register route 
- OTP validation and register route
------------------------------------------------------------------------------------------ */

// PUBLIC ROUTES

router.route("/register").post(upload.single("profilePic"), createRegisterOtp); // validate data and generate OTP
router.route("/register/otp").post(registerUser); // validate OTP and register the user

// SECURED ROUTES

export { router as userRouter };
