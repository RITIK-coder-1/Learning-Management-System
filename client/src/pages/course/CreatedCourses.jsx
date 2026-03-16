/* ----------------------------------------------------------------------------------------------
CreatedCourses.jsx
The page for displaying all the created courses of an instructor
------------------------------------------------------------------------------------------------- */

import { useGetInstructorDataQuery } from "@/api/index.api";
import {
  Navlink,
  CommonButton,
  DisplayCourses,
} from "../../components/index.components";

function CreatedCourses() {
  const { data, isLoading } = useGetInstructorDataQuery();
  const courses = data?.createdCourses;

  return (
    <>
      {/* The courses  */}
      <DisplayCourses
        heading="Created Courses"
        label="You don't have any created courses yet."
        path={`/app/created-courses/:courseId`}
        displayInstructorName={false}
        courseData={courses}
        isLoading={isLoading}
      />

      {/* The create button  */}
      <Navlink
        to="/app/created-courses/create"
        className="fixed bottom-6 right-6 z-50"
      >
        <CommonButton
          label="+"
          className="rounded-full w-14 h-14 text-lg md:w-18 md:h-18 md:text-3xl"
          title="Create Course"
        />
      </Navlink>
    </>
  );
}

export default CreatedCourses;
