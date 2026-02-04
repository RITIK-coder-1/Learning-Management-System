/* ----------------------------------------------------------------------------------------------
Profile.jsx
The user profile page 
------------------------------------------------------------------------------------------------- */

import React from "react";
import { useGetUserQuery } from "../../api/index.api";

function Profile() {
  const { data } = useGetUserQuery();
  const user = data?.data;
  const dob = user?.dateOfBirth;
  const date = new Date();
  const year = date.getFullYear(dob);
  const month = date.getMonth(dob);
  const day = date.getDay(dob);

  return (
    <>
      <img src={user?.profilePic} className="w-12 h-12" />
      <h1>
        {user?.firstName} {user?.lastName}
      </h1>
      <span>{user?.username}</span>
      <br />
      <span>{user?.email}</span>
      <br />
      <span>
        Date of birth: {day}/{month}/{year}
      </span>
    </>
  );
}

export default Profile;
