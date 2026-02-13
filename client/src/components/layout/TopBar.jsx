/* ----------------------------------------------------------------------------------------------
TopBar.jsx
The static top bar for displaying the app logo and user profile 
------------------------------------------------------------------------------------------------- */

import UserProfilePic from "../common/UserProfilePic";

function TopBar() {
  return (
    <header className="flex justify-between p-2 border">
      {/* The Logo */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxcFrao9_0vmR9PbiS3qs08GBuWxV6al9ow&s"
        className="h-22 w-22"
      />

      {/* The profile pic of the user */}
      <UserProfilePic />
    </header>
  );
}

export default TopBar;
