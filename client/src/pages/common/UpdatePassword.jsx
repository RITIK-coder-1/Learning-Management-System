/* ----------------------------------------------------------------------------------------------
UpdateProfile.jsx
The page to update the user profile 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import { useUpdateUserPasswordMutation } from "../../api/index.api";

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
  The API call to update the details 
  ------------------------------------------------------------------------------------------ */
  const updateDetails = async (e) => {
    e.preventDefault();

    try {
      await update(passwords).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={updateDetails} className="flex flex-col gap-2">
      <label htmlFor="oldPassword">Enter your old password:</label>
      <input
        type="password"
        id="oldPassword"
        name="oldPassword"
        onChange={setValue}
        className="outline"
        required
      />
      <label htmlFor="newPassword">Enter your new password:</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        onChange={setValue}
        className="outline"
        required
      />
      <button type="submit" className="outline">
        Update
      </button>
    </form>
  );
}

export default UpdatePassword;
