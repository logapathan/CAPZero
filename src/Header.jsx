import { Trophy, Star, Rocket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';  // for navigation links

const Header = () => (
  <header className="bg-gradient-to-br from-blue-500 to-purple-500 py-12">
    <div className="container mx-auto text-center text-white">
      <h1 className="text-5xl font-bold mb-4 tracking-wider">
        <span className="inline-block bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg transform rotate-6">
          CAP
        </span>
        <span className="inline-block bg-yellow-400 text-purple-800 px-4 py-2 rounded-full shadow-lg transform -rotate-6 ml-2">
          ZERO
        </span>
      </h1>
      <p className="text-lg max-w-2xl mx-auto font-medium">
        Empowering Innovators Worldwide – Compete, Create, and Celebrate Innovation!
      </p>

      {/* Navigation Bar */}
      <nav className="mt-6">
        <div className="flex justify-center gap-8">
          <Link to="/profile" className="text-white hover:text-yellow-400">
            Profile
          </Link>
          <Link to="/settings" className="text-white hover:text-yellow-400">
            Settings
          </Link>
        </div>
      </nav>

      <div className="flex justify-center gap-6 mt-6">
        <div className="flex flex-col items-center">
          <Trophy className="w-10 h-10 text-yellow-300" />
          <span className="text-sm">Win Prizes</span>
        </div>
        <div className="flex flex-col items-center">
          <Rocket className="w-10 h-10 text-blue-200" />
          <span className="text-sm">Launch Challenges</span>
        </div>
        <div className="flex flex-col items-center">
          <Users className="w-10 h-10 text-green-300" />
          <span className="text-sm">Collaborate</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="w-10 h-10 text-yellow-500" />
          <span className="text-sm">Showcase Talent</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
