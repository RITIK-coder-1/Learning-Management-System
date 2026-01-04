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
  calculateAge,
  uploadOnCloudinary,
} from "../utils/index.utils";
import validator from "validator";

/* ---------------------------------------------------------------------------------------
REGISTER USER CONTROLLERS
------------------------------------------------------------------------------------------ */

// This function takes all the user data to register and sends an OTP to the email for verification purposes

const createRegisterOtpFunction = async (req, res) => {
  // Gathering all the important user data from the request object
  const { firstName, username, password, email, dateOfBirth, accountType } =
    req.body;
  const profilePicLocalPath = req.files?.profilePic[0]?.path;

  // Checking if mandatory fields are submitted or not
  const isImportantDataEmpty = [
    firstName,
    username,
    password,
    email,
    dateOfBirth,
    accountType,
  ].some((ele) => ele?.trim() === "");

  if (isImportantDataEmpty) {
    console.error("REGISTER USER ERROR: one of the important fields is empty!");
    throw new ApiError(400, "Please enter all the required fields!");
  }

  // checking if the email is correct or not
  if (!validator.isEmail(email)) {
    console.error("REGISTER USER ERROR: Invalid Email Format");
    throw new ApiError(400, "Please enter a valid email address!");
  }

  // instructor specific validations
  if (accountType === "Instructor") {
    const age = calculateAge(dateOfBirth);
    // Minors can't be instructors
    if (age < 18) {
      console.error(
        "REGISTER USER ERROR: the teacher is less than 18 years old."
      );
      throw new ApiError(
        400,
        "Sorry. Only Adults older than 18 can become instructors."
      );
    }

    // Instructors are required to upload a profile picture
    if (!profilePicLocalPath) {
      console.error(
        "REGISTER USER ERROR: Teacher hasn't uploaded a profile picture."
      );
      throw new ApiError(
        400,
        "Teachers are required to upload a profile picture!"
      );
    }
  }

  // Checking if the user already exists or not
  const isUserPresent = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserPresent) {
    console.error("REGISTER USER ERROR: the user is already present!");
    throw new ApiError(
      400,
      "The user with this username or email is already present!"
    );
  }

  // uploading the image on cloudinary
  const profilePic = await uploadOnCloudinary(profilePicLocalPath);

  if (!profilePic) {
    console.error("REGISTER USER ERROR: Can't upload the picture.");
    throw new ApiError(
      500,
      "There was a problem while uploading the profile picture. Please try again!"
    );
  }

  // Generating OTP
  const code = generateOTP();

  const createdOTP = await OTP.create({
    email,
    code,
  });

  if (!createdOTP) {
    console.error("REGISTER USER ERROR: couldn't generate OTP!");
    throw new ApiError(
      500,
      "There was a problem while generating the OTP. Please try again!"
    );
  }

  // success response to the client
  return res.status(200).json(
    new ApiResponse(200, "OTP has been sent successfully!", {
      // The profile pic string is saved temporarily by the frontend so that it can send on the OTP page
      profilePic,
    })
  );
};

// This method verifies the OTP submitted by the user and registers the user on the database

const registerUserFunction = async (req, res) => {
  // the frontend will temporarily save the user data and send it back for creation
  const {
    userOTP,
    profilePic,
    firstName,
    lastName,
    username,
    password,
    email,
    dateOfBirth,
    accountType,
  } = req.body;

  const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }); // the OTP saved in the database (the latest one only)

  if (userOTP !== recentOtp.code) {
    console.error("REGISTER USER ERROR: Wrong OTP!");
    throw new ApiError(
      400,
      "The OTP doesn't match! Please enter the correct one!"
    );
  }

  // uploading the user to the database
  const user = await User.create({
    firstName,
    lastName: lastName || "",
    username,
    password,
    email,
    dateOfBirth,
    accountType,
    profilePic: profilePic || "",
  });

  // last validation if the user has been registered
  if (!user) {
    console.error("REGISTER USER ERROR: user couldn't be registered.");
    throw new ApiError(
      500,
      "There was a problem while registering the user! Please try again!"
    );
  }

  // The user data is going to be sent in to JSON response without the password and the refresh token string
  // Convert Mongoose document to a plain JS object for safer manipulation
  const createdUser = user.toObject();
  delete createdUser.password;
  delete createdUser.refreshTokenString;

  return res
    .status(200)
    .json(new ApiResponse(200, "User has been created successfully!"));
};

/* ---------------------------------------------------------------------------------------
Error Handling
------------------------------------------------------------------------------------------ */

const createRegisterOtp = asyncHandler(createRegisterOtpFunction);
const registerUser = asyncHandler(registerUserFunction);

export { createRegisterOtp, registerUser };
