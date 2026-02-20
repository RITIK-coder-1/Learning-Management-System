/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import {
  TopBar,
  MainSection,
  AppSidebar,
} from "./components/index.components";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function PrivateLayout() {
  return (
    <>
      <TopBar />

      <SidebarProvider>
        {/* The side bar for navigation */}
        <AppSidebar />

        {/* The sidebar trigger */}
        <SidebarTrigger className="fixed" />

        {/* The main section of the page */}
        <MainSection>
          {/* The children */}
          <Outlet />
        </MainSection>
      </SidebarProvider>
    </>
  );
}

export default PrivateLayout;
