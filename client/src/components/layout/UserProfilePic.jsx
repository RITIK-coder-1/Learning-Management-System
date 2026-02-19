/* ----------------------------------------------------------------------------------------------
UserProfilePic.jsx
The profile of the user at the top of the header
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { Image, Navlink } from "../index.components";

function UserProfilePic() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Navlink to="/app/profile">
        <Image
          src={
            user?.profile !== ""
              ? user?.profilePic
              : "https://github.com/shadcn.png"
          }
          alt={"user"}
          title="Click to visit your profile"
        />
      </Navlink>
    </div>
  );
}

export default UserProfilePic;
