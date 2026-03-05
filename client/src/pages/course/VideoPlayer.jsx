/* ----------------------------------------------------------------------------------------------
VideoPlayer.jsx
The page for playing a course video 
------------------------------------------------------------------------------------------------- */

import { useParams, Link } from "react-router-dom";
import useGetVideoData from "@/hooks/useGetVideoData";
import { useGetCourseQuery } from "@/api/index.api";
import ReactPlayer from "react-player";
import { StudentAccordion } from "@/components/index.components";

function VideoPlayer() {
  // the data
  const { courseId, videoId } = useParams();
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data; // course
  const sections = course?.sections; // sections

  // the video details
  const { courseTitle, sectionTitle, videoTitle, videoUrl } = useGetVideoData(
    courseId,
    videoId
  );

  return (
    <div className="h-auto bg-[#0a0a0c] text-white font-sans rounded-lg w-full md:w-[80%]">
      {/* Header/Navigation Bar */}
      <nav className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to={`/app/courses/${courseId}`}
            className="text-purple-500 hover:underline"
          >
            ← Back to Course
          </Link>
          <span className="text-gray-500">|</span>
          <span className="text-sm text-gray-400">{courseTitle}</span>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row h-auto">
        {/* Video & Info */}
        <section className="flex-1 p-3 overflow-y-auto">
          {/* Video Player Component */}
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
            <ReactPlayer
              width="100%"
              height="100%"
              src={videoUrl}
              controls
              playing={true}
            />
          </div>

          <div className="mt-6 flex justify-between items-start">
            <button className="text-xs px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition md:text-sm md:px-6">
              Mark as Completed
            </button>
          </div>
        </section>

        <aside className="w-full lg:w-80 bg-[#121214] border-l border-gray-800 p-4 overflow-y-auto rounded-b-lg lg:rounded-bl-none">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Course Content</h3>
            {/* Progress Bar Component */}
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div className="bg-purple-500 h-2 rounded-full w-[25%]"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">25% Completed</p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-700 rounded-md p-3 bg-purple-900/10">
              <p className="text-sm font-medium text-purple-400">
                Current Section
              </p>
              <p className="text-xs text-gray-300">{sectionTitle}</p>
              <div className="mt-3 space-y-2">
                <div className="text-sm py-2 px-2 bg-purple-600/20 rounded border-l-2 border-purple-500 cursor-pointer">
                  ▶ {videoTitle}
                </div>
              </div>
            </div>
            {/* The accordion */}
            <StudentAccordion
              courseId={courseId}
              sections={sections}
              videoLabel="PLAY"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default VideoPlayer;
