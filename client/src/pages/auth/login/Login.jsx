/* ---------------------------------------------------------------------------------------
Login.jsx
The page to login a user
------------------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { useLoginMutation, useLoginOtpMutation } from "../../../api/index.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/authSlice";
import { Logout } from "../../../components/index.components";

function Login() {
  /* ---------------------------------------------------------------------------------------
  The states of the page 
  ------------------------------------------------------------------------------------------ */

  // the data for otp creation
  const [loginData, setLoginData] = useState({
    credential: "",
    password: "",
  });

  // the data to validate the otp and logging in
  const [otpValidationData, setOtpValidationData] = useState({
    email: "",
    userOTP: "",
  });

  const [isOtp, setIsOtp] = useState(false); // control visibility of the otp field

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Query hooks for login 
  ------------------------------------------------------------------------------------------ */

  const [createLoginOtp, {}] = useLoginOtpMutation();
  const [loginUser, {}] = useLoginMutation();

  const dispatch = useDispatch();

  /* ---------------------------------------------------------------------------------------
  The methods to manipulate the states 
  ------------------------------------------------------------------------------------------ */

  // set the value of each login field
  const setValue = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // setting the otp data
  const otpCodeFunction = (e) =>
    setOtpValidationData({
      ...otpValidationData,
      [e.target.name]: e.target.value,
    });

  /* ---------------------------------------------------------------------------------------
  sending data to the server
  ------------------------------------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1: send login data for otp creation
    // 2: send the email and user submitted otp for logging in

    if (!isOtp) {
      try {
        const { data } = await createLoginOtp(loginData).unwrap();
        setIsOtp(true);
        setOtpValidationData({ ...otpValidationData, email: data.email }); // accessing the email for sending to the server
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const { data: user } = await loginUser(otpValidationData).unwrap();
        dispatch(setUser(user)); // changing the value of the authentication state
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    // the form element
    <form
      className="border w-88 h-auto p-3 flex flex-col justify-center gap-2 items-center"
      onSubmit={handleSubmit}
    >
      {/* Credential */}
      <label htmlFor="credential">Enter your email or username: </label>
      <input
        type={"text"}
        className="outline"
        id="credential"
        name="credential"
        required
        onChange={setValue}
      />

      {/* Password */}
      <label htmlFor="password">Enter your password: </label>
      <input
        type={"password"}
        className="outline"
        id="password"
        name="password"
        onChange={setValue}
      />

      {/* OTP */}
      <div className={isOtp ? "visible" : "hidden"}>
        <label htmlFor="userOTP">Enter the OTP: </label>
        <input
          type={"text"}
          className="outline"
          id="userOTP"
          name="userOTP"
          onChange={otpCodeFunction}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="outline">
        Submit
      </button>
      <Logout />
    </form>
  );
}

export default Login;
