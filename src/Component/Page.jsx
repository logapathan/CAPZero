import { useState } from "react";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import Header from "./pages/Header";
import Overview from "./pages/Overview";
import Contests from "./pages/Contests";
import Practice from "./pages/Practice";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";

const ProfileHeader = () => (
  <div className="relative">
    <div className="h-48 bg-gray-100 rounded-t-lg"></div>
    <div className="absolute bottom-0 left-8 transform translate-y-1/2">
      <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white"></div>
    </div>
  </div>
);

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    "overview",
    "contests",
    "practice",
    "projects",
    "achievements",
  ];

  return (
    <Tabs
      value={currentPage}
      onValueChange={setCurrentPage}
      className="w-full bg-white rounded-lg shadow-md"
    >
      <TabsList className="grid grid-cols-5 gap-2">
        {navItems.map((item) => (
          <TabsTrigger key={item} value={item} className="capitalize">
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

const SkillBar = ({ skill, percentage }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{skill}</span>
      <span className="text-sm font-medium text-gray-500">{percentage}%</span>
    </div>
    <Progress value={percentage} className="h-2" />
  </div>
);

const EducationCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-blue-600">Education</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">MIT</h3>
            <p className="text-gray-600">Mechanical Engineering</p>
            <p className="text-gray-500 text-sm">3rd Year</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-600">Current Position</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="font-semibold text-gray-900">CAD Design Intern</h3>
          <p className="text-gray-600">TechCorp Industries</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const CurrentPositionCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-blue-600">Current Position</CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        <h3 className="font-semibold text-gray-900">CAD Design Intern</h3>
        <p className="text-gray-600">TechCorp Industries</p>
      </div>
    </CardContent>
  </Card>
);

const SkillsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-blue-600">Skills</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <SkillBar skill="SolidWorks" percentage={90} />
          <SkillBar skill="MATLAB" percentage={75} />
        </div>
        <div>
          <SkillBar skill="AutoCAD" percentage={85} />
          <SkillBar skill="3D Printing" percentage={80} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState("overview");

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "contests":
        return <Contests />;
      case "practice":
        return <Practice />;
      case "projects":
        return <Projects />;
      case "achievements":
        return <Achievements />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-7xl mx-auto pb-12">
        <Card>
          <ProfileHeader />

          <div className="pt-16 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Alex Johnson
                </h1>
                <p className="text-gray-600 mt-1">
                  Mechanical Engineering student passionate about CAD design and
                  automation
                </p>
              </div>

              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <Navigation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <div className="mt-8 flex justify-between">
            {/* Left side: Education and Current Position stacked vertically */}
            <div className="w-2/5 space-y-6">
              <EducationCard />
            </div>

            {/* Right side: Navigation taking full available space */}
            <div className="w-full ml-8">{renderPage()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
