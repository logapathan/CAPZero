import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateContest from './CreateContest';  // Adjust the import path as necessary
import { Card, CardContent } from "@/components/ui/card";  // Assuming you have your components set up
import RegistrationForm from './RegistrationForm';
import Profile from './Profile'
import ContestPage from './ContestPage';
import Box from './Box';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path='/' element={<ContestPage />} />
        
        {/* Create Contest Route */}
        <Route path="/contests" element={<CreateContest />} />
        
        {/* Other routes can go here */}
        <Route path="/k" element={<Profile />} />
        <Route path='/l' element={<RegistrationForm />} />
        <Route path = "/n" element={<Box />} />
        
      </Routes>
    </Router>
  );
};

// Home page component as an example
export default App;
