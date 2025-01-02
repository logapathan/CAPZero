import React from "react";

const Requirements = ({ requirements }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Requirements</h2>
      <ul className="list-disc pl-6 space-y-2">
        {requirements.map((req) => (
          <li key={req.id}>
            <span className="font-medium">{req.text}</span> - {req.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;
