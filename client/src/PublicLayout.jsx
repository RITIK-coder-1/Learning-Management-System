/* ----------------------------------------------------------------------------------------------
PublicLayout.jsx
It contains the routing for every single public page 
------------------------------------------------------------------------------------------------- */

import { Outlet } from "react-router-dom";
import { MainSection } from "./components/index.components";

function PublicLayout() {
  return (
    <MainSection>
      <Outlet />
    </MainSection>
  );
}

export default PublicLayout;
