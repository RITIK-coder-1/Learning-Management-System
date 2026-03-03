/* ----------------------------------------------------------------------------------------------
useGetVideoData.js
The hook to provide the important data for course videos
------------------------------------------------------------------------------------------------- */

import { useGetCourseQuery } from "@/api/index.api";
import { useEffect, useState } from "react";

function useGetVideoData(courseId, videoId) {
  // the course
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;

  // the video details to send
  const [videoData, setVideoData] = useState({
    courseTitle: course?.title,
    sectionTitle: "",
    videoTitle: "",
  });

  useEffect(() => {
    if (!course || !videoId) return;

    // returns an array of sections where one element has the video details if it matches the video the user wants to watch and the other elements are undefined
    const sectionsArray = course?.sections?.flatMap((section) => {
      return section?.courseVideos?.flatMap((video) => {
        if (video?._id === videoId) {
          return {
            courseTitle: course?.title,
            sectionTitle: section?.title,
            videoTitle: video?.title,
          };
        }
      });
    });

    // remove the unwanted undefined elements
    const videoDetailsArray = sectionsArray?.filter((ele) => ele !== undefined);

    // update the video details with the array element
    if (videoDetailsArray !== undefined) {
      setVideoData(videoDetailsArray[0]);
    }
  }, [course, videoId]);

  return videoData;
}

export default useGetVideoData;
