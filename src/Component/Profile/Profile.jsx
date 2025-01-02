import React from 'react';
import Header from '../Header';
import MainSection from './MainSection';
import SuggestionSection from './SuggestionSection';
import UserProfile from './UserProfile';
import Navbar from './Navbar'



const ProfilePage = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
     
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg mt-8 p-8 flex space-x-8">
        <div className="flex-1">
          <MainSection />
          <SuggestionSection />
          <UserProfile />
        </div>
        
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
