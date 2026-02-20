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
    <section className="w-full h-full flex flex-col justify-start">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          src={user?.profilePic || "https://github.com/shadcn.png"}
          className="w-30 h-30 rounded-full shadow-lg shadow-black"
        />
        <h1 className="text-3xl p-3 rounded-lg flex justify-center items-center border-b border-t border-white/10 font-black shadow-lg shadow-black bg-backgroundContrast">{user?.firstName} {user?.lastName}</h1>
      </div>

      {/* <Navlink to="/app/profile/update-profile">
        <button>Update Profile</button>
      </Navlink>
      <Navlink to="/app/profile/update-password">
        <button>Update Password</button>
      </Navlink>
      <Navlink to="/app/profile/update-email">
        <button>Update Email</button>
      </Navlink> */}
    </section>
  );
}

export default Profile;
