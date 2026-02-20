/* ----------------------------------------------------------------------------------------------
Profile.jsx
The user profile page 
------------------------------------------------------------------------------------------------- */

import { Navlink } from "../../components/index.components";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const dob = user?.dateOfBirth;
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <>
      <img
        src={user?.profilePic || "https://github.com/shadcn.png"}
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
      <Navlink to="/app/profile/update-profile">
        <button>Update Profile</button>
      </Navlink>
      <Navlink to="/app/profile/update-password">
        <button>Update Password</button>
      </Navlink>
      <Navlink to="/app/profile/update-email">
        <button>Update Email</button>
      </Navlink>
    </>
  );
}

export default Profile;
