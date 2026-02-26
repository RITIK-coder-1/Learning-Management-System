/* ----------------------------------------------------------------------------------------------
TopBar.jsx
The static top bar for displaying the app logo and user profile 
------------------------------------------------------------------------------------------------- */

import { Image, UserProfilePic } from "../index.components";

function TopBar() {
  return (
    <header className="sticky top-0 left-0 w-full flex justify-between items-center p-2 border-b border-white/10 h-22 shadow-lg shadow-black md:h-25 z-50 bg-background mb-5">
      {/* The Logo */}
      <Image
        src="../../../LMS.png"
        alt="LearnIt"
        title="LearnIt"
        className="w-18 h-18 md:w-22 md:h-22"
      />

      {/* The profile pic of the user */}
      <UserProfilePic isTopBar={true} />
    </header>
  );
}

export default TopBar;
