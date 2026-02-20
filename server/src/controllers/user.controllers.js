/* ---------------------------------------------------------------------------------------
user.controllers.js
All the controllers for users including authentication 
------------------------------------------------------------------------------------------ */

import { User, OTP } from "../models/index.model.js";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  generateOTP,
  uploadOnCloudinary,
  deleteFromCloudinary,
  deleteCourse,
} from "../utils/index.utils.js";
import validator from "validator";

/* ---------------------------------------------------------------------------------------
GET USER CONTROLLER
This is a function to fetch a single user's details
------------------------------------------------------------------------------------------ */

const getUserFunction = async (req, res) => {
  const user = req.user;

  if (!user) {
    console.error("FETCHING USER ERROR: Invalid user");
    throw new ApiError(400, "User doesn't exist!");
  }

  console.log("User has been fetched successfully");

  // returning the user data to the client
  return res
    .status(200)
    .json(new ApiResponse(200, "User has been fetched successfully", user));
};

/* ---------------------------------------------------------------------------------------
UPDATE USER CONTROLLER
This is a function to update a user's details including the profile picture (not password and email)
------------------------------------------------------------------------------------------ */

const updateUserDetailsFunction = async (req, res) => {
  // gathering data to update
  const { firstName, lastName, username } = req.body; // (Account type and DOB can't be changed once created)
  const profilePicLocalPath = req.file?.path;
  const currentUser = req.user;

  // checking if there is no updated value
  if (
    currentUser.firstName === firstName &&
    currentUser.lastName === lastName &&
    currentUser.username === username &&
    !profilePicLocalPath
  ) {
    console.error("UPDATE USER DETAILS ERROR: no updated value provided");
    throw new ApiError(400, "Please enter any updated value!");
  }

  // validating important text data
  const isImportantDataEmpty = [firstName, username].some(
    (ele) => ele.trim() === ""
  );

  if (isImportantDataEmpty) {
    console.error("UPDATE USER DETAILS ERROR: invalid data");
    throw new ApiError(400, "First name and username can't be empty!");
  }

  // checking if the entered username already matches an existing one
  const existingUsername = await User.findOne({
    username,
    _id: { $ne: currentUser._id }, // find excluding the current user
  });

  if (existingUsername) {
    console.error("UPDATE USER DETAILS ERROR: updated username already exists");
    throw new ApiError(
      409,
      "This username already exists. Please enter a new one!"
    );
  }

  // checking if the username is of minimum 6 characters
  if (username.trim().length < 6) {
    console.error(
      "UPDATE USER DETAILS ERROR: username is less than 6 characters"
    );
    throw new ApiError(400, "The username must be of 6 characters minimum!");
  }

  // upload profile pic only if it is updated
  let profilePic = "";
  if (profilePicLocalPath) {
    profilePic = await uploadOnCloudinary(profilePicLocalPath);
    if (!profilePic) {
      console.error(
        "UPDATE USER DETAILS ERROR: profile picture couldnt' be uploaded"
      );
      throw new ApiError(
        500,
        "The profile picture couldn't be uploaded. Please try again!"
      );
    }

    // deleting the old file from cloudinary (only if the user had a profile)

    if (currentUser.profilePic) {
      const oldProfile = currentUser.profilePic; // the old file
      await deleteFromCloudinary(oldProfile);
    }
  }

  // updating the user
  currentUser.firstName = firstName;
  currentUser.lastName = lastName || "";
  currentUser.username = username;

  if (profilePic) {
    currentUser.profilePic = profilePic.url; // re-write the profile pic only if it is updated
  }

  const newUser = await currentUser.save({ validateBeforeSave: false });

  if (!newUser) {
    console.error("UPDATE USER DETAILS ERROR: problem updating!");
    throw new ApiError(
      500,
      "There was a problem while updating the details. Please try again!"
    );
  }

  console.log("User details are updated!");

  // sending the response
  return res
    .status(200)
    .json(new ApiResponse(200, "Update successful!", newUser));
};

/* ---------------------------------------------------------------------------------------
UPDATE PASSWORD CONTROLLER
------------------------------------------------------------------------------------------ */

