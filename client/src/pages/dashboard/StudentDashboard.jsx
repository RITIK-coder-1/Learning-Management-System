/* ----------------------------------------------------------------------------------------------
StudentDashboard.jsx
------------------------------------------------------------------------------------------------- */

function StudentDashboard() {
  // Dummy data for my current development phase
  const stats = [
    { label: "Enrolled Courses", value: 3 },
    { label: "Average Progress", value: "45%" },
    { label: "Hours Learned", value: 12 },
  ];

  const recentCourse = {
    title: "Software Engineering Crash Course",
    instructor: "Ritik Mahapatra",
    progress: 60,
    thumbnail: "https://via.placeholder.com/150", 
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Ritik!</h1>
        <p className="text-gray-400">Keep moving in meaningful directions.</p>
      </header>

      {/* Hero: Last Visited */}
      <section className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={recentCourse.thumbnail}
          alt="Course"
          className="w-full md:w-48 rounded-lg object-cover"
        />
        <div className="flex-1">
          <span className="text-xs font-semibold px-2 py-1 bg-purple-900 text-purple-300 rounded uppercase">
            Continue Learning
          </span>
          <h2 className="text-2xl font-bold mt-2 text-[#fbbf24]">
            {recentCourse.title}
          </h2>
          <p className="text-gray-400 mb-4">
            Instructor: {recentCourse.instructor}
          </p>

          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${recentCourse.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400">
            {recentCourse.progress}% Completed
          </p>
        </div>
        <button className="bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-all">
          Resume Lesson
        </button>
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
          <button className="text-purple-400 hover:text-purple-300 text-sm">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mapping dummy courses */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer"
            >
              <div className="h-32 bg-gray-800"></div>
              <div className="p-4">
                <h4 className="font-bold mb-1 truncate">
                  MERN Stack Mastery - Volume {i}
                </h4>
                <p className="text-xs text-gray-400 mb-3">By Ritik Mahapatra</p>
                <div className="w-full bg-gray-700 h-1 rounded-full">
                  <div
                    className="bg-[#fbbf24] h-1 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
