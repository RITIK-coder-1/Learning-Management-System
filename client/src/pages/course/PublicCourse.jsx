/* ----------------------------------------------------------------------------------------------
PublicCourse.jsx
The page for displaying a course publicly 
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "@/api/index.api";
import { CommonButton } from "@/components/index.components";

function PublicCourse() {
  const { courseId } = useParams();
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;
  console.log(course);

  return (
    <div className="border w-full h-full flex flex-col justify-start items-center gap-3 p-5 sm:flex-row sm:items-start">
      <div className="w-full rounded-sm overflow-hidden shadow-md shadow-black sm:w-136">
        <img
          src={course?.thumbnail || null}
          className="h-64 w-full object-cover"
        />
        <div className="w-full h-auto p-5 flex flex-col gap-3">
          <span
            className={`text-3xl font-black ${
              course?.price === 0 ? "text-green-500" : "text-white"
            }`}
          >
            {course?.price === 0 ? "Free" : `₹ ${course?.price}`}
          </span>
          <CommonButton label="Enroll Now" className="w-full" title="Enroll"/>
          <span className="text-xl">What is in the course?</span>
          <ul className="list-disc flex flex-col text-sm pl-6 text-white/70">
            <li>Lifetime Access With Free Updates</li>
            <li>Step by Step lessons</li>
            <li>Industry Grades Concepts Explained Hands-on</li>
          </ul>
        </div>
      </div>
      <div className="border w-full h-auto">hey</div>
    </div>
  );
}

export default PublicCourse;
