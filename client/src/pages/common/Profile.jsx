/* ----------------------------------------------------------------------------------------------
Profile.jsx
The user profile page 
------------------------------------------------------------------------------------------------- */

import { useGetUserQuery } from "../../api/index.api";
import { Navlink } from "../../components/index.components";

function Profile() {
  const { data } = useGetUserQuery();
  const user = data?.data;
  const dob = user?.dateOfBirth;
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <>
      <img
        src={
          user?.profilePic ||
          "https://api.dicebear.com/5.x/initials/svg?seed=Admin"
        }
        className="w-12 h-12"
      />
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
      <br />
      <Navlink to="/app/update-profile">
        <button>Update Profile</button>
      </Navlink>
      <Navlink to="/app/update-password">
        <button>Update Password</button>
      </Navlink>
      <Navlink to="/app/update-email">
        <button>Update Email</button>
      </Navlink>
    </>
  );
}

export default Profile;
