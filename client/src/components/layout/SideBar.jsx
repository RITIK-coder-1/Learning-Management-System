/* ----------------------------------------------------------------------------------------------
SideBar.jsx
The static side bar for navigation 
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { Navlink } from "../index.components";

function SideBar() {
  const user = useSelector((state) => state.auth.user);

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
    },
  ];

  const userNavigationFilter = instructorNavigationList.filter(
    (ele) => ele.label !== "Created Courses"
  );

  return (
    <aside className="flex flex-col justify-around border">
      <nav>
        <ul>
          {user.accountType === "Instructor" &&
            instructorNavigationList.map((ele) => (
              <Navlink to={ele.path} key={ele.id}>
                <li>{ele.label}</li>
              </Navlink>
            ))}
          {user.accountType === "Student" &&
            userNavigationFilter.map((ele) => (
              <Navlink to={ele.path} key={ele.id}>
                <li>{ele.label}</li>
              </Navlink>
            ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