const updatePasswordFunction = async (req, res) => {
  // getting the old and the new passwords
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword?.trim() || !newPassword?.trim()) {
    console.error("PASSWORD UPDATE ERROR: empty field");
    throw new ApiError(400, "Both the fields are required!");
  }

  // verifying the old password
  const user = await User.findById(req.user._id); // manually finding the document because the object in the request doesn't have the password field
  const passwordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!passwordCorrect) {
    console.error("PASSWORD UPDATE ERROR: incorrect password");
    throw new ApiError(400, "Incorrect Password!");
  }

  // checking if the password is of at least 10 characters
  if (newPassword.trim().length < 10) {
    console.error("PASSWORD UPDATE ERROR: password less than 10 characters.");
    throw new ApiError(
      400,
      "The password should at least be of 10 characters!"
    );
  }

  // checking if both the passwords are distinct
  if (oldPassword === newPassword) {
    console.error("PASSWORD UPDATE ERROR: both the passwords are equal");
    throw new ApiError(400, "Please enter a new password!");
  }

  // updating the password
  user.password = newPassword;

  // This triggers the pre("save") hook and hashes the password
  const newUser = await user.save({ validateBeforeSave: false });

  if (!newUser) {
    console.error("UPDATE USER PASSWORD ERROR: problem updating!");
    throw new ApiError(
      500,
      "There was a problem while updating the password. Please try again!"
    );
  }

  console.log("User password updated!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The password has been successfully updated!"));
};

/* ---------------------------------------------------------------------------------------
UPDATE EMAIL CONTROLLERS
------------------------------------------------------------------------------------------ */

// this function validates the user data and sends an OTP to the current email

const createUpdateEmailOtpFunction = async (req, res) => {
  // getting the new email to update and the password for security
  const { newEmail, password } = req.body;

  if (!newEmail.trim() || !password.trim()) {
    console.error("UPDATE EMAIL ERROR: empty field!");
    throw new ApiError(400, "Both the fields are mandatory!");
  }

  // validating the email
  if (!validator.isEmail(newEmail)) {
    console.error("UPDATE EMAIL ERROR: invalid email!");
    throw new ApiError(400, "Please enter a valid email address!");
  }

  // checking if the email already exists
  const emailExists = await User.findOne({ email: newEmail });
  if (emailExists) {
    console.error("UPDATE EMAIL ERROR: the email already exists!");
    throw new ApiError(
      409,
      "This email is already registered to another account!"
    );
  }

  // checking the password
  const user = await User.findById(req.user._id); // manually finding the document because the object in the request doesn't have the password field
  const passwordCorrect = await user.isPasswordCorrect(password);

  if (!passwordCorrect) {
    console.error("UPDATE EMAIL ERROR: incorrect password!");
    throw new ApiError(400, "Incorrect Password!");
  }

  // checking if it's the same email
  if (newEmail === user.email) {
    console.error("UPDATE EMAIL ERROR: no updated email!");
    throw new ApiError(
      409,
      "This email is already registered to your account!"
    );
  }

  // generating an OTP
  const code = generateOTP();

  const generatedOtp = await OTP.create({
    email: newEmail,
    code,
  });

  if (!generatedOtp) {
    console.error("UPDATE EMAIL ERROR: otp couldnt' be generated!");
    throw new ApiError(
      500,
      "There was a problem while generating an OTP. Please try again!"
    );
  }

  console.log("Update OTP sent!");

  return res.status(200).json(
    new ApiResponse(
      200,
      "The OTP has been successfully sent to your new email!",
      {
        newEmail,
      }
    )
  );
};

// this function validates the OTP and updates the email

const updateEmailFunction = async (req, res) => {
  // getting the otp
  const { userOtp, newEmail } = req.body;

  if (!userOtp) {
    console.error("UPDATE EMAIL ERROR: invalid otp!");
    throw new ApiError(400, "Please enter a valid OTP!");
  }

  const recentOtp = await OTP.findOne({ email: newEmail }).sort({
    createdAt: -1,
  }); // the OTP saved in the database (the latest one only)

  if (userOtp !== recentOtp?.code) {
    console.error("UPDATE EMAIL ERROR: Wrong OTP!");
    throw new ApiError(
      400,
      "The OTP doesn't match! Please enter the correct one!"
    );
  }

  // updating the email
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        email: newEmail,
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    console.error("UPDATE EMAIL ERROR: email didn't update!");
    throw new ApiError(
      500,
      "There was a problem while updating the email. Please try again!"
    );
  }

  console.log("Email has been updated!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, "The email has been successfully updated!", user)
    );
};

