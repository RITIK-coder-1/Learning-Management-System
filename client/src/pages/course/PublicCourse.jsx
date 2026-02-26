/* ----------------------------------------------------------------------------------------------
PublicCourse.jsx
The page for displaying a course publicly 
------------------------------------------------------------------------------------------------- */

import { Link, useParams } from "react-router-dom";
import { useGetCourseQuery } from "@/api/index.api";
import { CommonButton } from "@/components/index.components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";

function PublicCourse() {
  const { courseId } = useParams();
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;
  const sections = course?.sections;

  return (
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
          <CommonButton label="Enroll Now" className="w-full" title="Enroll" />

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
        {/* Title */}
        <h1 className="text-yellow-500 font-black text-3xl">{course?.title}</h1>

        {/* Description */}
        <p className="text-white/70 text-xs">{course?.description}</p>

        {/* Instructor Info */}
        <span className="text-sm">
          Created By:{" "}
          <Link className="underline underline-offset-4 cursor-pointer text-blue-500 hover:text-blue-900">
            {course?.owner?.firstName} {course?.owner?.lastName}
          </Link>
        </span>

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
                  <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                </AccordionTrigger>

                {/* The videos */}
                <AccordionContent className="w-full">
                  <ol className="w-full list-decimal p-3 pb-0 pl-7 flex flex-col justify-center items-start gap-2 text-lg">
                    {sections?.map((section) => {
                      return section?.courseVideos?.map((video) => {
                        return <li key={video?._id}>{video?.title}</li>;
                      });
                    })}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default PublicCourse;
