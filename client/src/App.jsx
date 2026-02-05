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
} from "./pages/index.pages.js";
import { Logout } from "./components/index.components.js";

function App() {
  return (
    <>
      <UpdatePassword />
      <Profile />
      <Login />
    </>
  );
}

export default App;
