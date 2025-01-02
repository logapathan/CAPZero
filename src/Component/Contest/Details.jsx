import React from "react";

const ContestDetails = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Contest Details</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Start Date:</strong> {data.startDate}</li>
        <li><strong>Start Time:</strong> {data.startTime}</li>
        <li><strong>Duration:</strong> {data.duration}</li>
        <li><strong>Registration Deadline:</strong> {data.registrationDeadline}</li>
        <li><strong>Software Required:</strong> {data.softwareRequired}</li>
        <li><strong>Minimum Specs:</strong> {data.minimumSpecs}</li>
        <li><strong>Description:</strong> {data.description}</li>
      </ul>
    </div>
  );
};

export default ContestDetails;
