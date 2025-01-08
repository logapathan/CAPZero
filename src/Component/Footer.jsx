import React from 'react';
import { Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Social Media Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            {/* Replace the href with your links */}
            <a href="#" className="text-gray-600 hover:text-black">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Use Cases Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Use cases</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-black">UI design</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">UX design</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Wireframing</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Diagramming</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Brainstorming</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Online whiteboard</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Team collaboration</a></li>
          </ul>
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-black">Design</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Prototyping</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Development features</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Design systems</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Collaboration features</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Design process</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">FigJam</a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-black">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Best practices</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Colors</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Color wheel</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Support</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Developers</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Resource library</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
