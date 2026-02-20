/* ----------------------------------------------------------------------------------------------
UpdatePassword.jsx
The page to update the user password 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import { useUpdateUserPasswordMutation } from "../../api/index.api";
import { Form, CommonButton, FieldInput } from "@/components/index.components";

function UpdatePassword() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [update] = useUpdateUserPasswordMutation();

  /* ---------------------------------------------------------------------------------------
  The passwords  
  ------------------------------------------------------------------------------------------ */
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  /* ---------------------------------------------------------------------------------------
  The method to set the new and old passwords 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the password 
  ------------------------------------------------------------------------------------------ */
  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      await update(passwords).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form onSubmit={updatePassword} className="flex flex-col gap-2">
      <FieldInput
        name="oldPassword"
        label="Old Password "
        inputType="password"
        onChange={setValue}
      />

      <FieldInput
        name="newPassword"
        label="New Password "
        inputType="password"
        onChange={setValue}
      />

      <CommonButton label="Update Password" type="submit" title="Update Password"/>
    </Form>
  );
}

export default UpdatePassword;
