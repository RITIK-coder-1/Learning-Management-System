/* ----------------------------------------------------------------------------------------------
UserProfilePic.jsx
The profile of the user at the top of the header
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function UserProfilePic() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="h-20 w-20">
      <NavLink to="/app/profile">
        <img
          src={user?.profilePic}
          alt="user profile pic"
          className="h-full w-full"
        />
      </NavLink>
    </div>
  );
}

export default UserProfilePic;
