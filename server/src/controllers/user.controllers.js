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
  deleteFromCloudinary,
  generateRefreshTokenString,
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
  const profilePicLocalPath = req.file?.path;

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

  // checking if the username is less than 6 characters
  if (username.trim().length < 6) {
    console.error("REGISTER USER ERROR: username less than 6 chars!");
    throw new ApiError(400, "The username must be of 6 characters at least!");
  }

  // checking if the password is less than 10 characters
  if (password.trim().length < 6) {
    console.error("REGISTER USER ERROR: password less than 10 chars!");
    throw new ApiError(400, "The password must be of 10 characters at least!");
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

  return res
    .status(200)
    .json(new ApiResponse(200, "User has been created successfully!"));
};

/* ---------------------------------------------------------------------------------------
LOGIN USER CONTROLLER
------------------------------------------------------------------------------------------ */

// function to generate access and refresh tokens on logging in

const generateTokens = async (userId) => {
  const randomString = generateRefreshTokenString(); // this random set of strings is used with the refresh token to validate the user
  try {
    const user = await User.findById(userId);
    user.refreshTokenString = randomString; // refresh token string for security purposes

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken(randomString);

    await user.save({ validateBeforeSave: false }); // we don't validate each field whenever the user logs in or out

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("LOGIN USER ERROR: Generating tokens failed!!");
    throw new ApiError(500, "Could not generate tokens");
  }
};

// function to verify the user for login and generate an OTP

const createLogInOtpFunction = async (req, res) => {
  // getting data from the client request
  const { credential, password } = req.body;

  // validating the input data
  if (!credential?.trim() || !password?.trim()) {
    console.error("LOG IN ERROR: Invalid credential or password!");
    throw new ApiError(
      400,
      "At least one of the identifiers and password are required!"
    );
  }

  // checking if the input data (username/email and password) exist in the database

  const existingUser = await User.findOne({
    $or: [{ username: credential }, { email: credential }], // return true if at least either of them is present
  });
  const passwordValidator = await existingUser?.isPasswordCorrect(password); // returns true if the password is correct (only if the user exists)

  if (!existingUser || !passwordValidator) {
    console.error("LOG IN ERROR: invalid credentials!");
    throw new ApiError(
      401,
      "Invalid credentials. Please check your username/email and password, or sign up!"
    );
  }

  // Generating OTP
  const code = generateOTP();

  const createdOTP = await OTP.create({
    email: existingUser.email,
    code,
  });

  if (!createdOTP) {
    console.error("LOGIN USER ERROR: couldn't generate OTP!");
    throw new ApiError(
      500,
      "There was a problem while generating the OTP. Please try again!"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "OTP has been successfullt sent!"), {
      email: existingUser.email, // frontend stores this for the next request
    });
};

// function to verify the OTP and log the user in

const loginFunction = async (req, res) => {
  const { email, userOTP } = req.body;
  const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }); // the OTP saved in the database (the latest one only)

  if (userOTP !== recentOtp?.code) {
    console.error("LOGIN USER ERROR: Wrong OTP!");
    throw new ApiError(
      400,
      "The OTP doesn't match! Please enter the correct one!"
    );
  }

  // if the otp matches, we need to generate the access and refresh token
  const user = await User.findOne({ email });
  const { accessToken, refreshToken } = await generateTokens(user._id);

  // once the user has successfully logged in, we need to send in the cookies to the client

  const options = {
    httpOnly: true, // cookie can't be manipulated by the client
    secure: process.env.NODE_ENV === "production", // False on localhost (HTTP is allowed), True on external cloud (HTTPS only)
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/", // ensuring the cookie is sent to all routes
  };

  return res.status(200).cookie("refreshToken", refreshToken, options).json(
    new ApiResponse(200, "The user has successfully logged in!", {
      accessToken,
    })
  );
};

