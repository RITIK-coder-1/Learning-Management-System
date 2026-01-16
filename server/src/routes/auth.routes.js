/* ---------------------------------------------------------------------------------------
auth.routes.js
All the routes for auth flows 
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { upload, verifyJwt } from "../middleware/index.middleware.js";
import {
  registerUser,
  createRegisterOtp,
  createLoginOtp,
  loginUser,
  logoutUser,
  newAccessToken,
} from "../controllers/auth.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create OTP for register route 
- OTP validation and register route
- Create OTP for login route 
- OTP validation and login route
- New Token 
- Logout user
------------------------------------------------------------------------------------------ */

// PUBLIC ROUTES

router
  .route("/register-otp")
  .post(upload.single("profilePic"), createRegisterOtp); // validate data and generate an OTP
router.route("/register").post(registerUser); // validate the OTP and register the user
router.route("/login-otp").post(createLoginOtp); // validate data and generate an OTP
router.route("/login").post(loginUser); // validate the OTP and login the user
router.route("/token").post(newAccessToken); // generate a new access token after expiration

// SECURED ROUTE
router.route("/logout").post(verifyJwt, logoutUser); // log the user out

export { router as authRouter };
