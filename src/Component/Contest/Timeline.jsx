import React from "react";

const Timeline = ({ timeline }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
      <div className="space-y-4">
        {timeline.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <span>{item.label}</span>
            <span>{item.date}</span>
            <span className={`px-3 py-1 rounded ${item.status === "completed" ? "bg-green-500 text-white" : "bg-gray-300"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
