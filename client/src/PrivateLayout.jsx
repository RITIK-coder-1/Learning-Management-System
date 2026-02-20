/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import {
  SideBar,
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
      <SideBar />

      {/* The side bar for navigation */}
      <SidebarProvider>
        <AppSidebar />
        {/* The main section of the page */}
        <MainSection>
          <SidebarTrigger />
          {/* The children */}
          <Outlet />
        </MainSection>
      </SidebarProvider>
    </>
  );
}

export default PrivateLayout;
