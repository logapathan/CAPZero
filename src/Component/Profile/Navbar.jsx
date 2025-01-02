import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M12 2L2 7l5 4v5h6v-5l5-4L12 2z" />
        </svg>
        <span className="text-white text-lg font-semibold">Your App</span>
      </div>
      <nav className="flex items-center space-x-6 mx-auto">
        <a href="/" className="text-white hover:text-gray-400 hover:underline">
          Home
        </a>
        <div className="relative group">
          <a className="text-white hover:text-gray-400 hover:underline">Contest</a>
          <div className="absolute left-0 hidden group-hover:flex bg-white shadow-md rounded p-2 space-x-4">
            <a
              href="/join"
              className="px-4 py-2 text-blue-600 hover:bg-blue-100 rounded"
            >
              Join
            </a>
            <a
              href="/view-contests"
              className="px-4 py-2 text-blue-600 hover:bg-blue-100 rounded "
            >
              View Contests
            </a>
          </div>
        </div>

        <a href="/settings" className="text-white hover:text-gray-400 hover:underline">
          Settings
        </a>
      </nav>
    </header>
  );
};

export default Header;
