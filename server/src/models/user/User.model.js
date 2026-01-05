/* ---------------------------------------------------------------------------------------
User.model.js
This file builds the user schema for defining the user data points
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minlength: 6,
      maxlength: 30,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: false,
      minlength: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Student", "Instructor"],
      default: "Student",
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    refreshTokenString: String,
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
Hashing password before saving it to the document for security
------------------------------------------------------------------------------------------ */

async function hashPassword(next) {
  if (!this.isModified("password")) {
    return next(); // If password hasn't been modified, skip hashing and move on.
  }

  // Perform hashing with error handling
  try {
    this.password = await bcrypt.hash(this.password, 10); // hash the passoword with 10 salt rounds
    console.log("User Model:  Password successfully hashed before saving.");
    next(); // Proceed to save only after successful hashing
  } catch (error) {
    // If hashing fails, log the error and pass it to Mongoose to abort the save operation, preventing plain text data exposure.
    console.error("User Model Error:  Failed to hash password.", error);
    next(error); // Abort the save operation
  }
}

userSchema.pre("save", hashPassword);

/* ---------------------------------------------------------------------------------------
Custom Method to validate the user password for logging in purposes 
------------------------------------------------------------------------------------------ */

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) {
    console.warn(
      "User Model Warning: Attempted to compare password on a document missing a hash."
    ); // if the stored password is missing
    return false;
  }
  try {
    // 'password' is the plain text string submitted by the user.
    // 'this.password' is the hashed string retrieved from the database document.
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // If the comparison fails due to a library error (e.g., malformed hash)
    console.error(
      "Critical USER MODEL error during password comparison:",
      error.message
    );
    return false;
  }
};

/* ---------------------------------------------------------------------------------------
Custom Method to generate the access and the refresh tokens
------------------------------------------------------------------------------------------ */

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function (uniqueTokenString) {
  return jwt.sign(
    {
      _id: this._id, // the id is saved for the refresh token
      uniqueToken: uniqueTokenString, // this unique string separates two distinct refresh tokens
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const User = new mongoose.model("User", userSchema);

export default User;
