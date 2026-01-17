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

router.use(verifyJwt); // important verification

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Get the user's profile, update and delete it.
- Get an OTP for email update and update the email by validating the OTP 
- Delete the user profile picture
- Update the user's password
------------------------------------------------------------------------------------------ */

// USER PROFILE OPERATIONS
router
  .route("/profile")
  .get(getUser) // getting a user's details
  .patch(upload.single("profilePic"), updateUserDetails) // updating a user's details
  .delete(deleteUserAccount); // deleting the user
router
  .route("/profile/email")
  .post(createUpdateEmailOtp) // validate data and generate an OTP
  .patch(updateEmail); // validate OTP and update the email
router.route("/profile/pic").delete(deleteProfilePic); // deleting a user's profile pic (only for students)
router.route("/password").patch(updatePassword); // updating the password of a user

export { router as userRouter };
