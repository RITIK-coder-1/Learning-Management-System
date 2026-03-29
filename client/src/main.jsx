/* ----------------------------------------------------------------------------------------------
main.jsx
This is the main component that wraps the app inside the html 
------------------------------------------------------------------------------------------------- */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import PublicLayout from "./PublicLayout.jsx";
import PrivateLayout from "./PrivateLayout.jsx";
import {
  Home,
  Register,
  Login,
  Profile,
  UpdateProfile,
  UpdatePassword,
  UpdateEmail,
  CreateCourse,
  UpdateCourse,
  Dashboard,
  EnrolledCourses,
  CreatedCourses,
  InstructorCourse,
  PublicCourse,
  VideoPlayer,
  NotFound,
} from "./pages/index.pages.js";
import ExploreCourses from "./pages/common/ExploreCourses.jsx";
import { Toaster } from "@/components/ui/sonner"

const myRouter = createBrowserRouter([
  /* ----------------------------------------------------------------------------------------------
  PUBLIC PAGES
  ------------------------------------------------------------------------------------------------- */
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Register />,
        path: "register",
      },
      {
        element: <Login />,
        path: "login",
      },
    ],
  },

  /* ----------------------------------------------------------------------------------------------
  PRIVATE PAGES
  ------------------------------------------------------------------------------------------------- */

  // accessible by every authenticated user
  {
    path: "/app",
    element: (
      <PrivateLayout allowedRoles={["Student", "Instructor", "Admin"]} />
    ),
    children: [
      {
        element: <Dashboard />,
        path: "dashboard",
      },

      // course routes (accessible publically)
      {
        path: "courses",
        children: [
          {
            element: <ExploreCourses />,
            index: true,
          },
          {
            path: ":courseId",
            children: [
              {
                element: <PublicCourse />,
                index: true,
              },

              // The course video
              {
                element: <VideoPlayer />,
                path: "watch/:videoId/:slug",
              },
            ],
          },
        ],
      },

      // account specific routes
      {
        path: "profile",
        children: [
          {
            element: <Profile />,
            index: true,
          },
          {
            element: <UpdatePassword />,
            path: "update-password",
          },
          {
            element: <UpdateEmail />,
            path: "update-email",
          },
        ],
      },
    ],
  },

  // routes only for the non-admin users
  {
    path: "/app",
    element: <PrivateLayout allowedRoles={["Student", "Instructor"]} />,
    children: [
      // course specific routes
      {
        element: <EnrolledCourses />,
        path: "enrolled-courses",
      },

      // account specific routes
      {
        path: "profile",
        children: [
          {
            element: <UpdateProfile />,
            path: "update-profile",
          },
        ],
      },
    ],
  },

  // only for the instructor
  {
    path: "/app",
    element: <PrivateLayout allowedRoles={["Instructor"]} />,
    children: [
      {
        path: "created-courses",
        children: [
          {
            element: <CreatedCourses />,
            index: true,
          },
          {
            element: <CreateCourse />,
            path: "create",
          },
          {
            path: ":courseId",
            children: [
              {
                element: <InstructorCourse />,
                index: true,
              },
              {
                element: <UpdateCourse />,
                path: "update",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={myRouter} />
      <Toaster />
    </Provider>
  </StrictMode>
);
