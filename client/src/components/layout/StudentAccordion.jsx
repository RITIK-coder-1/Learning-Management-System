/* ----------------------------------------------------------------------------------------------
StudentAccordion.jsx
The custom accordion for students' interface (public course and video players)
------------------------------------------------------------------------------------------------- */

import {
  CourseCommonAccordion,
  CourseCommonAccordionItem,
  CourseAccordionContent,
  CourseAccordionTrigger,
} from "../index.components";
import { Link, useParams } from "react-router-dom";
import slugify from "@/utils/slugify";
import { PlayCircle, ChevronRightIcon } from "lucide-react";
import useUserStatus from "@/hooks/useUserStatus";

function StudentAccordion({ sections, courseId, videoLabel = "WATCH NOW" }) {
  // the user stats
  const { isOwner, isEnrolled, accountType, isAuthenticated } =
    useUserStatus(courseId);

  // the video Id
  const { videoId } = useParams();

  return (
    <CourseCommonAccordion>
      {/* The sections */}
      {sections?.map((section) => (
        <CourseCommonAccordionItem value={section._id} key={section._id}>
          {/* The trigger */}
          <CourseAccordionTrigger>{section.title}</CourseAccordionTrigger>
          {/* The videos */}
          <CourseAccordionContent>
            {section?.courseVideos?.length > 0 ? (
              section.courseVideos.map((video, index) => (
                <li
                  key={video?._id}
                  className="w-full group border-b border-white/5 last:border-0 list-none"
                >
                  {/* The link to each video */}
                  <Link
                    to={
                      !isAuthenticated
                        ? ""
                        : // link only if the user is an admin or the student is enrolled or don't
                        accountType === "Admin"
                        ? `/app/courses/${courseId}/watch/${
                            video?._id
                          }/${slugify(video?.title)}`
                        : !isOwner && !isEnrolled
                        ? ""
                        : `/app/courses/${courseId}/watch/${
                            video?._id
                          }/${slugify(video?.title)}`
                    }
                    className={`flex items-center justify-between px-6 py-4 transition-all duration-200 hover:bg-white/5 active:bg-white/10 ${
                      videoId === video?._id ? "bg-white/5" : "bg-none"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Index and Play Icon */}
                      <span className="text-sm text-muted-foreground w-4 text-center group-hover:hidden">
                        {index + 1}.
                      </span>
                      <PlayCircle className="size-4 text-primary hidden group-hover:block animate-in fade-in zoom-in duration-300" />

                      <span className="text-md font-medium text-slate-200 group-hover:text-white transition-colors">
                        {video?.title}
                      </span>
                    </div>

                    {/* Link/Action Label */}
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* If the student isn't enrolled, ask them to enroll */}
                        {!isAuthenticated
                          ? "Login To Watch"
                          : accountType === "Admin"
                          ? "WATCH"
                          : !isOwner && !isEnrolled
                          ? "Enroll To Watch"
                          : videoLabel}
                      </span>
                      <ChevronRightIcon className="size-4" />
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8 w-full text-sm italic">
                No videos found in this section.
              </p>
            )}
          </CourseAccordionContent>
        </CourseCommonAccordionItem>
      ))}
    </CourseCommonAccordion>
  );
}

export default StudentAccordion;
