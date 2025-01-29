function Achievements() {
  const achievements = [
    {
      name: "SolidWorks Professional Certification",
      description: "Achieved professional-level certification in SolidWorks",
      date: "2023-05-15",
      issuer: "Dassault Systèmes",
      level: "Advanced",
      type: "Certificate",
      link: "#",
    },
    {
      name: "Design Innovation Award",
      description: "First place in university design competition",
      date: "2023-03-20",
      issuer: "MIT Engineering Department",
      level: "Intermediate",
      type: "Award",
    },
  ]

  return (
    <div className="space-y-6">
      {achievements.map((achievement, index) => (
        <div key={index} className="bg-blue-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{achievement.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{achievement.description}</p>
                <p className="mt-1 text-sm text-gray-500">{achievement.date}</p>
                <p className="mt-1 text-sm text-gray-500">{achievement.issuer}</p>
                {achievement.link && (
                  <a href={achievement.link} className="mt-2 text-sm text-blue-600 hover:text-blue-500">
                    View Certificate →
                  </a>
                )}
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {achievement.level}
                </span>
                <span className="mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
                  {achievement.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Achievements

