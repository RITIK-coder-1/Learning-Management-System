/* ---------------------------------------------------------------------------------------
Login.jsx
The page to login a user
------------------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  // the data to validate the otp and log in
  const [email, setEmail] = useState(""); // the email to match the otp
  const [userOTP, setUserOTP] = useState(""); // the otp entered by the user

  // control visibility of the otp field
  const [isOtp, setIsOtp] = useState(false);

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
  const otpCodeFunction = (data) => setUserOTP(data);

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
        setEmail(data?.email);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const { data: user } = await loginUser({ email, userOTP }).unwrap();
        dispatch(setUser({ id: user?._id, accountType: user?.accountType })); // changing the value of the authentication state
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Credential */}
      <FieldInput
        name="credential"
        onChange={setValue}
        label="Enter email/username"
        placeholder="username/email"
        disabled={isOtp}
        value={loginData.credential}
      />

      {/* Password */}
      <FieldInput
        name="password"
        onChange={setValue}
        label="Password"
        inputType="password"
        placeholder="••••••••••••••••"
        disabled={isOtp}
        value={loginData.password}
      />

      {/* OTP */}
      <div className={isOtp ? "visible" : "hidden"}>
        <OtpInput
          name="userOTP"
          required={isOtp}
          setterFunction={otpCodeFunction}
          value={userOTP}
        />
      </div>

      {/* Submit */}
      <CommonButton type="submit" label={isOtp ? "Log in" : "Submit"} />

      {/* Registration CTA */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
        >
          Register here
        </Link>
      </div>
    </Form>
  );
}

export default Login;
