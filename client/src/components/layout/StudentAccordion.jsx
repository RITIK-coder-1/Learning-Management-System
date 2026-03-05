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
import { Link } from "react-router-dom";
import slugify from "@/utils/slugify";
import { PlayCircle, ChevronRightIcon } from "lucide-react";

function StudentAccordion({ sections, courseId, videoLabel = "WATCH NOW" }) {
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
                    to={`/app/courses/${courseId}/watch/${video?._id}/${slugify(
                      video?.title
                    )}`}
                    className="flex items-center justify-between px-6 py-4 transition-all duration-200 hover:bg-white/5 active:bg-white/10"
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
                        {videoLabel}
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
