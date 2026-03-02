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
  CommonButton,
  FieldInput,
  Form,
  InputFile,
  SelectInput,
  DatePicker,
  OtpInput,
} from "../../../components/index.components.js";
import { NativeSelectOption } from "@/components/ui/native-select.jsx";

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

  // the method to set the date selected by the user using the shadcn date picker component
  const selectDate = (date) => {
    setUserData({ ...userData, dateOfBirth: date });
  };

  // setting the otp code
  const otpCodeFunction = (value) => setUserOtp(value);

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
    <Form onSubmit={handleSubmit}>
      {/* First Name */}
      <FieldInput
        label="First Name"
        name="firstName"
        onChange={setRegisteringData}
        disabled={isOtp}
        placeholder="Ritik"
        value={userData.firstName}
      />

      {/* Account type */}
      <SelectInput
        disabled={isOtp}
        onChange={setRegisteringData}
        name={"accountType"}
      >
        <NativeSelectOption value="" className="text-foreground">
          Choose Account Type
        </NativeSelectOption>
        <NativeSelectOption value="Student">Student</NativeSelectOption>
        <NativeSelectOption value="Instructor">Instructor</NativeSelectOption>
      </SelectInput>

      {/* Last Name */}
      <FieldInput
        label="Last Name"
        name="lastName"
        onChange={setRegisteringData}
        disabled={isOtp}
        placeholder="Mahapatra"
        required={false}
        value={userData.lastName}
      />

      {/* Username */}
      <FieldInput
        label="Username"
        name="username"
        onChange={setRegisteringData}
        disabled={isOtp}
        description="Enter a unique username (Must be more than 6 characters)"
        placeholder="ritik123"
        value={userData.username}
      />

      {/* Email */}
      <FieldInput
        label="Email"
        name="email"
        inputType="email"
        onChange={setRegisteringData}
        disabled={isOtp}
        placeholder="ritik@gmail.com"
        value={userData.email}
      />

      {/* Password */}
      <FieldInput
        label="Password"
        name="password"
        inputType="password"
        onChange={setRegisteringData}
        disabled={isOtp}
        description="At least 10 characters"
        placeholder="••••••••••••••••"
        value={userData.password}
      />

      {/* DOB */}
      <DatePicker disabled={isOtp} dateSelectionMethod={selectDate} />

      {/* Profile pic */}
      <InputFile
        label="Upload Profile"
        name="profilePic"
        description="Important: Instructors are required to upload a profile picture."
        disabled={isOtp}
        onChange={fileData}
        required={userData.accountType === "Instructor" ? true : false}
        accept="image/*"
      />

      {/* OTP */}
      <div className={isOtp ? "visible" : "hidden"}>
        <OtpInput
          setterFunction={otpCodeFunction}
          name="userOTP"
          required={isOtp}
        />
      </div>

      <div className="flex flex-col gap-2 lg:flex-row">
        {/* Submit */}
        <CommonButton type="submit" label={isOtp ? "Register" : "Submit"} />

        {/* Re-register */}
        <CommonButton
          label="Re-submit"
          onClick={reRegister}
          className={`${
            isOtp ? "visible" : "hidden"
          } bg-blue-950 hover:bg-blue-900`}
        />
      </div>
    </Form>
  );
}

export default Register;
