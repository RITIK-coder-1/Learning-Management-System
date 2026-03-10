/* ----------------------------------------------------------------------------------------------
StudentDashboard.jsx
------------------------------------------------------------------------------------------------- */

import { useGetCourseQuery, useGetUserQuery } from "@/api/index.api";
import { CommonButton, ProgressBar } from "@/components/index.components";
import useAverageProgress from "@/hooks/useAverageProgress";
import { Link } from "react-router-dom";

function StudentDashboard() {
  // the user
  const { data: userData } = useGetUserQuery();
  const user = userData?.data;

  // the last course visited
  const lastCourseId = user?.lastCourseVisited;
  const { data: courseData } = useGetCourseQuery({ courseId: lastCourseId });
  const lastCourse = courseData?.data;

  // user stats
  const stats = [
    { label: "Enrolled Courses", value: user?.enrolledCourses?.length },
    { label: "Average Progress", value: "x" }, // the average progress of the user across all the courses
    { label: "Hours Learned", value: 12 },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName}!!
        </h1>
        <p className="text-gray-400">Keep moving in meaningful directions.</p>
      </header>

      {/* Hero: Last Visited */}
      <section className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={lastCourse?.thumbnail}
          alt="Course"
          className="w-full md:w-48 rounded-lg object-cover"
        />
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
        <Link to={`/app/courses/${lastCourseId}`}>
          <CommonButton
            label="Resume Lesson"
            className="bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white"
          />
        </Link>
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
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Enrolled Courses</h3>
          <Link
            className="text-purple-400 hover:text-purple-300 text-sm"
            to="/app/enrolled-courses"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* the enrolled courses */}
          {user?.enrolledCourses?.map((course) => (
            <Link to={`/app/courses/${course?._id}`} key={course?._id}>
              <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                <div className="h-32 bg-gray-800">
                  <img
                    src={course?.thumbnail || null}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-1 truncate">{course?.title}</h4>
                  <p className="text-xs text-gray-400 mb-3">
                    By {course?.owner?.firstName} {course?.owner?.lastName}
                  </p>
                  <div className="w-full bg-gray-700 h-1 rounded-full">
                    <div
                      className="bg-[#fbbf24] h-1 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
