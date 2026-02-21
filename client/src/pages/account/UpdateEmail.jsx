/* ----------------------------------------------------------------------------------------------
UpdateEmail.jsx
The page to update the user email 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import {
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
} from "../../api/index.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import {
  Form,
  FieldInput,
  CommonButton,
  OtpInput,
} from "@/components/index.components";

function UpdateEmail() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [getUpdateOtp] = useUpdateUserEmailOtpMutation();
  const [updateEmail] = useUpdateUserEmailMutation();
  const dispatch = useDispatch();

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [userData, setUserData] = useState({
    newEmail: "",
    password: "",
  });
  const [isOtp, setIsOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  /* ---------------------------------------------------------------------------------------
  The method to set the states 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const setOtpFunction = (otp) => {
    setUserOtp(otp);
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the email 
  ------------------------------------------------------------------------------------------ */
  const update = async (e) => {
    e.preventDefault();
    if (!isOtp) {
      try {
        const res = await getUpdateOtp(userData).unwrap();
        setIsOtp(true);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const newEmail = userData.newEmail;
        const { data } = await updateEmail({ userOtp, newEmail }).unwrap();
        dispatch(setUser(data));
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <Form onSubmit={update}>
      {/* The new email */}
      <FieldInput
        label="New Email"
        name="newEmail"
        inputType="email"
        placeholder="New Email"
        onChange={setValue}
        disabled={isOtp}
      />

      {/* Password */}
      <FieldInput
        label="Password"
        name="password"
        inputType="password"
        placeholder="Password"
        onChange={setValue}
        disabled={isOtp}
      />

      {/* OTP */}
      {isOtp && (
        <OtpInput
          name="userOtp"
          required={isOtp}
          setterFunction={setOtpFunction}
        />
      )}
      <CommonButton type="submit" label="Update Email">
        Submit
      </CommonButton>
    </Form>
  );
}

export default UpdateEmail;
