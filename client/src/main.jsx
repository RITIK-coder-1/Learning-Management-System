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
  DeleteAccount,
  CreateCourse,
  UpdateCourse,
  Dashboard,
  EnrolledCourses,
  CreatedCourses,
  Course,
} from "./pages/index.pages.js";
import ExploreCourses from "./pages/common/ExploreCourses.jsx";

const myRouter = createBrowserRouter([
  // Public Pages
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

  // Private Pages
  {
    path: "/app",
    element: <PrivateLayout />,
    children: [
      {
        element: <Dashboard />,
        path: "dashboard",
      },
      {
        element: <EnrolledCourses />,
        path: "enrolled-courses",
      },
      {
        element: <ExploreCourses />,
        path: "courses",
      },

      // course specific routes
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
            element: <Course />,
            path: ":courseId",
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
            element: <DeleteAccount />,
            path: "delete-profile",
          },
          {
            element: <UpdateProfile />,
            path: "update-profile",
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={myRouter} />
    </Provider>
  </StrictMode>
);
