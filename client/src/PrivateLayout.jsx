/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import { TopBar } from "./components/index.components";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}

export default PrivateLayout;