/* ---------------------------------------------------------------------------------------
LOGOUT USER CONTROLLER
------------------------------------------------------------------------------------------ */

const logoutFunction = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    console.error("LOGOUT ERROR: invalid user id");
    throw new ApiError(400, "Invalid user!");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshTokenString: null, // the refresh token should be changed to null once the user logs out
      },
    },
    {
      new: true, // it returns the updated document
    }
  );

  if (!user) {
    console.error("LOGOUT FAILED!");
    throw new ApiError(400, "The user couldn't be logged out!");
  }

  // cookie security options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  };

  // clearing the cookies and the tokens once the user is logged out successfully
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged Out Succesfully!"));
};

/* ---------------------------------------------------------------------------------------
GET USER CONTROLLER
This is a function to fetch a single user's details
------------------------------------------------------------------------------------------ */

const getUserFunction = async (req, res) => {
  // getting the user id
  const userId = req.user._id;

  if (!userId) {
    console.error("FETCHING USER ERROR: Invalid user id");
    throw new ApiError(400, "Invalid User ID");
  }

  // getting the user
  const user = await User.findOne({ _id: userId });

  if (!user) {
    console.error("FETCHING USER ERROR: Invalid user");
    throw new ApiError(400, "User doesn't exist!");
  }

  // returning the user data to the client
  return res
    .status(200)
    .json(new ApiResponse(200, "User has been fetched successfully"), user);
};

/* ---------------------------------------------------------------------------------------
UPDATE USER CONTROLLER
This is a function to update a user's details including the profile picture (not password and email)
------------------------------------------------------------------------------------------ */

const updateUserDetailsFunction = async (req, res) => {
  // gathering data to update
  const { firstName, lastName, username } = req.body; // (Account type and DOB can't be changed once created)
  const profilePicLocalPath = req.file?.path;
  const userId = req.user?._id;

  // checking if there is no updated value
  const currentUser = await User.findById(userId);

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
    _id: { $ne: userId }, // find excluding the current user
  });

  if (existingUsername) {
    console.error("UPDATE USER DETAILS ERROR: updated username already exists");
    throw new ApiError(
      400,
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
        400,
        "The profile picture couldn't be uploaded. Please try again!"
      );
    }

    // deleting the old file from cloudinary

    const oldProfile = currentUser.profilePic; // the old file
    await deleteFromCloudinary(oldProfile);
  }

  // updating the user
  currentUser.fullName = fullName;
  currentUser.lastName = lastName || "";
  currentUser.username = username;

  if (profilePic) {
    currentUser.profilePic = profilePic; // re-write the profile pic only if it is updated
  }

  await currentUser.save({ validateBeforeSave: false });

  // sending the response
  return res
    .status(200)
    .json(new ApiResponse(200, "The details are successfully updated!"));
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
  const user = await User.findById(req.user?._id);
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
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "The password has been successfully updated!"));
};

/* ---------------------------------------------------------------------------------------
EMAIL PASSWORD CONTROLLER
------------------------------------------------------------------------------------------ */

const updateEmailFunction = async (req, res) => {};

/* ---------------------------------------------------------------------------------------
Error Handling
------------------------------------------------------------------------------------------ */

const createRegisterOtp = asyncHandler(createRegisterOtpFunction);
const registerUser = asyncHandler(registerUserFunction);
const createLoginOtp = asyncHandler(createLogInOtpFunction);
const loginUser = asyncHandler(loginFunction);
const logoutUser = asyncHandler(logoutFunction);
const getUser = asyncHandler(getUserFunction);
const updateUserDetails = asyncHandler(updateUserDetailsFunction);
const updatePassword = asyncHandler(updatePasswordFunction);
const updateEmail = asyncHandler(updateEmailFunction);

export {
  createRegisterOtp,
  registerUser,
  createLoginOtp,
  loginUser,
  logoutUser,
  getUser,
  updateUserDetails,
  updatePassword,
  updateEmail,
};
