/* ----------------------------------------------------------------------------------------------
index.pages.js
Centralized exporting file for all the pages
------------------------------------------------------------------------------------------------- */

import Register from "./auth/register/Register.jsx";
import Login from "./auth/login/Login.jsx";
import Profile from "./common/Profile.jsx";
import UpdateProfile from "./common/UpdateProfile.jsx";
import UpdatePassword from "./common/UpdatePassword.jsx";
import UpdateEmail from "./common/UpdateEmail.jsx";
import DeleteAccount from "./common/DeleteAccount.jsx";
import CreateCourse from "./course/CreateCourse.jsx";
import UpdateCourse from "./course/UpdateCourse.jsx";
import Home from "./common/Home.jsx";

export {
  Register,
  Login,
  Profile,
  UpdateProfile,
  UpdatePassword,
  UpdateEmail,
  DeleteAccount,
  CreateCourse,
  UpdateCourse,
  Home,
};
