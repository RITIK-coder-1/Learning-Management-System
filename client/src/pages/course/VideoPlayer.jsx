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
  SpinnerCustom,
} from "@/components/index.components";
import useUserStatus from "@/hooks/useUserStatus";
import { toast } from "sonner";

function VideoPlayer() {
  // the data
  const { courseId, videoId } = useParams();
  const [completeVideo, { isLoading: isCompleteVideoLoading }] =
    useCompleteCourseVideoMutation();
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
      const { message } = await completeVideo({ courseId, videoId }).unwrap();
      toast.success(message, { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error(error.message, { position: "top-right" });
    }
  };

  // if the user is the owner of the course or the admin of the app
  const { isOwner, accountType } = useUserStatus(courseId);

  return (
    <div className="h-auto bg-[#0a0a0c] text-white font-sans rounded-lg w-[90%] shadow-black mb-5 shadow-2xl lg:w-[80%]">
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

      <div className="flex flex-col md:flex-row h-[120vh] md:h-[80vh]">
        {/* Video & Info */}
        <section className="p-3 overflow-y-auto h-[150%] w-full md:h-full md:w-[120%]">
          {/* Video Player Component */}
          <div
            className={`aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800 h-[80%] ${
              (isOwner || accountType === "Admin") && "h-full"
            }`}
          >
            <ReactPlayer
              width="100%"
              height="100%"
              src={videoUrl || null}
              controls
              playing={true}
              onEnded={
                !isOwner && accountType !== "Admin" && completeVideoApiCall
              } // autocomplete the video when the video ends for students
            />
          </div>

          {/* Add the mark complete button to the non-owner and non-admin users only */}
          {!isOwner && accountType !== "Admin" ? (
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
                  label={
                    isCompleteVideoLoading ? (
                      <SpinnerCustom />
                    ) : (
                      "Mark as completed"
                    )
                  }
                  onClick={completeVideoApiCall}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </section>

        <aside className="w-full bg-[#121214] border-l border-gray-800 p-4 overflow-y-auto rounded-b-lg md:rounded-bl-none h-full">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Course Content</h3>
            {/* Progress Bar Component */}
            {!isOwner && accountType !== "Admin" && (
              <ProgressBar courseId={courseId} />
            )}
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
