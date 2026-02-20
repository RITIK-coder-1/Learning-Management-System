/* ----------------------------------------------------------------------------------------------
TopBar.jsx
The static top bar for displaying the app logo and user profile 
------------------------------------------------------------------------------------------------- */

import UserProfilePic from "./UserProfilePic";
import { Image } from "../index.components";

function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-2 border-b border-white/10 h-22 shadow-lg shadow-black md:h-25 z-50 bg-inherit">
      {/* The Logo */}
      <Image src="../../../public/LMS.png" alt="LearnIt" title="LearnIt" />

      {/* The profile pic of the user */}
      <UserProfilePic />
    </header>
  );
}

export default TopBar;
