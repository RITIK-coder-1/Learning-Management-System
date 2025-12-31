/* ---------------------------------------------------------------------------------------
User.model.js
This file builds the user schema for defining user data points
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

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
      minlength: 3,
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
        required: true,
      },
    ],
    refreshTokenString: String,
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const User = new mongoose.model("User", userSchema);

export default User;
