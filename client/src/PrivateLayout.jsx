/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import { SideBar, TopBar, MainSection } from "./components/index.components";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <>
      <TopBar />
      <SideBar />
      <MainSection>
        <Outlet />
      </MainSection>
    </>
  );
}

export default PrivateLayout;
