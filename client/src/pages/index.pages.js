/* ----------------------------------------------------------------------------------------------
index.pages.js
Centralized exporting file for all the pages
------------------------------------------------------------------------------------------------- */

import Register from "./auth/register/Register.jsx";
import Login from "./auth/login/Login.jsx";
import Profile from "./account/Profile.jsx";
import UpdateProfile from "./account/UpdateProfile.jsx";
import UpdatePassword from "./account/UpdatePassword.jsx";
import UpdateEmail from "./account/UpdateEmail.jsx";
import DeleteAccount from "./account/DeleteAccount.jsx";
import CreateCourse from "./course/CreateCourse.jsx";
import UpdateCourse from "./course/UpdateCourse.jsx";
import Home from "./common/Home.jsx";
import Dashboard from "./common/Dashboard.jsx";
import EnrolledCourses from "./common/EnrolledCourses.jsx";
import CreatedCourses from "./course/CreatedCourses.jsx";
import InstructorCourse from "./course/InstructorCourse.jsx";
import PublicCourse from "./course/PublicCourse.jsx";
import InstructorPage from "./course/InstructorPage.jsx";

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
  Dashboard,
  EnrolledCourses,
  CreatedCourses,
  InstructorCourse,
  PublicCourse, 
  InstructorPage
};
