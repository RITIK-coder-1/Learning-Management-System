/* ----------------------------------------------------------------------------------------------
enrollCourse.jsx
The enrollment logic 
------------------------------------------------------------------------------------------------- */

import {
  useEnrollCourseMutation,
  useGetCourseQuery,
  useGetUserQuery,
} from "@/api/index.api";
import { CommonButton } from "@/components/index.components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const enrollCourse = (courseId) => {
  const auth = useSelector((state) => state.auth);

  // the authentication status of the user
  const isAuthenticated = auth?.isAuthenticated;

  // the user
  const { data: userData } = useGetUserQuery(auth?.user?.id);
  const user = userData?.data;

  // the course
  const { data: courseData } = useGetCourseQuery({ courseId });
  const course = courseData?.data;

  // the enroll course mutation
  const [enroll] = useEnrollCourseMutation();

  // the enroll course API call
  const enrollIntoCourse = async () => {
    try {
      await enroll({ courseId }).unwrap();
    } catch (error) {
      console.error("There was an error");
    }
  };

  // if the user isn't logged in, forward them to the login page to enroll
  if (!isAuthenticated) {
    return (
      <Link to="/login">
        <CommonButton
          label="Login To Enroll"
          className="w-full"
          title="Enroll"
        />
      </Link>
    );
  }

  if (isAuthenticated) {
    switch (user?._id === course?.owner?._id) {
      // if the user is the instructor themselves, forward them to the edit page
      case true:
        return (
          <Link to={`/app/created-courses/${courseId}`}>
            <CommonButton
              label="Edit Course"
              className="w-full"
              title="Edit"
            />
          </Link>
        );
      case false:
        return user?.enrolledCourses.includes(courseId) ? (
          // if the user has already enrolled, forward them to the enrolled course page
          <Link to={`/app/enrolled-courses/${courseId}`}>
            <CommonButton
              label="Go To Course"
              className="w-full"
              title="Visit Course"
            />
          </Link>
        ) : (
          // if the user hasn't enrolled, enroll them
          <CommonButton
            label="Enroll Course"
            className="w-full"
            title="Enroll"
            onClick={enrollIntoCourse}
          />
        );
    }
  }
};

export default enrollCourse;
