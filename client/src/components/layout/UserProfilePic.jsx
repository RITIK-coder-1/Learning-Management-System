/* ----------------------------------------------------------------------------------------------
UserProfilePic.jsx
The profile of the user at the top of the header
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

function UserProfilePic() {
  const user = useSelector((state) => state.auth.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-custom" className="rounded-full">
          <Image
            src={
              user?.profile !== ""
                ? user?.profilePic
                : "https://github.com/shadcn.png"
            }
            alt={"user"}
            title="Click to visit your profile"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-black mr-5 border-white/10 p-0 shadow-xl shadow-black">
        <DropdownMenuGroup>
          <Navlink to="/app/profile">
            <DropdownMenuItem
              className="hover:bg-yellow-900"
              title="Visit Profile"
            >
              Profile
            </DropdownMenuItem>
          </Navlink>
          <DropdownMenuSeparator className="border-b border-white/10 m-0" />
          <DropdownMenuItem
            variant="destructive"
            className="text-red-700 hover:bg-red-500 hover:text-black"
            title="log out"
          >
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfilePic;
