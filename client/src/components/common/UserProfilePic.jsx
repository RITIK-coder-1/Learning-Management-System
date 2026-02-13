/* ----------------------------------------------------------------------------------------------
UserProfilePic.jsx
The profile of the user at the top of the header
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { Navlink } from "../../components/index.components";

function UserProfilePic() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="h-20 w-20">
      <Navlink to="/app/profile">
        <img
          src={user?.profilePic}
          alt="user profile pic"
          className="h-full w-full"
        />
      </Navlink>
    </div>
  );
}

export default UserProfilePic;
