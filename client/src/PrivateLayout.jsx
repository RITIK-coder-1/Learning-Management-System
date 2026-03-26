/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
------------------------------------------------------------------------------------------------- */

import { TopBar, MainSection, AppSidebar } from "./components/index.components";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useUserStatus from "./hooks/useUserStatus";

function PrivateLayout() {
  const { isAuthenticated } = useUserStatus();
  return (
    <>
      <TopBar />

      <SidebarProvider>
        {/* The side bar for navigation for logged in users */}
        {isAuthenticated && <AppSidebar />}

        {/* The sidebar trigger */}
        {isAuthenticated && <SidebarTrigger className="fixed z-50" />}

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
