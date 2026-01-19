/* ---------------------------------------------------------------------------------------
RegisterOtp.jsx
The page to take the user data and generate an OTP
------------------------------------------------------------------------------------------ */
import React, { useState } from "react";
import { useRegisterOtpMutation } from "../../../api/index.api.js";

function RegisterOtp() {
  // The user object
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    dateOfBirth: "",
    accountType: "Student",
    profilePic: "",
  });

  // the register otp function
  const [registerOtp, {}] = useRegisterOtpMutation();

  // setting the user text data
  const setRegisteringData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // setting the user profile image
  const fileData = (e) => {
    const image = e.target.files[0];
    setUserData({ ...userData, profilePic: image });
  };

  // sending data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    try {
      const successData = await registerOtp(formData).unwrap();
      console.log("Successful Register OTP: ", successData);
    } catch (error) {
      console.log(error.data?.message);
    }
  };

  return (
    // the form element
    <>
      <form
        className="border w-88 h-auto p-3 flex flex-col justify-center gap-2 items-center"
        onSubmit={handleSubmit}
      >
        {/* First Name */}
        <label htmlFor="firstName">First Name: </label>
        <input
          type={"text"}
          className="outline"
          id="firstName"
          name="firstName"
          required
          onChange={setRegisteringData}
        />

        {/* Last Name */}
        <label htmlFor="lastName">Last Name: </label>
        <input
          type={"text"}
          className="outline"
          id="lastName"
          name="lastName"
          onChange={setRegisteringData}
        />

        {/* Username */}
        <label htmlFor="username">Username: </label>
        <input
          type={"text"}
          className="outline"
          id="username"
          name="username"
          required
          onChange={setRegisteringData}
        />

        {/* Email */}
        <label htmlFor="email">Email: </label>
        <input
          type={"email"}
          className="outline"
          id="email"
          name="email"
          autoComplete="email"
          required
          onChange={setRegisteringData}
        />

        {/* Password */}
        <label htmlFor="password">Password:</label>
        <input
          type={"password"}
          className="outline"
          id="password"
          name="password"
          autoComplete="new-password"
          required
          onChange={setRegisteringData}
        />

        {/* Account type */}
        <label htmlFor="accountType">Account Type </label>
        <select
          id="accountType"
          className="outline"
          name="accountType"
          required
          onChange={setRegisteringData}
        >
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
        </select>

        {/* DOB */}
        <label htmlFor="dateOfBirth">Date Of Birth: </label>
        <input
          type={"date"}
          className="outline"
          id="dateOfBirth"
          name="dateOfBirth"
          required
          onChange={setRegisteringData}
        />

        {/* Profile pic */}
        <label htmlFor="profilePic">Choose Your Profile: </label>
        <input
          type={"file"}
          className="outline"
          id="profilePic"
          name="profilePic"
          onChange={fileData}
        />

        {/* Submit */}
        <button type="submit" className="outline">
          Submit
        </button>
      </form>
      {notification()}
    </>
  );
}

export default RegisterOtp;
