/* ----------------------------------------------------------------------------------------------
Navlink.jsx
The common router navigation element 
------------------------------------------------------------------------------------------------- */

import { NavLink } from "react-router-dom";

function Navlink({ to, children, className, nonActiveColor = "text-white" }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "text-blue-900" : nonActiveColor} ${className || ""}`
      }
    >
      {/* 
          We call children as a function if it's provided as one, 
          passing the isActive state down.
      */}
      {({ isActive }) =>
        typeof children === "function" ? children({ isActive }) : children
      }
    </NavLink>
  );
}

export default Navlink;
