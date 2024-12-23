import React, { useState } from 'react';
import { Filter, User, Search, ChevronDown, Briefcase, Cpu, Lightbulb } from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('participated');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    software: '',
    type: '',
    topic: '',
    search: ''
  });

  const userData = {
    name: "John Smith",
    title: "Mechanical Design Engineer",
    linkedin: "linkedin.com/in/johnsmith",
    github: "github.com/johnsmith",
    portfolio: "johnsmith.design",
    bio: "Passionate CAD designer with 5+ years of experience in automotive and aerospace design",
    email: "john.smith@email.com",
    education: "MSc Mechanical Engineering - University of XYZ"
  };

  const participatedContests = [
    {
      id: 1,
      image: "/api/placeholder/120/120",
      name: "EV Battery Housing Design Challenge",
      description: "Design an innovative battery housing for electric vehicles focusing on thermal management and safety.",
      type: "Design",
      topic: "Electric Vehicle",
      software: "SolidWorks",
      position: 2,
      date: "Mar 2024"
    },
    {
      id: 2,
      image: "/api/placeholder/120/120",
      name: "Aerospace Component Optimization",
      description: "Optimize aircraft landing gear components for weight reduction while maintaining structural integrity.",
      type: "Simulation",
      topic: "Aerospace",
      software: "CATIA",
      position: 1,
      date: "Feb 2024"
    }
  ];

  const createdContests = [
    {
      id: 1,
      image: "/api/placeholder/120/120",
      name: "Automotive Suspension Design",
      description: "Create an innovative suspension system for off-road vehicles.",
      type: "Design",
      topic: "Automobile",
      software: "Fusion360",
      participants: 156,
      duration: "30 days",
      status: "Active",
      date: "Mar 2024"
    },
    {
      id: 2,
      image: "/api/placeholder/120/120",
      name: "Medical Device Innovation",
      description: "Design a portable medical device for remote patient monitoring.",
      type: "Design",
      topic: "Healthcare",
      software: "SolidWorks",
      participants: 89,
      duration: "45 days",
      status: "Completed",
      date: "Feb 2024"
    }
  ];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Apply filters to contests
  const applyFilters = (contests) => {
    return contests.filter((contest) => {
      return (
        (filters.software ? contest.software.toLowerCase().includes(filters.software.toLowerCase()) : true) &&
        (filters.type ? contest.type.toLowerCase().includes(filters.type.toLowerCase()) : true) &&
        (filters.topic ? contest.topic.toLowerCase().includes(filters.topic.toLowerCase()) : true) &&
        (filters.search ? contest.name.toLowerCase().includes(filters.search.toLowerCase()) : true)
      );
    });
  };

  // Get the contests to display based on the active tab and filters
  const contestsToDisplay = activeTab === 'participated' 
    ? applyFilters(participatedContests) 
    : applyFilters(createdContests);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">CAPZERO</h1>
          <nav className="space-x-6">
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/settings" className="hover:text-gray-200">Settings</a>
            <a href="/contest" className="hover:text-gray-200">Contest</a>
            <a href="/signout" className="hover:text-gray-200">Sign Out</a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600">{userData.title}</p>
            <div className="mt-2 flex gap-4">
              <a href={userData.linkedin} className="text-gray-600 hover:underline">
                <Briefcase className="h-5 w-5" /> LinkedIn
              </a>
              <a href={userData.github} className="text-gray-600 hover:underline">
                <Cpu className="h-5 w-5" /> GitHub
              </a>
              <a href={userData.portfolio} className="text-gray-600 hover:underline">
                <Lightbulb className="h-5 w-5" /> Portfolio
              </a>
            </div>
            <p className="mt-2 text-gray-700">{userData.bio}</p>
            <p className="mt-1 text-gray-500">{userData.education}</p>
            <p className="mt-1 text-gray-500">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search contests..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-5 w-5" />
              Filters
              <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <select
                className="p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="software"
                value={filters.software}
                onChange={handleFilterChange}
              >
                <option value="">All Software</option>
                <option value="solidworks">SolidWorks</option>
                <option value="catia">CATIA</option>
                <option value="fusion360">Fusion 360</option>
              </select>
              <select
                className="p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                <option value="design">Design</option>
                <option value="simulation">Simulation</option>
              </select>
              <select
                className="p-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="topic"
                value={filters.topic}
                onChange={handleFilterChange}
              >
                <option value="">All Topics</option>
                <option value="automobile">Automobile</option>
                <option value="ev">Electric Vehicle</option>
                <option value="aerospace">Aerospace</option>
              </select>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('participated')}
                className={`flex-1 px-4 py-3 text-center ${
                  activeTab === 'participated' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Participated
              </button>
              <button
                onClick={() => setActiveTab('created')}
                className={`flex-1 px-4 py-3 text-center ${
                  activeTab === 'created' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Created
              </button>
            </div>
          </div>

          {/* Contest Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contestsToDisplay.map((contest) => (
                <div key={contest.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition-all">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{contest.name}</h2>
                    <p className="text-gray-600">{contest.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-semibold">{contest.software}</span> | {contest.type} | {contest.topic}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="text-sm text-gray-500">{contest.date}</div>
                      <div className="text-sm text-gray-500">Position: {contest.position || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-xl">&copy; 2024 GitHub, Inc.</div>
            <div className="flex gap-6">
              <a href="#terms" className="hover:underline">Terms</a>
              <a href="#privacy" className="hover:underline">Privacy</a>
              <a href="#security" className="hover:underline">Security</a>
              <a href="#status" className="hover:underline">Status</a>
              <a href="#docs" className="hover:underline">Docs</a>
              <a href="#contact" className="hover:underline">Contact</a>
              <a href="#cookies" className="hover:underline">Manage cookies</a>
              <a href="#privacy-policy" className="hover:underline">Do not share my personal information</a>
            </div>
            <div className="flex gap-4">
  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
      alt="LinkedIn"
      className="h-5 w-5"
    />
  </a>
  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
      alt="Twitter"
      className="h-5 w-5"
    />
  </a>
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
      alt="Facebook"
      className="h-5 w-5"
    />
  </a>
  <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
      alt="Github"
      className="h-5 w-5"
    />
  </a>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
