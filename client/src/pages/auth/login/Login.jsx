/* ---------------------------------------------------------------------------------------
Login.jsx
The page to login a user
------------------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { useLoginMutation, useLoginOtpMutation } from "../../../api/index.api";

function Login() {
  /* ---------------------------------------------------------------------------------------
  The states of the page 
  ------------------------------------------------------------------------------------------ */

  const [isOtp, setIsOtp] = useState(false)

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Query hooks for login 
  ------------------------------------------------------------------------------------------ */

  const [createLoginOtp, {}] = useLoginOtpMutation();
  const [loginUser, {}] = useLoginMutation();

  /* ---------------------------------------------------------------------------------------
  The methods to manipulate the states 
  ------------------------------------------------------------------------------------------ */

  /* ---------------------------------------------------------------------------------------
  sending data to the server
  ------------------------------------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      />

      {/* Password */}
      <label htmlFor="password">Enter your password: </label>
      <input
        type={"password"}
        className="outline"
        id="password"
        name="password"
      />

      {/* OTP */}
      <div className={isOtp ? "visible" : "hidden"}>
        <label htmlFor="userOTP">Enter the OTP: </label>
        <input
          type={"text"}
          className="outline"
          id="userOTP"
          name="userOTP"
        />
      </div>

      {/* Submit */}
      <button type="submit" className="outline">
        Submit
      </button>
    </form>
  );
}

export default Login;
