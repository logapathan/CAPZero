import React, { useState, useEffect } from 'react';

const ContestPage = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-01-01T20:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full max-w-4xl bg-yellow-300 p-8 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Compete</h1>
        <p className="text-gray-800 mt-2">
          Show off your skills and solve programming problems! Compete to win prizes.
        </p>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contest Divisions */}
        <section className="col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Contest Divisions</h2>
          <p className="text-gray-700 mb-6">
            Participate in the contest based on your rating:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Div-1', rating: '>= 2000' },
              { name: 'Div-2', rating: '>= 1600 and <= 1999' },
              { name: 'Div-3', rating: '>= 1400 and <= 1599' },
              { name: 'Div-4', rating: '<= 1399' },
            ].map((div, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-center"
              >
                <span className="font-semibold text-gray-800">{div.name}</span>
                <br />
                <span className="text-sm text-gray-600">Rating: {div.rating}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Countdown Timer */}
        <section className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Contest Starts In:</h2>
          <p className="text-3xl font-mono font-semibold text-blue-600">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition">
            Remind Me!
          </button>
        </section>
      </div>

      {/* About Section */}
      <div className="w-full max-w-4xl mt-8">
        <section className="bg-blue-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">About CodeChef Starters</h2>
          <p className="text-gray-700 mb-4">
            CodeChef Starters is a short programming contest held every Wednesday. This contest is
            designed to help you improve your problem-solving skills and compete with the best minds
            around the world.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Duration: 2 hours</li>
            <li>Start Date: Wednesday, 1st January, 2025 at 20:00 HRS (IST)</li>
            <li>End Date: Wednesday, 1st January, 2025 at 22:00 HRS (IST)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ContestPage;
