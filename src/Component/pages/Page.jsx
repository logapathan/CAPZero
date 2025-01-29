import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header"
import Overview from "./pages/Overview"
import Contests from "./pages/Contests"
import Practice from "./pages/Practice"
import Projects from "./pages/Projects"
import Achievements from "./pages/Achievements"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700">
                  Overview
                </Link>
                <Link
                  to="/contests"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Contests
                </Link>
                <Link
                  to="/practice"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Practice
                </Link>
                <Link
                  to="/projects"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Projects
                </Link>
                <Link
                  to="/achievements"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Achievements
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

