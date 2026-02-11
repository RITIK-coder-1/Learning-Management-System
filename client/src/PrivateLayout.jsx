/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import React from "react";
import { Outlet, NavLink } from "react-router-dom";

function PrivateLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink
            to={"/app/dashboard"}
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "text-white"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/app/profile"}
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "text-white"
            }
          >
            Profile
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default PrivateLayout;
