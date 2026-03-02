/* ----------------------------------------------------------------------------------------------
CreatedCourses.jsx
The page for displaying all the created courses of an instructor
------------------------------------------------------------------------------------------------- */

import { useGetUserQuery } from "@/api/index.api";
import {
  Navlink,
  CommonButton,
  DisplayCourses,
} from "../../components/index.components";

function CreatedCourses() {
  const { data } = useGetUserQuery();
  console.log(data);
  
  return (
    <>
      {/* The courses  */}
      <DisplayCourses
        heading="Created Courses"
        label="You don't have any created courses yet."
        path={`/app/created-courses/:courseId`}
        displayInstructorName={false}
      />

      {/* The create button  */}
      <div className="h-90 z-10 w-full fixed flex justify-end items-end pr-2 lg:h-100 lg:pr-5">
        <Navlink to="/app/created-courses/create">
          <CommonButton
            label="+"
            className="rounded-full w-12 h-12 text-lg md:w-18 md:h-18 md:text-3xl"
            title="Create Course"
          />
        </Navlink>
      </div>
    </>
  );
}

export default CreatedCourses;
