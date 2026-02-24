/* ---------------------------------------------------------------------------------------
Login.jsx
The page to login a user
------------------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { useLoginMutation, useLoginOtpMutation } from "../../../api/index.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/authSlice";
import {
  CommonButton,
  FieldInput,
  Form,
  OtpInput,
} from "@/components/index.components";

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
  const otpCodeFunction = (data) =>
    setOtpValidationData({
      ...otpValidationData,
      userOTP: data,
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
    <div className="w-full min-h-screen flex justify-center items-center">
      {/* the form element */}
      <Form onSubmit={handleSubmit}>
        {/* Credential */}
        <FieldInput
          name="credential"
          onChange={setValue}
          label="Enter email/username"
          placeholder="username/email"
          disabled={isOtp}
        />

        {/* Password */}
        <FieldInput
          name="password"
          onChange={setValue}
          label="Password"
          inputType="password"
          placeholder="••••••••••••••••"
          disabled={isOtp}
        />

        {/* OTP */}
        <div className={isOtp ? "visible" : "hidden"}>
          <OtpInput
            name="userOTP"
            required={isOtp}
            setterFunction={otpCodeFunction}
          />
        </div>

        {/* Submit */}
        <CommonButton type="submit" label={isOtp ? "Log in" : "Submit"} />
      </Form>
    </div>
  );
}

export default Login;
