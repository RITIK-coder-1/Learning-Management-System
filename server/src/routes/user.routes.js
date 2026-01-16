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
  updatePassword,
  createUpdateEmailOtp,
  updateEmail,
  newAccessToken,
  deleteProfilePic,
  deleteUserAccount,
} from "../controllers/user.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create OTP for register route 
- OTP validation and register route
- Create OTP for login route 
- OTP validation and login route
- New Token 
- Logout user
- Get the user's profile, update and delete it. Get an OTP for email update. 
- Update the email by validating the OTP 
- Delete the user profile picture
- Update the user's password
------------------------------------------------------------------------------------------ */

// PUBLIC ROUTES

router
  .route("/register-otp")
  .post(upload.single("profilePic"), createRegisterOtp); // validate data and generate an OTP
router.route("/register").post(registerUser); // validate the OTP and register the user
router.route("/login-otp").post(createLoginOtp); // validate data and generate an OTP
router.route("/login").post(loginUser); // validate the OTP and login the user
router.route("/token").post(newAccessToken); // generate a new access token after expiration

// SECURED ROUTES

router.route("/logout").post(verifyJwt, logoutUser); // log the user out
router
  .route("/profile")
  .get(verifyJwt, getUser) // getting a user's details
  .patch(verifyJwt, updateUserDetails) // updating a user's details
  .delete(verifyJwt, deleteUserAccount); // deleting the user
router
  .route("/profile/email")
  .post(verifyJwt, createUpdateEmailOtp) // validate data and generate an OTP
  .patch(verifyJwt, updateEmail); // validate OTP and update the email
router.route("/profile/pic").delete(verifyJwt, deleteProfilePic); // deleting a user's profile pic (only for students)
router.route("/profile/password").patch(verifyJwt, updatePassword); // updating the password of a user

export { router as userRouter };
