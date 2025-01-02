import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateContest from './Component/CreateContest';  // Adjust the import path as necessary
import { Card, CardContent } from "@/components/ui/card";  // Assuming you have your components set up
import RegistrationForm from './Component/RegistrationForm';
import Profile from './Component/Profile/Profile';
import ContestPage from './Component/ContestPage';
import Contest from './Component/Contest';

import ViewContest from './Component/ViewContest';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path='/' element={<ContestPage />} />
        
        {/* Create Contest Route */}
        <Route path="/contests" element={<div className='w-full max-w-3xl mx-auto'><CreateContest /> </div>} />
        
        {/* Other routes can go here */}
        <Route path="/profile" element={<Profile />} />
        <Route path='/l' element={<RegistrationForm />} />
        <Route path = "/n" element={<ViewContest />} />
       
        
      </Routes>
    </Router>
  );
};

export default App;
