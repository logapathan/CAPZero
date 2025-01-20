import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, CircleUserRound, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="relative bg-gradient-to-br from-indigo-500 via-blue-500 to-teal-500 text-white py-8">
      {/* Background Gradient */}
      <div className="absolute bg-gradient-to-br from-indigo-400 via-blue-300 to-teal-200 opacity-30 animate-pulse"></div>

      <div className="container mx-auto flex items-center px-8 relative z-10">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="/path/to/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-blue-800">CAPZERO</h1>
        </div>
{/* Navigation Links - Right-Aligned */}
<nav className="flex items-center space-x-12 text-lg font-medium text-white ml-auto mr-8">
  <a href="#learning" className="text-white hover:text-blue-800">Contest</a>
  <a href="#learning" className="text-white hover:text-blue-800">Learning</a>
  <a href="#community" className="text-white hover:text-blue-800">Community</a>
  <a href="#practice" className="text-white hover:text-blue-800">Practice</a>
  <a href="#contact" className="text-white hover:text-blue-800">Contact</a>
</nav>

{/* Icons Section */}
<div className="flex items-center space-x-6">
  <button className="text-black bg-transparent hover:text-blue-800">
    <Bell className="w-8 h-8" />
  </button>
  <button className="text-black bg-transparent hover:text-blue-800 border-2 border-black rounded-full p-3">
    <User className="w-8 h-8" />
  </button>
  <button className="text-white hover:text-gray-200 md:hidden" aria-label="Open Menu">
    <Menu className="h-6 w-6" />
  </button>
</div>

      </div>

      {/* Hero Section */}
      <div className="text-center mt-4">
        <motion.h2
          className="text-5xl font-bold text-white mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.5 }}
        >
          Design Your Future
        </motion.h2>
        <motion.p
          className="text-2xl text-gray-200 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 1 }}
        >
          Unleash your creativity and solve exciting challenges with CAPZERO. Join now!
        </motion.p>
        <motion.button
          onClick={() => handleNavigation('/contests')}
          className="bg-teal-600 text-white py-3 px-8 rounded-full text-lg font-semibold transform hover:scale-105 transition-all hover:bg-teal-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
        >
          Explore Contests
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