/* ---------------------------------------------------------------------------------------
DELETE PROFILE PIC CONTROLLER 
This will be available only on the interface of students
------------------------------------------------------------------------------------------ */

const deleteProfilePicFunction = async (req, res) => {
  // getting the user profile
  const user = req.user;

  if (!user) {
    console.error("PROFILE PIC DELETE ERROR: invalid user");
    throw new ApiError(400, "Invalid user!");
  }

  // deleting the pic
  try {
    await deleteFromCloudinary(user.profilePic);
  } catch (error) {
    console.error("PROFILE PIC DELETE ERROR: couldn't be deleted");
    throw new ApiError(
      500,
      "The profile pic couldn't be deleted. Please try again!"
    );
  }

  // updating the database
  user.profilePic = ""; // default avatar will be set by the frontend
  const newUser = await user.save({ validateBeforeSave: false });

  if (!newUser) {
    console.error("PROFILE PIC DELETE ERROR: problem updating!");
    throw new ApiError(
      500,
      "There was a problem while deleting the pic. Please try again!"
    );
  }

  console.log("Profile pic deleted successfully!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The profile has been successfully deleted!", newUser));
};

/* ---------------------------------------------------------------------------------------
DELETE THE USER ACCOUNT CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteUserAccountFunction = async (req, res) => {
  // getting the user's details
  const user = await User.findById(req.user._id);

  if (!user) {
    console.error("USER DELETE ERROR: invalid user");
    throw new ApiError(400, "Invalid user!");
  }

  // checking if the password is correct
  const { password } = req.body;
  const passwordValidation = await user.isPasswordCorrect(password);

  if (!passwordValidation) {
    console.error("USER DELETE ERROR: incorrect password");
    throw new ApiError(400, "Incorrect Password!");
  }

  // if the user has any profile pic, delete it
  if (user.profilePic) {
    try {
      await deleteFromCloudinary(user.profilePic);
    } catch (error) {
      console.error(
        "USER DELETE NON-CRITICAL ERROR: the profile pic couldn't be deleted"
      );
    }
  }

  // if it's a teacher, delete all their courses
  if (user.accountType === "Instructor") {
    try {
      user.createdCourses.forEach(async (id) => await deleteCourse(id));

      console.log("Course successfully deleted!");
    } catch (error) {
      console.error(
        "USER DELETE ERROR: There was a problem while deleting the course."
      );
      throw new ApiError(
        500,
        "There was a problem while deleting your account. Please try again!"
      );
    }
  }

  // delete the user
  try {
    await User.deleteOne({ _id: user._id });
  } catch (error) {
    console.error("USER DELETE ERROR: user couldn't be deleted");
    throw new ApiError(
      500,
      "There was a problem while deleting your account. Please try again!"
    );
  }

  // clearing the cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  };

  console.log("Account deleted!");

  return res
    .status(204)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(204, "The user has been successfully deleted"));
};

/* ---------------------------------------------------------------------------------------
Error Handling
------------------------------------------------------------------------------------------ */

const getUser = asyncHandler(getUserFunction);
const updateUserDetails = asyncHandler(updateUserDetailsFunction);
const updatePassword = asyncHandler(updatePasswordFunction);
const createUpdateEmailOtp = asyncHandler(createUpdateEmailOtpFunction);
const updateEmail = asyncHandler(updateEmailFunction);
const deleteProfilePic = asyncHandler(deleteProfilePicFunction);
const deleteUserAccount = asyncHandler(deleteUserAccountFunction);

export {
  getUser,
  updateUserDetails,
  updatePassword,
  createUpdateEmailOtp,
  updateEmail,
  deleteProfilePic,
  deleteUserAccount,
};
