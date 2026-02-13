/* ----------------------------------------------------------------------------------------------
DeleteAccount.jsx
The page to delete the user account
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import { useDeleteUserAccountMutation } from "../../api/index.api";

function DeleteAccount() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */

  const [deleteAccount] = useDeleteUserAccountMutation();

  /* ---------------------------------------------------------------------------------------
  The password
  ------------------------------------------------------------------------------------------ */
  const [password, setPassword] = useState("");

  /* ---------------------------------------------------------------------------------------
  The method to set the password
  ------------------------------------------------------------------------------------------ */
  const setValue = (e) => {
    setPassword(e.target.value);
  };

  /* ---------------------------------------------------------------------------------------
  The API call  
  ------------------------------------------------------------------------------------------ */
  const deleteAccountFunction = async (e) => {
    e.preventDefault();

    try {
      await deleteAccount({ password }).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={deleteAccountFunction} className="flex flex-col gap-2">
      <label htmlFor="password">Enter your password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={setValue}
        className="outline"
        required
      />
      <button type="submit" className="outline">
        Delete
      </button>
    </form>
  );
}

export default DeleteAccount;
