import React, { Profiler } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateContest from "./Component/CreateContest"; // Adjust the import path as necessary
import { Card, CardContent } from "@/components/ui/card"; // Assuming you have your components set up
import RegistrationForm from "./Component/RegistrationForm";
import Profile from "./Component/Profile/Profile";
import ContestPage from "./Component/ContestPage";
import Contest from "./Component/Contest";

import ViewContest from "./Component/ViewContest";
import SignIn from "./Component/SignIn";
import Page from "./Component/Page";
import "./index.css";
import QuizPage from "./Component/practicepage";
import PracticeModulesList from "./Component/Practicelistpage";
import PracticePage from "./Component/practicepage";
import PracticePage1 from "./Component/Practicepage1";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<SignIn />} />
        <Route path="/Contestpage" element={<ContestPage />} />
        <Route path="/practicelist" element={<PracticeModulesList />} />

        <Route path="/view" element={<Contest />} />

        {/* Create Contest Route */}
        <Route path="/contest/:id" element={<Contest />} />
        <Route path="/contests" element={<CreateContest />} />

        {/* Other routes can go here */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/l" element={<RegistrationForm />} />
        <Route path="/n" element={<ViewContest />} />
        <Route path="/a" element={<Page />} />
        <Route path="/practice" element={<PracticePage1 />} />
      </Routes>
    </Router>
  );
};

export default App;
