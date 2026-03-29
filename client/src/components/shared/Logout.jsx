/* ----------------------------------------------------------------------------------------------
Logout.jsx
------------------------------------------------------------------------------------------------- */

import React from "react";
import { useLogoutMutation } from "../../api/index.api";
import { useDispatch } from "react-redux";
import { disableUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Logout({ className }) {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ---------------------------------------------------------------------------------------
  Log the user out 
  Disable the user in the global state 
  ------------------------------------------------------------------------------------------ */

  const logoutUserFunction = async () => {
    try {
      await logout().unwrap();
      dispatch(disableUser());
      navigate("/");
      toast.success("Successfully logged out", { position: "top-right" });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <button onClick={logoutUserFunction} className={className} title="log out">
      {isLoading ? "Logging Out..." : "Logout"}
    </button>
  );
}

export default Logout;
