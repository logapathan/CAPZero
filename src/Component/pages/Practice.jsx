function Practice() {
  const practices = [
    {
      name: "Advanced SolidWorks Techniques",
      type: "Skill Assessment",
      completedDate: "2024-01-10",
      level: "Advanced",
      score: "95%",
      skills: ["SolidWorks", "3D Modeling", "Assembly"],
    },
    {
      name: "AutoCAD Fundamentals",
      type: "Course",
      completedDate: "2023-12-15",
      level: "Intermediate",
      score: "88%",
      skills: ["AutoCAD", "2D Drawing", "Layout Design"],
    },
  ]

  return (
    <div className="space-y-6">
      {practices.map((practice, index) => (
        <div key={index} className="bg-blue-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{practice.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{practice.type}</p>
                <p className="mt-1 text-sm text-gray-500">Completed: {practice.completedDate}</p>
                <div className="mt-2">
                  {practice.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800 mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {practice.level}
                </span>
                <span className="mt-1 text-sm font-semibold text-gray-900">Score: {practice.score}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Practice

