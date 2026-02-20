/* ----------------------------------------------------------------------------------------------
Navlink.jsx
The common router navigation element 
------------------------------------------------------------------------------------------------- */

import { NavLink } from "react-router-dom";

function Navlink({ to, children, className }) {
  return (
    <NavLink
      to={to}
      className={`${({ isActive }) =>
        isActive ? "text-blue-900" : "text-white"} ${className}`}
    >
      {children}
    </NavLink>
  );
}

export default Navlink;
