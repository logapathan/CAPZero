import { GlobeIcon, LinkedinIcon, GithubIcon } from "lucide-react"

function HeaderContest() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-24 w-24 rounded-full"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-29%20191023-OE1BYA9y8ta6ag62WCuRsKmNL9IogI.png"
              alt="Alex Johnson"
            />
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">Alex Johnson</h1>
              <p className="text-gray-600">Mechanical Engineering student passionate about CAD design and automation</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <GlobeIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <GithubIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderContest

