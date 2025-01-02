import React, { useState } from "react";
import ContestHeader from "./Header";
import ContestDetails from "./Details";
import Timeline from "./Timeline";
import Requirements from "./Requirements";
import Prizes from "./Prizes";

const Contest = () => {
  const [contestData, setContestData] = useState({
    id: "cad-123",
    title: "Advanced Mechanical Component Design Challenge",
    type: "Race Against Time",
    status: "Upcoming",
    difficulty: "Intermediate",
    hostInfo: {
      name: "Autodesk & Engineering Solutions Ltd.",
      followStatus: false,
    },
    details: {
      startDate: "2025-01-15",
      startTime: "10:00 AM GMT",
      duration: "4 Hours",
      registrationDeadline: "2025-01-14",
      softwareRequired: "AutoCAD 2024",
      minimumSpecs: "8GB RAM, 4GB Graphics",
      description:
        "This race-against-time challenge tests your ability to quickly and accurately design mechanical components under pressure.",
    },
    timeline: [
      { id: 1, label: "Registration Opens", date: "2025-01-01", status: "completed" },
      { id: 2, label: "Registration Closes", date: "2025-01-14", status: "upcoming" },
      { id: 3, label: "Contest Start", date: "2025-01-15", status: "upcoming" },
      { id: 4, label: "Contest End", date: "2025-01-15", status: "upcoming" },
    ],
    requirements: [
      { id: 1, text: "AutoCAD 2024 installed", details: "Latest version required" },
      { id: 2, text: "Stable internet connection", details: "Minimum 5 Mbps" },
    ],
    prizes: {
      first: { points: 1000, badge: "Gold Designer" },
      second: { points: 750, badge: "Silver Designer" },
      third: { points: 500, badge: "Bronze Designer" },
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <ContestHeader data={contestData} />
        <ContestDetails data={contestData.details} />
        <Timeline timeline={contestData.timeline} />
        <Requirements requirements={contestData.requirements} />
        <Prizes prizes={contestData.prizes} />
      </div>
    </div>
  );
};

export default Contest;
