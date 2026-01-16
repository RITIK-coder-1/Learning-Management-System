/* ---------------------------------------------------------------------------------------
user.routes.js
This file handles all the user related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { upload, verifyJwt } from "../middleware/index.middleware.js";
import {
  getUser,
  updateUserDetails,
  updatePassword,
  createUpdateEmailOtp,
  updateEmail,
  deleteProfilePic,
  deleteUserAccount,
} from "../controllers/user.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Get the user's profile, update and delete it.
- Get an OTP for email update and update the email by validating the OTP 
- Delete the user profile picture
- Update the user's password
------------------------------------------------------------------------------------------ */

router
  .route("/profile")
  .get(verifyJwt, getUser) // getting a user's details
  .patch(verifyJwt, upload.single("profilePic"), updateUserDetails) // updating a user's details
  .delete(verifyJwt, deleteUserAccount); // deleting the user
router
  .route("/profile/email")
  .post(verifyJwt, createUpdateEmailOtp) // validate data and generate an OTP
  .patch(verifyJwt, updateEmail); // validate OTP and update the email
router.route("/profile/pic").delete(verifyJwt, deleteProfilePic); // deleting a user's profile pic (only for students)
router.route("/profile/password").patch(verifyJwt, updatePassword); // updating the password of a user

export { router as userRouter };
