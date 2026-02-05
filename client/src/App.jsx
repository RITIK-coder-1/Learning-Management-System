/* ----------------------------------------------------------------------------------------------
App.jsx
This is the main entry point of the app
------------------------------------------------------------------------------------------------- */

import "./styles/App.css";
import {
  Register,
  Login,
  Profile,
  UpdateProfile,
  UpdatePassword,
  UpdateEmail,
  DeleteAccount,
} from "./pages/index.pages.js";
import { Logout } from "./components/index.components.js";

function App() {
  return (
    <>
      <DeleteAccount />
      <Profile />
      <Login />
    </>
  );
}

export default App;
