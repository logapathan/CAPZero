import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


const DataViewPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/contest/${id}`)
      .then(res => res.json())
      .then(data => setContest(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!contest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Form Data</h1>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">ID:</h2>
            <p>{contest.id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Title:</h2>
            <p>{contest.title}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Category:</h2>
            <p>{contest.category}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Type:</h2>
            <p>{contest.type}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Problem Statement:</h2>
            <p>{contest.problemStatement}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Constraint:</h2>
            <p>{contest.constraint}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Constraint Value:</h2>
            <p>{contest.constraintValue}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Material:</h2>
            <p>{contest.material}</p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold">Details:</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold">Start Date:</h3>
              <p>{contest.startDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Start Time:</h3>
              <p>{contest.startTime}</p>
            </div>
            <div>
              <h3 className="font-semibold">Duration:</h3>
              <p>{contest.duration}</p>
            </div>
            <div>
              <h3 className="font-semibold">Access:</h3>
              <p>{contest.access}</p>
            </div>
            <div>
              <h3 className="font-semibold">Max Participants:</h3>
              <p>{contest.maxParticipants}</p>
            </div>
            <div>
              <h3 className="font-semibold">Software Required:</h3>
              <p>{contest.softwareRequired}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description:</h3>
              <p>{contest.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataViewPage;
