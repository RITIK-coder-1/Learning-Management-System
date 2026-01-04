/* ---------------------------------------------------------------------------------------
otpGenerator.js
This is a function to generate random OTPs
------------------------------------------------------------------------------------------ */

import otpGenerator from "otp-generator";

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

export default generateOTP;
