/* ----------------------------------------------------------------------------------------------
PublicCourse.jsx
The page for displaying a course publicly 
------------------------------------------------------------------------------------------------- */

import { Link, useParams } from "react-router-dom";
import { useGetCourseQuery } from "@/api/index.api";
import {
  Tag,
  EnrollCourse,
  StudentAccordion,
  SpinnerCustom,
} from "@/components/index.components";
import { useLastCourseVisitedMutation } from "@/api/users/userApi";
import { useEffect } from "react";

function PublicCourse() {
  // the data
  const { courseId } = useParams();
  const { data, isLoading: isCourseLoading } = useGetCourseQuery({ courseId });
  const course = data?.data; // course
  const sections = course?.sections; // sections

  // the instructor name
  const instructorFirstName = course?.owner?.firstName;
  const instructorLastName = course?.owner?.lastName;

  // add this as the last course visited
  const [lastCourseVisited] = useLastCourseVisitedMutation();
  useEffect(() => {
    const courseFunc = async () => {
      try {
        await lastCourseVisited({ courseId }).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    courseFunc();
  }, []);

  return (
    <>
      {isCourseLoading ? (
        <div className="w-full flex justify-center items-center p-5">
          <SpinnerCustom className="size-6" />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-start items-center gap-3 p-5 md:flex-row sm:items-start">
          <div className="w-full rounded-sm overflow-hidden shadow-md shadow-black md:w-136 sm:ml-5 md:ml-0">
            {/* Thumbnail */}
            <img
              src={course?.thumbnail || null}
              className="h-64 w-full object-cover"
            />

            <div className="w-full h-auto p-5 flex flex-col gap-3">
              {/* Price */}
              <span
                className={`text-3xl font-black ${
                  course?.price === 0 ? "text-green-500" : "text-white"
                }`}
              >
                {course?.price === 0 ? "Free" : `₹ ${course?.price}`}
              </span>

              {/* Enroll now */}
              <EnrollCourse courseId={courseId} />

              {/* Course specifics */}
              <span className="text-xl">What is in the course?</span>
              <ul className="list-disc flex flex-col text-sm pl-6 text-white/70">
                <li>Lifetime Access With Free Updates</li>
                <li>Step by Step lessons</li>
                <li>Industry Grades Concepts Explained Hands-on</li>
              </ul>
            </div>
          </div>

          <div className="w-full h-auto p-5 sm:pt-0 flex flex-col gap-2">
            {/* The tags */}
            <div className="flex justify-start items-center gap-2 mt-2">
              {course?.tags.map((tag) => (
                <Tag label={tag} key={crypto.randomUUID()} />
              ))}
            </div>

            {/* Title */}
            <h1 className="text-yellow-500 font-black text-3xl">
              {course?.title}
            </h1>

            {/* Description */}
            <p className="text-white/70 text-xs">{course?.description}</p>

            {/* Instructor Info */}
            <p className="text-sm text-gray-400 flex items-center gap-1.5">
              Created by
              <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                {instructorFirstName} {instructorLastName}
              </span>
            </p>

            {/* The lessons */}
            <div className="w-full border mt-5 border-white/10 p-5 flex flex-col justify-center items-center gap-3 ">
              <span className="text-foreground text-2xl">Course Structure</span>

              {/* The accordion */}
              <StudentAccordion sections={sections} courseId={courseId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicCourse;
