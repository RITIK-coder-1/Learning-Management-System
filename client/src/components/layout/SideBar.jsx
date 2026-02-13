/* ----------------------------------------------------------------------------------------------
SideBar.jsx
The static side bar for navigation 
------------------------------------------------------------------------------------------------- */

import { NavLink } from "react-router-dom";

function SideBar() {
  const navigationList = [
    { path: "/app/dashboard", label: "Dashboard", id: crypto.randomUUID() },
    {
      path: "/app/enrolled-courses",
      label: "Enrolled Courses",
      id: crypto.randomUUID(),
    },
    { path: "/app/courses", label: "Explore", id: crypto.randomUUID() },
  ];

  return (
    <aside className="flex flex-col justify-around border">
      <nav>
        <ul>
          {navigationList.map((ele) => (
            <NavLink to={ele.path}>
              <li key={ele.id}>{ele.label}</li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
