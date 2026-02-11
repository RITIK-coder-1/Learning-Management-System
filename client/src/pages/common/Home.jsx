/* ----------------------------------------------------------------------------------------------
Home.jsx
The landing page of the application 
------------------------------------------------------------------------------------------------- */

import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to={"/register"}>
        <button>Register</button>
      </Link>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Home;
