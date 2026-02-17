/* ----------------------------------------------------------------------------------------------
Logout.jsx
------------------------------------------------------------------------------------------------- */

import React from "react";
import { useLogoutMutation } from "../../api/index.api";
import { useDispatch } from "react-redux";
import { disableUser } from "../../features/authSlice";

function Logout() {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  /* ---------------------------------------------------------------------------------------
  Log the user out 
  Disable the user in the global state 
  ------------------------------------------------------------------------------------------ */

  const logoutUserFunction = async () => {
    try {
      await logout().unwrap();
      dispatch(disableUser());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="border cursor-pointer" onClick={logoutUserFunction}>
      Logout
    </button>
  );
}

export default Logout;
