import React, { useState } from 'react';

const SuggestionSection = () => {
  const suggestions = [
    { name: 'Jane Doe', college: 'ABC University', designation: 'UI/UX Designer', image: 'https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' },
    { name: 'Alex Smith', college: 'XYZ University', designation: 'Data Scientist', image: 'https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' },
    { name: 'Maria Garcia', college: 'LMN University', designation: 'Backend Developer', image: 'https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' },
    { name: 'John Doe', college: 'PQR University', designation: 'Frontend Developer', image: 'https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' },
    { name: 'Emily Clark', college: 'TUV University', designation: 'Project Manager', image: 'https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - 1, 0));
  };

  const handleNext = () => {
    setStartIndex(Math.min(startIndex + 1, suggestions.length - 4)); // limit to 4 cards
  };

  const visibleSuggestions = suggestions.slice(startIndex, startIndex + 4);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Suggestions</h2>
      
      {/* Card container */}
      <div className="flex gap-4 overflow-hidden">
        {visibleSuggestions.map((person, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="border p-4 rounded-lg shadow-lg">
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
              <h3 className="text-center text-gray-800 font-semibold mt-2">{person.name}</h3>
              <p className="text-center text-gray-600">{person.college}</p>
              <p className="text-center text-gray-600">{person.designation}</p>
              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg">Connect</button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow buttons */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePrev} 
          className="bg-gray-300 text-gray-800 p-2 rounded-full hover:bg-gray-400 disabled:opacity-50"
          disabled={startIndex === 0}
        >
          &#8592; Prev
        </button>
        <button 
          onClick={handleNext} 
          className="bg-gray-300 text-gray-800 p-2 rounded-full hover:bg-gray-400 disabled:opacity-50"
          disabled={startIndex >= suggestions.length - 4}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default SuggestionSection;
