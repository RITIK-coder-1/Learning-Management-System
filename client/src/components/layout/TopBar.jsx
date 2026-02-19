/* ----------------------------------------------------------------------------------------------
TopBar.jsx
The static top bar for displaying the app logo and user profile 
------------------------------------------------------------------------------------------------- */

import UserProfilePic from "./UserProfilePic";
import { Image } from "../index.components";

function TopBar() {
  return (
    <header className="flex justify-between p-2 border">
      {/* The Logo */}
      <Image src="../../../public/LMS.png" alt="LearnIt" />

      {/* The profile pic of the user */}
      <UserProfilePic />
    </header>
  );
}

export default TopBar;
