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
        <Navlink to={ele.path} key={ele.id}>
          {({ isActive }) => (
            <SidebarGroupLabel
              className={`${ele.className || ""} ${
                isActive ? "text-blue-900" : ""
              }`}
              title={
                ele.label === "Explore"
                  ? "Explore Courses"
                  : `Visit ${ele.label}`
              }
            >
              {ele.label}
            </SidebarGroupLabel>
          )}
        </Navlink>
      );
    });
  };

  return (
    <Sidebar side="left">
      <SidebarContent className="rounded-br-lg rounded-tr-lg border border-white/10">
        {user?.accountType === "Instructor" &&
          NavigationItem(instructorNavigationList)}
        {user?.accountType === "Student" &&
          NavigationItem(userNavigationFilter)}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
