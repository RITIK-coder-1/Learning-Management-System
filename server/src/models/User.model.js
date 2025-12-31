/* ---------------------------------------------------------------------------------------
User.model.js
This file builds the user schema for defining user data points
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

export default User;
