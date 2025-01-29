import { useState } from "react"
import Header from "./pages/Header"
import Overview from "./pages/Overview"
import Contests from "./pages/Contests"
import Practice from "./pages/Practice"
import Projects from "./pages/Projects"
import Achievements from "./pages/Achievements"

function App() {
  const [currentPage, setCurrentPage] = useState("overview")

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />
      case "contests":
        return <Contests />
      case "practice":
        return <Practice />
      case "projects":
        return <Projects />
      case "achievements":
        return <Achievements />
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <nav className="bg-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => setCurrentPage("overview")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentPage("contests")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                Contests
              </button>
              <button
                onClick={() => setCurrentPage("practice")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                Practice
              </button>
              <button
                onClick={() => setCurrentPage("projects")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                Projects
              </button>
              <button
                onClick={() => setCurrentPage("achievements")}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                Achievements
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{renderPage()}</main>
    </div>
  )
}

export default App

