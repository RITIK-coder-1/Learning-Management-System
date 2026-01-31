/* ---------------------------------------------------------------------------------------
RegisterOtp.jsx
The page to take the user data and generate an OTP
------------------------------------------------------------------------------------------ */
import React, { useState } from "react";
import {
  useRegisterMutation,
  useRegisterOtpMutation,
} from "../../../api/index.api.js";

function Register() {
  /* ---------------------------------------------------------------------------------------
  The states of the page 
  ------------------------------------------------------------------------------------------ */

  // The user object
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    dateOfBirth: "",
    accountType: "Student",
  });
  const [profilePic, setProfilePic] = useState("");
  // condition to show the OTP box
  const [isOtp, setIsOtp] = useState(false);
  // the otp entered by the user
  const [userOTP, setUserOtp] = useState("");

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Query hooks for registeration 
  ------------------------------------------------------------------------------------------ */

  const [createRegisterOtp, {}] = useRegisterOtpMutation();
  const [registerUser, {}] = useRegisterMutation();

  /* ---------------------------------------------------------------------------------------
  The methods to manipulate the states 
  ------------------------------------------------------------------------------------------ */

  // setting the user text data
  const setRegisteringData = (e) => {
    // update the value of every single field as per the input value
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // setting the user profile image
  const fileData = (e) => {
    const image = e.target.files[0];
    setProfilePic(image); // set the value of the profile pic as the file object
    setUserData({ ...userData, profilePic: image }); // explictly setting the value as image because the state changes are async and not immediate
  };

  // setting the otp code
  const otpCodeFunction = (e) => setUserOtp(e.target.value);

  // re-registering option
  const reRegister = () => {
    setIsOtp(false);
    setUserOtp(""); // remove the old otp
    setUserData({ ...userData, profilePic }); // reset the value of the profile pic (from the server local file path to the user file object)
  };

  /* ---------------------------------------------------------------------------------------
  sending data to the server
  ------------------------------------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if otp is not generated, send the form data including the profile pic. If otp is generated, send the registeration data with the otp

    if (!isOtp) {
      const formData = new FormData();

      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      try {
        const { data } = await createRegisterOtp(formData).unwrap();
        setIsOtp(true);
        setUserData({ ...userData, profilePic: data.profilePic }); // resetting the value of the profile pic to the server local file path so that it gets uploaded to cloudinary
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const {} = await registerUser({
          ...userData,
          userOTP,
        }).unwrap();
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
      {/* First Name */}
      <label htmlFor="firstName">First Name: </label>
      <input
        type={"text"}
        className="outline"
        id="firstName"
        name="firstName"
        required
        onChange={setRegisteringData}
        disabled={isOtp}
      />

      {/* Last Name */}
      <label htmlFor="lastName">Last Name: </label>
      <input
        type={"text"}
        className="outline"
        id="lastName"
        name="lastName"
        onChange={setRegisteringData}
        disabled={isOtp}
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
        disabled={isOtp}
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
        disabled={isOtp}
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
        disabled={isOtp}
      />

      {/* Account type */}
      <label htmlFor="accountType">Account Type </label>
      <select
        id="accountType"
        className="outline"
        name="accountType"
        required
        onChange={setRegisteringData}
        disabled={isOtp}
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
        disabled={isOtp}
      />

      {/* Profile pic */}
      <label htmlFor="profilePic">Choose Your Profile: </label>
      <input
        type={"file"}
        className="outline"
        id="profilePic"
        name="profilePic"
        onChange={fileData}
        disabled={isOtp}
      />

      {/* OTP */}
      <div className={isOtp ? "visible" : "hidden"}>
        <label htmlFor="userOTP">Enter the OTP: </label>
        <input
          type={"text"}
          className="outline"
          id="userOTP"
          name="userOTP"
          required={isOtp}
          onChange={otpCodeFunction}
          value={userOTP}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="outline">
        Submit
      </button>

      {/* Re-submit */}
      <button
        className={`outline ${isOtp ? "visible" : "hidden"}`}
        onClick={reRegister}
        type="button"
      >
        Re-register
      </button>
    </form>
  );
}

export default Register;
