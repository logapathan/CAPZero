import React from "react";

const Header = ({ data }) => {
  const { title, type, status, difficulty, hostInfo } = data;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex space-x-4 mt-2">
        <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded">{type}</span>
        <span className="text-sm bg-green-500 text-white px-3 py-1 rounded">{status}</span>
        <span className="text-sm bg-yellow-500 text-white px-3 py-1 rounded">{difficulty}</span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Hosted by: {hostInfo.name}</h3>
        <button className="text-blue-500 underline mt-2">
          {hostInfo.followStatus ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default Header;
