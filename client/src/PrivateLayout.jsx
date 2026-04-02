/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
It also renders the public course pages to visit without logging in 
------------------------------------------------------------------------------------------------- */

import { TopBar, MainSection, AppSidebar } from "./components/index.components";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useUserStatus from "./hooks/useUserStatus";
import { Navigate } from "react-router-dom";

function PrivateLayout({ allowedRoles }) {
  const { isAuthenticated, accountType } = useUserStatus();
  const location = useLocation();

  // if the user is authentication or any public user is accessing the courses, return the layout or redirect the user to a different page
  if (
    (isAuthenticated &&
      allowedRoles.includes(accountType) &&
      location.pathname !== "/app") ||
    location.pathname.includes("/app/courses")
  ) {
    return (
      <>
        {/* The top bar for the logged in users*/}
        {isAuthenticated && <TopBar />}

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
  } else {
    return isAuthenticated ? (
      <Navigate to="/app/dashboard" replace /> // return to the dashboard if an authenticated user tries to access an unauthorized page
    ) : (
      <Navigate to="/" replace /> // return to the homepage if the user is unauthenticated
    );
  }
}

export default PrivateLayout;
