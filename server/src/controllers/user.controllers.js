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
Error Handling
------------------------------------------------------------------------------------------ */

const createRegisterOtp = asyncHandler(createRegisterOtpFunction);
const registerUser = asyncHandler(registerUserFunction);
const createLoginOtp = asyncHandler(createLogInOtpFunction);
const loginUser = asyncHandler(loginFunction);
const logoutUser = asyncHandler(logoutFunction);
const getUser = asyncHandler(getUserFunction);

export {
  createRegisterOtp,
  registerUser,
  createLoginOtp,
  loginUser,
  logoutUser,
  getUser,
};
