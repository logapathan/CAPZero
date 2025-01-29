function Contests() {
  const contests = [
    {
      name: "CAD Design Challenge 2024",
      description: "Design an efficient wind turbine model",
      date: "March 15, 2024",
      status: "Upcoming",
      level: "Advanced",
    },
    {
      name: "Automation Hackathon",
      description: "Created an automated assembly line simulation",
      date: "January 5, 2024",
      status: "Completed",
      level: "Intermediate",
      rank: "Rank 2 of 150",
    },
  ]

  return (
    <div className="space-y-6">
      {contests.map((contest, index) => (
        <div key={index} className="bg-blue-50 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{contest.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{contest.description}</p>
                <p className="mt-1 text-sm text-gray-500">{contest.date}</p>
                {contest.rank && <p className="mt-1 text-sm font-semibold text-blue-600">{contest.rank}</p>}
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    contest.status === "Upcoming" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {contest.status}
                </span>
                <span className="mt-1 text-sm text-gray-500">{contest.level}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Contests

