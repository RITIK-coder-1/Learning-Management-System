/* ----------------------------------------------------------------------------------------------
UserProfilePic.jsx
The profile of the user
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { Image, Navlink, Logout } from "../index.components";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserProfilePic({ isTopBar = false }) {
  const user = useSelector((state) => state.auth.user);

  if (isTopBar) {
    // Return the dropdown menu at the topbar
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-custom" className="rounded-full">
            <Image
              src={user?.profilePic}
              alt={"user"}
              title="Click to visit your profile"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 h-22 lg:w-54 lg:h-28 bg-black mr-5 border-white/10 p-0 shadow-xl shadow-black">
          <DropdownMenuGroup className="w-full h-full flex flex-col ">
            <Navlink
              to="/app/profile"
              className="grow flex flex-col justify-center hover:bg-purple-950 transition-all duration-100"
            >
              <DropdownMenuItem title="Visit Profile">Profile</DropdownMenuItem>
            </Navlink>
            <DropdownMenuSeparator className="border-b border-white/10 m-0" />
            <DropdownMenuItem
              variant="destructive"
              className="text-red-700 hover:bg-red-500 hover:text-black grow"
              title="log out"
            >
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    // Return the normal profile if not topbar
    return (
      <Image
        src={user?.profilePic}
        alt={"user"}
        title="Your profile"
        className="w-30 h-30 rounded-full shadow-lg shadow-black md:w-40 md:h-40"
      />
    );
  }
}

export default UserProfilePic;
