/* ----------------------------------------------------------------------------------------------
UpdateProfile.jsx
The page to update the user profile 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import {
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
} from "../../api/index.api";

function UpdateEmail() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [getUpdateOtp] = useUpdateUserEmailOtpMutation();
  const [updateEmail] = useUpdateUserEmailMutation();

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [userData, setUserData] = useState({
    newEmail: "",
    password: "",
  });

  /* ---------------------------------------------------------------------------------------
  The method to set the states 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the email 
  ------------------------------------------------------------------------------------------ */
  const updateEmail = async (e) => {
    e.preventDefault();

    try {
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

export default UpdateEmail;
