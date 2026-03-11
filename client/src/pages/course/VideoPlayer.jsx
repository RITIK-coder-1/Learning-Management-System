/* ----------------------------------------------------------------------------------------------
VideoPlayer.jsx
The page for playing a course video 
------------------------------------------------------------------------------------------------- */

import { useParams, Link } from "react-router-dom";
import useGetVideoData from "@/hooks/useGetVideoData";
import {
  useGetCourseQuery,
  useCompleteCourseVideoMutation,
  useGetCourseProgressQuery,
} from "@/api/index.api";
import ReactPlayer from "react-player";
import {
  StudentAccordion,
  CommonButton,
  ProgressBar,
} from "@/components/index.components";

function VideoPlayer() {
  // the data
  const { courseId, videoId } = useParams();
  const [completeVideo] = useCompleteCourseVideoMutation();
  const { data: courseData } = useGetCourseQuery({ courseId });
  const course = courseData?.data; // course
  const sections = course?.sections; // sections

  // the video details
  const { courseTitle, sectionTitle, videoTitle, videoUrl } = useGetVideoData(
    courseId,
    videoId
  );

  // the course completed videos
  const { data: courseProgressData } = useGetCourseProgressQuery({
    courseId,
    videoId,
  });
  const completedVideos = courseProgressData?.data?.completedVideos;

  // the API call to complete the video
  const completeVideoApiCall = async () => {
    try {
      await completeVideo({ courseId, videoId }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

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
              src={videoUrl || null}
              controls
              playing={true}
              onEnded={completeVideoApiCall} // autocomplete the video when the video ends
            />
          </div>

          <div className="mt-6 flex justify-between items-start">
            {completedVideos?.some((video) => video._id === videoId) ? (
              <CommonButton
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    COMPLETED
                  </span>
                }
                className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 px-8 py-2.5 rounded-xl font-bold tracking-widest text-xs shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all cursor-default"
              />
            ) : (
              <CommonButton
                label="Mark as completed"
                onClick={completeVideoApiCall}
              />
            )}
          </div>
        </section>

        <aside className="w-full lg:w-80 bg-[#121214] border-l border-gray-800 p-4 overflow-y-auto rounded-b-lg lg:rounded-bl-none">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Course Content</h3>
            {/* Progress Bar Component */}
            <ProgressBar courseId={courseId} />
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
