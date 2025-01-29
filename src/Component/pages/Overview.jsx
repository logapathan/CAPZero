import { GraduationCap, Briefcase, BookOpen } from "lucide-react"

function Overview() {
  const skills = [
    { name: "SolidWorks", progress: 90 },
    { name: "AutoCAD", progress: 85 },
    { name: "MATLAB", progress: 75 },
    { name: "3D Printing", progress: 80 },
  ]

  return (
    <div className="col-span-2">
        
      <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
          </div>
          <div className="mt-5 space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-500">{skill.progress}%</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview

