/* ---------------------------------------------------------------------------------------
Register.jsx
The page to register a user
------------------------------------------------------------------------------------------ */
import React, { useState } from "react";
import {
  useRegisterMutation,
  useRegisterOtpMutation,
} from "../../../api/index.api.js";
import getFormData from "../../../utils/getFormData.js";
import {
  FieldInput,
  Form,
  MainSection,
} from "../../../components/index.components.js";

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
      const formData = getFormData(userData);

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
    <MainSection>
      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <FieldInput
          label="First Name"
          name="firstName"
          onChange={setRegisteringData}
          disabled={isOtp}
        />

        {/* Last Name */}
        <FieldInput
          label="Last Name"
          name="lastName"
          onChange={setRegisteringData}
          disabled={isOtp}
        />

        {/* Username */}
        <FieldInput
          label="Username"
          name="username"
          onChange={setRegisteringData}
          disabled={isOtp}
          description="Enter a unique username (Must be more than 6 characters)"
        />

        {/* Email */}
        <FieldInput
          label="Email"
          name="email"
          inputType="email"
          onChange={setRegisteringData}
          disabled={isOtp}
        />

        {/* Password */}
        <FieldInput
          label="Password"
          name="password"
          inputType="password"
          onChange={setRegisteringData}
          disabled={isOtp}
          description="At least 10 characters"
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
      </Form>
    </MainSection>
  );
}

export default Register;
