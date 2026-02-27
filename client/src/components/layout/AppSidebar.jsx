/* ----------------------------------------------------------------------------------------------
AppSidebar.jsx
The navigation sidebar
------------------------------------------------------------------------------------------------- */

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { Navlink } from "../index.components";

export function AppSidebar() {
  const user = useSelector((state) => state.auth.user); // the quick user access

  // the navigation list for instructors
  const instructorNavigationList = [
    { path: "/app/dashboard", label: "Dashboard", id: crypto.randomUUID() },
    {
      path: "/app/enrolled-courses",
      label: "Enrolled Courses",
      id: crypto.randomUUID(),
    },
    { path: "/app/courses", label: "Explore", id: crypto.randomUUID() },
    {
      path: "/app/created-courses",
      label: "Created Courses",
      id: crypto.randomUUID(),
      className: "border-0",
    },
  ];

  // the navigation list for students
  const userNavigationFilter = instructorNavigationList.filter(
    (ele) => ele.label !== "Created Courses"
  );

  // the navigation items
  const NavigationItem = (list) => {
    return list.map((ele) => {
      return (
        <SidebarGroupLabel
          className={ele.className || ""}
          title={
            ele.label === "Explore" ? "Explore Courses" : `Visit ${ele.label}`
          }
          key={ele.id}
        >
          <Navlink
            to={ele.path}
            nonActiveColor="text-yellow-200"
            className="w-full h-full flex justify-start items-center"
          >
            {ele.label}
          </Navlink>
        </SidebarGroupLabel>
      );
    });
  };

  return (
    <Sidebar side="left" className="md:shadow-2xl shadow-black">
      <SidebarContent className="rounded-br-lg rounded-tr-lg border border-l-0 border-white/50">
        {user?.accountType === "Instructor" &&
          NavigationItem(instructorNavigationList)}
        {user?.accountType === "Student" &&
          NavigationItem(userNavigationFilter)}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
