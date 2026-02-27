/* ----------------------------------------------------------------------------------------------
InstructorPage.jsx
The page for displaying the details of an instructor publicly 
------------------------------------------------------------------------------------------------- */

import {
  Github,
  Linkedin,
  Globe,
  Users,
  BookOpen,
  Star,
  Mail,
} from "lucide-react";

const InstructorPage = () => {
  const instructor = {
    name: "Ritik Mahapatra",
    title: "Senior Software Engineer & Educator",
    bio: "Passionate about building scalable web applications and teaching the next generation of developers. With over 5 years of industry experience, I focus on practical, hands-on learning that bridges the gap between theory and industry standards.",
    avatar: "/api/placeholder/150/150",
    skills: ["React", "Node.js", "System Design", "TypeScript", "AWS"],
    stats: { students: "12,450", courses: "8", rating: "4.9" },
    socials: { github: "#", linkedin: "#", web: "#" },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans p-6 md:p-12">
      {/* Header / Hero Section */}
      <div className="relative mb-12">
        <div className="h-48 w-full bg-linear-to-r from-purple-900/40 to-blue-900/40 rounded-2xl mb-8 border border-white/5" />
        <div className="absolute -bottom-6 left-8 flex flex-col md:flex-row items-end gap-6">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0A0A0B] shadow-2xl"
          />
          <div className="pb-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-1">
              {instructor.name}
            </h1>
            <p className="text-purple-400 font-medium text-lg">
              {instructor.title}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <Users className="w-5 h-5 mx-auto text-purple-400 mb-2" />
              <p className="text-sm text-gray-400">Students</p>
              <p className="font-bold">{instructor.stats.students}</p>
            </div>
            <div className="border-x border-white/10">
              <BookOpen className="w-5 h-5 mx-auto text-purple-400 mb-2" />
              <p className="text-sm text-gray-400">Courses</p>
              <p className="font-bold">{instructor.stats.courses}</p>
            </div>
            <div>
              <Star className="w-5 h-5 mx-auto text-purple-400 mb-2" />
              <p className="text-sm text-gray-400">Rating</p>
              <p className="font-bold">{instructor.stats.rating}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href={instructor.socials.github}
                className="p-2 bg-white/5 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={instructor.socials.linkedin}
                className="p-2 bg-white/5 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={instructor.socials.web}
                className="p-2 bg-white/5 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <Globe size={20} />
              </a>
              <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition-all">
                <Mail size={18} /> Message
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" /> About Me
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {instructor.bio}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" /> Core
              Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {instructor.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-purple-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Placeholder for Courses Grid */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />{" "}
                Courses by {instructor.name.split(" ")[0]}
              </h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-32 flex items-center justify-center text-gray-500 italic">
                Course Card Component...
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-32 flex items-center justify-center text-gray-500 italic">
                Course Card Component...
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
