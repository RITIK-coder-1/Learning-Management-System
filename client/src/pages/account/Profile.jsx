/* ----------------------------------------------------------------------------------------------
Profile.jsx
The user profile page 
------------------------------------------------------------------------------------------------- */

import UserProfilePic from "@/components/layout/UserProfilePic";
import { CommonButton, Navlink } from "../../components/index.components";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  // The date of birth of the user
  const dob = user?.dateOfBirth;
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <section className="w-full h-full flex flex-col justify-start gap-5">
      {/* The profile pic and Name */}
      <div className="flex flex-col gap-3 justify-center items-center">
        <UserProfilePic />
        <h1 className="text-3xl p-3 rounded-lg flex justify-center items-center border-b border-t border-white/10 font-black shadow-lg shadow-black bg-backgroundContrast lg:text-5xl">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>

      <div className="w-full border border-white/10 p-2 flex flex-col gap-2 text-lg lg:text-xl">
        {/* The email */}
        <div className="flex flex-col border border-white/5 rounded-lg p-2">
          <span className="text-yellow-50">{user?.email}</span>
          <span className="text-xs lg:text-sm text-foreground">Email</span>
        </div>

        {/* The username */}
        <div className="flex flex-col border border-white/5 rounded-lg p-2">
          <span className=" text-yellow-50">{user?.username}</span>
          <span className="text-xs lg:text-sm  text-foreground">Username</span>
        </div>

        {/* The DOB */}
        <div className="flex flex-col border border-white/5 rounded-lg p-2">
          <span className=" text-yellow-50">{`${day}/${month}/${year}`}</span>
          <span className="text-xs lg:text-sm  text-foreground">D.O.B</span>
        </div>

        {/* The Account Type */}
        <div className="flex flex-col border border-white/5 rounded-lg p-2">
          <span className=" text-yellow-50">{user?.accountType}</span>
          <span className="text-xs lg:text-sm  text-foreground">Type</span>
        </div>
      </div>

      {/* The navigation links to the update pages */}
      <div className="w-full border border-white/10 p-2 py-4 flex flex-col justify-center items-center gap-2">
        <Navlink to="/app/profile/update-profile">
          <CommonButton label="Update Profile" />
        </Navlink>
        <Navlink to="/app/profile/update-password">
          <CommonButton
            label="Update Password"
            className="bg-blue-900 hover:bg-blue-950"
          />
        </Navlink>
        <Navlink to="/app/profile/update-email">
          <CommonButton
            label="Update Email"
            className="bg-blue-950 hover:bg-blue-900"
          />
        </Navlink>
      </div>
    </section>
  );
}

export default Profile;
