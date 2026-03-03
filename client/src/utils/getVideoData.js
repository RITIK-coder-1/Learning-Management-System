/* ----------------------------------------------------------------------------------------------
getVideoData.js
The utility to provide the important data for course videos
------------------------------------------------------------------------------------------------- */

import { useGetCourseQuery } from "@/api/index.api";

function getVideoData(courseId, videoId) {
  // the course
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;

  // return the video details if it matches the video the user wants to watch
  course?.sections?.map((section) => {
    section?.courseVideos?.map((video) => {
      if (video?._id === videoId) {
        return {
          courseTitle: course?.title,
          sectionTitle: section?.title,
          videoTitle: video?.title,
        };
      }
    });
  });
}

export default getVideoData;
