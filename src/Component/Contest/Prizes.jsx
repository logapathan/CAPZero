import React from "react";

const Prizes = ({ prizes }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Prizes</h2>
      <ul className="list-none space-y-4">
        <li>
          <span className="text-lg font-bold">🥇 First Prize:</span> {prizes.first.points} points, Badge: {prizes.first.badge}
        </li>
        <li>
          <span className="text-lg font-bold">🥈 Second Prize:</span> {prizes.second.points} points, Badge: {prizes.second.badge}
        </li>
        <li>
          <span className="text-lg font-bold">🥉 Third Prize:</span> {prizes.third.points} points, Badge: {prizes.third.badge}
        </li>
      </ul>
    </div>
  );
};

export default Prizes;
