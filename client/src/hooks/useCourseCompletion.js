/* ----------------------------------------------------------------------------------------------
useCourseCompletion.js
The hook for getting the course completion data 
------------------------------------------------------------------------------------------------- */

import { useGetCourseProgressQuery, useGetCourseQuery } from "@/api/index.api";
import { useState } from "react";

function useCourseCompletion(courseId, videoId) {
  // the course data
  const { data: courseData } = useGetCourseQuery({ courseId });
  const course = courseData?.data;
  const sections = course?.sections;

  // the course progress data
  const { data: courseProgressData } = useGetCourseProgressQuery({
    courseId,
    videoId,
  });
  const completedVideos = courseProgressData?.data?.completedVideos;

  // the state to hold the course videos
  const [courseVideos, setCourseVideos] = useState([]);

  // adding each video to the numberOfCourseVideos array
  sections?.forEach((section) => {
    section?.courseVideos.forEach((video) => {
      // add only if the video isn't present already
      if (!courseVideos.includes(video?._id)) {
        setCourseVideos([...courseVideos, video?._id]);
      }
    });
  });

  // the total number of videos in the course
  const totalCourseVideos = courseVideos?.length;
  // the total number of videos completed by the user
  const totalCompleteVideos = completedVideos?.length;
  // the progress percentage
  const courseProgress = (totalCompleteVideos / totalCourseVideos) * 100;

  return courseProgress;
}

export default useCourseCompletion;
