/* ----------------------------------------------------------------------------------------------
Profile.jsx
The user profile page 
------------------------------------------------------------------------------------------------- */

import React from "react";
import { useGetUserQuery } from "../../api/index.api";

function Profile() {
  const { data: user } = useGetUserQuery();

  console.log(user);

  /* ---------------------------------------------------------------------------------------
  Log the user out 
  Disable the user in the global state 
  ------------------------------------------------------------------------------------------ */
  return <div>Profile</div>;
}

export default Profile;
