/* ----------------------------------------------------------------------------------------------
UserProfilePic.jsx
The profile of the user at the top of the header
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";

function UserProfilePic() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="h-20 w-20">
      <img
        src={user?.profilePic}
        alt="user profile pic"
        className="h-full w-full"
      />
    </div>
  );
}

export default UserProfilePic;
