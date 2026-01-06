/* ---------------------------------------------------------------------------------------
OTP.model.js
This file builds the schema for OTP data fields for user verification
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";
import { mailSender } from "../../utils/index.utils.js";

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
Send an email to the user before saving the OTP
------------------------------------------------------------------------------------------ */

// function to handle the email sending logic
async function sendVerificationEmail(email, code) {
  try {
    const mailResponse = await mailSender(
      // the email of the user
      email,
      // the subject of the email
      "Verification Code from Ritik's Learning Management System",
      // the body
      `<h1>Please verify your email</h1>
       <p>Here is your OTP code: <b>${code}</b></p>`
    );
    console.log("OTP Model: Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log(
      "OTP Model Error: Problem occurred while sending email: ",
      error
    );
    throw error; // Stop the save process if email fails
  }
}

// The middleware
OTPSchema.pre("save", async function (next) {
  // Only send email if the document is new (not being updated)
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.code);
  }
  next(); // Continue to save to Database
});

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const OTP = new mongoose.model("OTP", OTPSchema);

export default OTP;
