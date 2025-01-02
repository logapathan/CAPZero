import React, { useState } from 'react';
import { Clock, Trophy, Users, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from './Header';
import { useNavigate } from "react-router-dom";

const ContestPage = () => {
  const [featuredContests] = useState([
    {
      id: 1,
      title: "Automotive Design Challenge",
      description: "Design next-gen EV chassis",
      image: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
      timeLeft: "2 days",
      participants: 156,
      category: "Vehicle Design",
      prize: "$3000"
    },
    {
      id: 2,
      title: "Industrial Equipment",
      description: "Smart manufacturing tools",
      image: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
      timeLeft: "5 days",
      participants: 89,
      category: "Industrial",
      prize: "$2500"
    },
    {
      id: 3,
      title: "Architecture Challenge",
      description: "Sustainable components",
      image: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
      timeLeft: "3 days",
      participants: 234,
      category: "Architecture",
      prize: "$4000"
    },
    {
      id: 4,
      title: "Product Design Sprint",
      description: "Electronics enclosure",
      image: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
      timeLeft: "6 days",
      participants: 178,
      category: "Product Design",
      prize: "$2000"
    },
    {
      id: 5,
      title: "Aerospace Innovation",
      description: "Aircraft component design",
      image: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
      timeLeft: "4 days",
      participants: 145,
      category: "Aerospace",
      prize: "$5000"
    },
    {
      id: 6,
      title: "Medical Device Design",
      description: "Healthcare equipment",
      image: "https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png",
      timeLeft: "7 days",
      participants: 167,
      category: "Medical",
      prize: "$3500"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const contestsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + contestsPerPage >= featuredContests.length ? 0 : prevIndex + contestsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - contestsPerPage < 0 ? Math.max(0, featuredContests.length - contestsPerPage) : prevIndex - contestsPerPage
    );
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/contests");
  };

  const visibleContests = featuredContests.slice(currentIndex, currentIndex + contestsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contestId, setContestId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ contestId: "", password: "" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    let validationErrors = { contestId: "", password: "" };

    if (!contestId) validationErrors.contestId = "Contest ID is required.";
    if (!password) validationErrors.password = "Password is required.";

    if (validationErrors.contestId || validationErrors.password) {
      setErrors(validationErrors);
    } else {
      // Handle form submission logic (e.g., join contest)
      console.log("Joining contest", { contestId, password });
      navigate("/k");
      closeModal(); // Close modal after submission
    }
  };


  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl bg-gray-50">
        {/* Hero Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 p-2">
          <Card className="w-full sm:w-72 md:w-96 hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-white border-none">
            <CardHeader className="space-y-4">
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src="https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png"
                  alt="Join Contest"
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardTitle className="text-xl text-center text-indigo-800">Join CAD Contest</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Showcase your design skills and win exciting prizes
              </p>
              <button
                className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={openModal}
              >
                Browse Contests
              </button>
            </CardContent>
          </Card>

          <Card className="w-full sm:w-72 md:w-96 hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-white border-none">
            <CardHeader className="space-y-4">
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
                  alt="Create Contest"
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardTitle className="text-xl text-center text-teal-800">Create Contest</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Host challenges and discover innovative solutions
              </p>
              <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 "
              onClick={handleButtonClick}>
                Start Contest
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Contests Section */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Contests</h2>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                disabled={currentIndex === 0}
                aria-label="Previous Slide"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                disabled={currentIndex + contestsPerPage >= featuredContests.length}
                aria-label="Next Slide"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
            {visibleContests.map((contest) => (
              <Card key={contest.id} className="hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                <CardHeader className="space-y-3">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={contest.image}
                      alt={contest.title}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base">{contest.title}</CardTitle>
                    <CardDescription className="text-sm">{contest.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{contest.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{contest.participants}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
                                                                                          {/* Past Contest  */}
          <div className="bg-white rounded-2xl p-8 ">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Contests</h2>
            <div className="space-y-4">
              {featuredContests.slice(0, 3).map((contest) => (
              <Card
              key={contest.id}
              className="hover:shadow-lg transition-all border border-gray-100"
                >
        <div className="flex flex-col sm:flex-row p-4 gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <img
                src={contest.image}
                alt={contest.title}
                className="w-full sm:w-48 h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
                                                                                     
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {contest.category}
              </span>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Prize: {contest.prize}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{contest.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{contest.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">John Doe</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{contest.participants} participants</span>
                </div>
              </div>
              <a className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium cursor-pointer">
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
</div>
        </div>
      </div>
      {/* Join Contest Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96">
              <h2 className="text-xl font-semibold text-center mb-4">Join Contest</h2>
              <form onSubmit={handleJoinSubmit}>
                <div className="mb-4">
                  <label htmlFor="contestId" className="block text-sm font-medium text-gray-700">Contest ID</label>
                  <input
                    type="text"
                    id="contestId"
                    value={contestId}
                    onChange={(e) => setContestId(e.target.value)}
                    className="mt-1 block w-full bg-white px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {errors.contestId && <p className="text-red-500 text-xs mt-1">{errors.contestId}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full bg-white px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};

export default ContestPage;
