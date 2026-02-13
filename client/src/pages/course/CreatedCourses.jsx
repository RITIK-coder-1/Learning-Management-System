/* ----------------------------------------------------------------------------------------------
CreatedCourses.jsx
The page for displaying all the created courses of an instructor
------------------------------------------------------------------------------------------------- */

import { Navlink } from "../../components/index.components";

function CreatedCourses() {
  return (
    <Navlink to="/app/created-courses/create">
      <button>Create</button>
    </Navlink>
  );
}

export default CreatedCourses;
