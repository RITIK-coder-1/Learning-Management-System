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
  const [isOtp, setIsOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  /* ---------------------------------------------------------------------------------------
  The method to set the states 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const setOtpFunction = (e) => {
    setUserOtp(e.target.value);
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
        await updateEmail({ userOtp, newEmail }).unwrap();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={update} className="flex flex-col gap-2">
      <label htmlFor="newEmail">Enter the new email: </label>
      <input
        type="email"
        id="newEmail"
        name="newEmail"
        onChange={setValue}
        className="outline"
        required
        disabled={isOtp}
      />
      <label htmlFor="password">Enter your password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={setValue}
        className="outline"
        required
        disabled={isOtp}
      />
      {isOtp && (
        <>
          <label htmlFor="userOtp">Enter the OTP sent to your new email:</label>
          <input
            type="text"
            id="userOtp"
            name="userOtp"
            onChange={setOtpFunction}
            className="outline"
            required
          />
        </>
      )}
      <button type="submit" className="outline">
        Submit
      </button>
    </form>
  );
}

export default UpdateEmail;
