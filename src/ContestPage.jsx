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
      image: "/api/placeholder/200/140",
      timeLeft: "2 days",
      participants: 156,
      category: "Vehicle Design",
      prize: "$3000"
    },
    {
      id: 2,
      title: "Industrial Equipment",
      description: "Smart manufacturing tools",
      image: "/api/placeholder/200/140",
      timeLeft: "5 days",
      participants: 89,
      category: "Industrial",
      prize: "$2500"
    },
    {
      id: 3,
      title: "Architecture Challenge",
      description: "Sustainable components",
      image: "/api/placeholder/200/140",
      timeLeft: "3 days",
      participants: 234,
      category: "Architecture",
      prize: "$4000"
    },
    {
      id: 4,
      title: "Product Design Sprint",
      description: "Electronics enclosure",
      image: "/api/placeholder/200/140",
      timeLeft: "6 days",
      participants: 178,
      category: "Product Design",
      prize: "$2000"
    },
    {
      id: 5,
      title: "Aerospace Innovation",
      description: "Aircraft component design",
      image: "/api/placeholder/200/140",
      timeLeft: "4 days",
      participants: 145,
      category: "Aerospace",
      prize: "$5000"
    },
    {
      id: 6,
      title: "Medical Device Design",
      description: "Healthcare equipment",
      image: "/api/placeholder/200/140",
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
      prevIndex - contestsPerPage < 0 ? 
        Math.max(0, featuredContests.length - contestsPerPage) : 
        prevIndex - contestsPerPage
    );
  };
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/contests");
  };
  const visibleContests = featuredContests.slice(currentIndex, currentIndex + contestsPerPage);

  return (
    <><Header />
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-gray-50">
        
      {/* Hero Section */}
      <div className="flex justify-center gap-8 mb-16">
        <Card className="w-72 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white border-none">
          <CardHeader className="space-y-4">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src="https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png"
                alt="Join Contest"
                className="w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardTitle className="text-xl text-center text-blue-800">Join CAD Contest</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-6">
              Showcase your design skills and win exciting prizes
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={handleButtonClick}>
              Browse Contests
            </button>
          </CardContent>
        </Card>

        <Card className="w-72 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-white border-none">
          <CardHeader className="space-y-4">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
                alt="Create Contest"
                className="w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardTitle className="text-xl text-center text-purple-800">Create Contest</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-6">
              Host challenges and discover innovative solutions
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Contest
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Contests Section */}
      <div className="mb-16 bg-white rounded-2xl p-8 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Contests</h2>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={currentIndex + contestsPerPage >= featuredContests.length}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {visibleContests.map((contest) => (
            <Card key={contest.id} className="hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
              <CardHeader className="space-y-3 p-4">
                <div className="overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={contest.image}
                    alt={contest.title}
                    className="w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {contest.category}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {contest.prize}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-base mb-1">{contest.title}</CardTitle>
                  <CardDescription className="text-sm">{contest.description}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between text-xs text-gray-600 p-4 pt-0">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{contest.timeLeft}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{contest.participants}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Contests Section */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Past Contests</h2>
        <div className="space-y-4">
          {featuredContests.slice(0, 3).map((contest) => (
            <Card key={contest.id} className="hover:shadow-lg transition-all border border-gray-100">
              <div className="flex p-4 gap-6">
                <div className="flex-shrink-0">
                  <div className="overflow-hidden rounded-lg shadow-sm">
                    <img
                      src={contest.image}
                      alt={contest.title}
                      className="w-48 h-32 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
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
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ContestPage;