function Projects() {
  const projects = [
    {
      name: "Automated Drone Design",
      description: "Designed and simulated an autonomous drone using SolidWorks",
      level: "Advanced",
      skills: ["SolidWorks", "Simulation", "Aerodynamics"],
    },
    {
      name: "Smart Factory Layout",
      description: "Optimized factory layout using AutoCAD and simulation tools",
      level: "Intermediate",
      skills: ["AutoCAD", "Layout Design", "Optimization"],
    },
  ]

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={index} className="bg-blue-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                <div className="mt-2">
                  {project.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800 mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {project.level}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Projects

