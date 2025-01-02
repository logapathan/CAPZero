import React from "react";
import { Mail, Linkedin, Github, Pencil, User } from "lucide-react";

const MainSection = () => {
  const userData = {
    name: "John Smith",
    title: "Mechanical Design Engineer",
    linkedin: "linkedin.com/in/johnsmith",
    github: "github.com/johnsmith",
    portfolio: "johnsmith.design",
    bio: "Passionate CAD designer with 5+ years of experience in automotive and aerospace design.",
    email: "john.smith@email.com",
    education: "MSc Mechanical Engineering - University of XYZ (Graduated 2020)",
    skills: ["CAD Design", "SolidWorks", "AutoCAD", "Aerospace Design"],
    courses: [
      {
        name: "Advanced CAD Design",
        certificate: "Yes",
        company: "Coursera",
        date: "Jan 2023",
      },
      {
        name: "Aerospace Engineering Fundamentals",
        certificate: "No",
        company: "MIT OpenCourseWare",
        date: "Dec 2022",
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row h-56 bg-white rounded-t-lg">
        {/* Cover Image */}
        <div className="flex-1 relative">
          <img
            src={"https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png" || ""}
            alt="https://via.placeholder.com/800x200?text=Profile+Cover"
            className="w-full h-full object-cover rounded-t-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x200?text=Placeholder+Cover";}}
          />
          {/* Profile Picture */}
          <div className="absolute left-8 bottom-[-40px] w-24 h-24 bg-white border-4 border-white rounded-full overflow-hidden">
            <User className="w-full h-full text-gray-400" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 p-6 w-full md:w-[10%] ml-12 rounded-r-lg shadow flex flex-col items-center gap-4">
          
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${userData.email}`}
              className="text-gray-600 hover:text-blue-600"
              aria-label="Email"
            >
              <Mail size={28} />
            </a>
            <a
              href={`https://${userData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={`https://${userData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
              aria-label="GitHub"
            >
              <Github size={28} />
            </a>
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-20 flex flex-col gap-8">
        {/* Name, Designation, and College */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-xl font-semibold text-gray-600">{userData.title}</p>
              <p className="text-sm text-gray-500 mt-1">{userData.education}</p>
            </div>
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Edit Profile"
            >
              <Pencil size={24} />
            </button>
          </div>
        </div>

        {/* About Me Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-2">{userData.bio}</p>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          <div className="flex gap-2 flex-wrap mt-2">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 text-sm font-medium py-1 px-3 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <ul className="mt-2 space-y-2">
            {userData.courses.map((course, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="text-gray-800 font-semibold">{course.name}</h3>
                  <p className="text-sm text-gray-600">
                    {course.company} &bull; {course.date}
                  </p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    course.certificate === "Yes"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {course.certificate === "Yes" ? "Certified" : "No Certificate"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
