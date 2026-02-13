/* ----------------------------------------------------------------------------------------------
SideBar.jsx
The static side bar for navigation 
------------------------------------------------------------------------------------------------- */

import { NavLink } from "react-router-dom";

function SideBar() {
  const navigationList = [{ path: "" }];
  return (
    <aside>
      <nav>
        <ul>
          {navigationList.map((ele) => (
            <NavLink>
              <li>{ele}</li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
