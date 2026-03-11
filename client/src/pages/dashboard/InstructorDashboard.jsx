/* ----------------------------------------------------------------------------------------------
InstructorDashboard.jsx
------------------------------------------------------------------------------------------------- */
import React from "react";
import {
  PlusCircle,
  Users,
  BookOpen,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetInstructorDataQuery } from "@/api/index.api";

function InstructorDashboard() {
  // instructor data
  const { data } = useGetInstructorDataQuery();
  const createdCourses = data?.createdCourses; // created courses 
  const totalStudents = data?.totalStudents; // total students

  // stats
  const stats = [
    {
      label: "Total Students",
      value: totalStudents || 0,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Active Courses",
      value: createdCourses?.length || 0,
      icon: BookOpen,
      color: "text-purple-400",
    },
    {
      label: "Total Revenue",
      value: "$4,250" || 0,
      icon: DollarSign,
      color: "text-green-400",
    },
  ];

  // display only the last three created courses
  const diplayCourses = createdCourses?.slice(-3).toReversed();

  return (
    <div className="min-h-screen w-full bg-[#020617] text-gray-100 p-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center gap-6 mb-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back, Ritik!!</h1>
          <p className="text-gray-400 mt-1">
            Empowering students through meaningful content.
          </p>
        </div>
        <Link to={"/app/created-courses/create"} className="">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-purple-900/20">
            <PlusCircle size={20} />
            Create New Course
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition-all"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>
              <stat.icon className={`${stat.color} opacity-80`} size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Courses List Section */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Courses</h2>
          <Link to="/app/created-courses">
            <button className="text-sm text-purple-400 hover:underline">
              View All
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1e293b]/50 text-gray-400 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Course Title</th>
                <th className="px-6 py-4 font-medium text-center">Enrolled</th>
                <th className="px-6 py-4 font-medium text-center">Price</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {diplayCourses?.map((course) => (
                <tr
                  key={course?._id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{course?.title}</td>
                  <td className="px-6 py-4 text-center">
                    {course?.enrolledBy?.length}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {course?.price === 0 ? "Free" : course?.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        course.status === "Published"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {course?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/app/created-courses/${course?._id}`}>
                      <button className="p-2 hover:bg-gray-700 rounded-full">
                        <ArrowRight size={18} className="text-gray-400" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
