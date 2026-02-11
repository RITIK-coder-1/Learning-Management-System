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
} from "./pages/index.pages.js";

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
        element: <Profile />,
        path: "profile",
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
