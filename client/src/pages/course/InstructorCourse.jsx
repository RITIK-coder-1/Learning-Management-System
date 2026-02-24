/* ----------------------------------------------------------------------------------------------
InstructorCourse.jsx
The page for displaying a course for instructors
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import {
  useDeleteCourseInstructorMutation,
  useGetCourseInstructorQuery,
} from "../../api/index.api";
import { Navlink, CommonButton } from "../../components/index.components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourse } from "../../features/courseSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Course() {
  const { courseId } = useParams();
  const { data } = useGetCourseInstructorQuery({ courseId });
  console.log(data);

  const course = data?.data;
  console.log(course);
  const sections = course?.sections;

  const dispatch = useDispatch();
  const [deleteCourse] = useDeleteCourseInstructorMutation();

  useEffect(() => {
    if (course) {
      dispatch(setCourse(course));
    }
  }, [course]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3 p-5 sm:flex-row sm:items-start">
      <div className="w-full rounded-sm overflow-hidden shadow-md shadow-black sm:w-136">
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
        </div>
      </div>

      <div className="w-full h-auto p-5 sm:pt-0 flex flex-col gap-2">
        {/* Title */}
        <h1 className="text-yellow-500 font-black text-3xl">{course?.title}</h1>

        {/* Description */}
        <p className="text-white/70 text-xs">{course?.description}</p>

        {/* The lessons */}
        <div className="w-full border mt-5 border-white/10 p-5 flex flex-col justify-center items-center gap-3 ">
          <span className="text-foreground text-2xl">Course Structure</span>

          {/* The accordion */}
          <Accordion type="multiple" className="w-full">
            {sections?.map((section) => (
              <AccordionItem
                key={section._id}
                value={section.title}
                className="border border-white/5"
              >
                {/* The chapter name */}
                <AccordionTrigger className="border-b rounded-none px-2 bg-white/3 border-white/5 text-md">
                  {section.title}
                </AccordionTrigger>

                {/* The videos */}
                <AccordionContent className="">demo content</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Course;
