/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import { SideBar, TopBar } from "./components/index.components";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <>
      <TopBar />
      {/* <SideBar /> */}
      <Outlet />
    </>
  );
}

export default PrivateLayout;
