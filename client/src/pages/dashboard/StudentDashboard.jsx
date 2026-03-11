/* ----------------------------------------------------------------------------------------------
StudentDashboard.jsx
------------------------------------------------------------------------------------------------- */

import { useGetCourseQuery, useGetUserQuery, useGetBulkCourseProgressQuery } from "@/api/index.api";
import { CommonButton, ProgressBar } from "@/components/index.components";
import { Link } from "react-router-dom";

function StudentDashboard() {
  // the user
  const { data: userData } = useGetUserQuery();
  const user = userData?.data;

  // the progress of the user across all the courses
  const enrolledCoursesIds = user?.enrolledCourses?.map(
    (course) => course?._id
  );
  const { data: userProgressData } =
  useGetBulkCourseProgressQuery(enrolledCoursesIds);
  const averageProgress = userProgressData?.average; // the average progress
  const totalLearningCredits = userProgressData?.totalLearningCredits; // the total credits

  // the last course visited
  const lastCourseId = user?.lastCourseVisited;
  const { data: courseData } = useGetCourseQuery({ courseId: lastCourseId });
  const lastCourse = courseData?.data;  

  // user stats
  const stats = [
    { label: "Enrolled Courses", value: user?.enrolledCourses?.length },
    { label: "Average Progress", value: averageProgress },
    { label: "Total Credits", value: totalLearningCredits },
  ];

  // enrolled courses to display (only the last three)
  const enrolledCoursesToDisplay = user?.enrolledCourses?.slice(-3)

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans w-full lg:w-[80%]">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName}!!
        </h1>
        <p className="text-gray-400">Keep moving in meaningful directions.</p>
      </header>

      {/* Hero: Last Visited */}
      <section className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 mb-8 h-auto sm:h-66">
        {!lastCourseId ? (
          <span className="flex justify-center items-center w-full text-foreground italic">
            You have not visited any enrolled courses yet.
          </span>
        ) : (
          <div className="w-full h-full flex flex-col sm:flex-row items-start gap-6">
            <img
              src={lastCourse?.thumbnail}
              alt="Course"
              className="w-full sm:w-48 md:w-120 h-full rounded-lg object-cover"
            />
            <div className="w-full flex flex-col gap-6 h-full">
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold mt-2 text-[#fbbf24]">
                {lastCourse?.title}
              </h2>
              <p className="text-gray-400 mb-4">
                Instructor: {lastCourse?.owner?.firstName}{" "}
                {lastCourse?.owner?.lastName}
              </p>
              <ProgressBar courseId={lastCourseId} />
            </div>
            <Link to={`/app/courses/${lastCourseId}`} className="w-full flex justify-center items-center">
              <CommonButton
                label="Resume Lesson"
                className="bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white w-full md:w-66"
              />
            </Link>
            </div>
          </div>
        )}
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 text-center"
          >
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Course List Section */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Enrolled Courses</h3>
          {user?.enrolledCourses?.length > 0 ? (
            <Link
              className="text-purple-400 hover:text-purple-300 text-sm"
              to="/app/enrolled-courses"
            >
              View All
            </Link>
          ) : (
            <Link
              className="text-purple-400 hover:text-purple-300 text-sm"
              to="/app/courses"
            >
              Visit Courses
            </Link>
          )}
        </div>
        {/* the enrolled courses */}
        {user?.enrolledCourses?.length > 0 ? (
          <div className="flex justify-end items-center flex-col-reverse sm:flex-row-reverse gap-6 w-full">
            {enrolledCoursesToDisplay?.map((course) => (
              <Link to={`/app/courses/${course?._id}`} key={course?._id} className="w-full sm:w-66">
                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer w-full">
                  <div className="h-32 bg-gray-800">
                    <img
                      src={course?.thumbnail || null}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-1 truncate">{course?.title}</h4>
                    <p className="text-xs text-gray-400 mb-3">
                      By {course?.owner?.firstName} {course?.owner?.lastName}
                    </p>
                    <ProgressBar courseId={course?._id}/>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            You have not enrolled to any courses yet.
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentDashboard;
