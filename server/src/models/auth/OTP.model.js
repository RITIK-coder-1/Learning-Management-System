/* ---------------------------------------------------------------------------------------
OTP.model.js
This file builds the schema for OTP data fields for user verification
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String, // prevents mongodb from automatically removing 0 as the first digit
    // exactly 6 digits
    min: 100000,
    max: 999999,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // after 5 mins
  },
});

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const OTP = new mongoose.model("OTP", OTPSchema);

export default OTP;
