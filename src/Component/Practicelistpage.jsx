import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Briefcase,
  Calendar,
  Award,
  Star,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const PracticeModulesList = () => {
  // State management
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrgs, setExpandedOrgs] = useState({});

  // Filter states
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Pagination
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch modules and organizations
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, these would be API calls
        const modulesResponse = await fetchModules();
        const orgsResponse = await fetchOrganizations();

        setModules(modulesResponse);
        setFilteredModules(modulesResponse);
        setOrganizations(orgsResponse);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(modulesResponse.flatMap((module) => module.categories)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    selectedOrganizations,
    selectedCategories,
    selectedDifficulty,
  ]);

  // Mock data fetching functions (replace with actual API calls)
  const fetchModules = async () => {
    // Simulating API response
    return [
      {
        id: 1,
        title: "Engineering Mechanics",
        description: "Comprehensive practice for statics and dynamics concepts",
        organization: "MIT OpenCourseWare",
        organizationId: 1,
        categories: ["Engineering", "Physics"],
        difficulty: "intermediate",
        questionCount: 45,
        completionRate: 78,
        rating: 4.7,
        lastUpdated: "2024-12-15",
      },
      {
        id: 2,
        title: "Data Structures & Algorithms",
        description:
          "Practice problems on arrays, linked lists, trees, and graph algorithms",
        organization: "Stanford Online",
        organizationId: 2,
        categories: ["Computer Science", "Programming"],
        difficulty: "advanced",
        questionCount: 120,
        completionRate: 62,
        rating: 4.9,
        lastUpdated: "2025-01-20",
      },
      {
        id: 3,
        title: "Machine Learning Fundamentals",
        description:
          "Practical exercises covering regression, classification, and neural networks",
        organization: "Google AI",
        organizationId: 3,
        categories: ["Computer Science", "Artificial Intelligence"],
        difficulty: "advanced",
        questionCount: 85,
        completionRate: 55,
        rating: 4.8,
        lastUpdated: "2025-02-05",
      },
      {
        id: 4,
        title: "Thermodynamics",
        description:
          "Practice problems on thermodynamic cycles, heat transfer, and energy conversion",
        organization: "MIT OpenCourseWare",
        organizationId: 1,
        categories: ["Engineering", "Physics"],
        difficulty: "intermediate",
        questionCount: 60,
        completionRate: 71,
        rating: 4.6,
        lastUpdated: "2024-11-10",
      },
      {
        id: 5,
        title: "Calculus I",
        description:
          "Comprehensive exercises on limits, derivatives, and integrals",
        organization: "Khan Academy",
        organizationId: 4,
        categories: ["Mathematics"],
        difficulty: "beginner",
        questionCount: 95,
        completionRate: 85,
        rating: 4.5,
        lastUpdated: "2024-10-27",
      },
      {
        id: 6,
        title: "Web Development Basics",
        description: "Hands-on exercises for HTML, CSS, and JavaScript",
        organization: "FreeCodeCamp",
        organizationId: 5,
        categories: ["Programming", "Web Development"],
        difficulty: "beginner",
        questionCount: 110,
        completionRate: 92,
        rating: 4.7,
        lastUpdated: "2025-01-15",
      },
      {
        id: 7,
        title: "Mechanics of Materials",
        description: "Practice on stress, strain, and material properties",
        organization: "Stanford Online",
        organizationId: 2,
        categories: ["Engineering", "Materials Science"],
        difficulty: "intermediate",
        questionCount: 55,
        completionRate: 68,
        rating: 4.4,
        lastUpdated: "2024-12-03",
      },
    ];
  };

  const fetchOrganizations = async () => {
    // Simulating API response
    return [
      { id: 1, name: "MIT OpenCourseWare", moduleCount: 24, logo: "mit.svg" },
      { id: 2, name: "Stanford Online", moduleCount: 18, logo: "stanford.svg" },
      { id: 3, name: "Google AI", moduleCount: 12, logo: "google.svg" },
      { id: 4, name: "Khan Academy", moduleCount: 35, logo: "khan.svg" },
      {
        id: 5,
        name: "FreeCodeCamp",
        moduleCount: 28,
        logo: "freecodecamp.svg",
      },
    ];
  };

  const applyFilters = () => {
    let result = [...modules];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (module) =>
          module.title.toLowerCase().includes(searchLower) ||
          module.description.toLowerCase().includes(searchLower) ||
          module.organization.toLowerCase().includes(searchLower)
      );
    }

    // Apply organization filter
    if (selectedOrganizations.length > 0) {
      result = result.filter((module) =>
        selectedOrganizations.includes(module.organizationId)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((module) =>
        module.categories.some((category) =>
          selectedCategories.includes(category)
        )
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      result = result.filter(
        (module) => module.difficulty === selectedDifficulty
      );
    }

    setFilteredModules(result);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const toggleOrganizationExpand = (orgId) => {
    setExpandedOrgs((prev) => ({
      ...prev,
      [orgId]: !prev[orgId],
    }));
  };

  const toggleOrganizationFilter = (orgId) => {
    setSelectedOrganizations((prev) =>
      prev.includes(orgId)
        ? prev.filter((id) => id !== orgId)
        : [...prev, orgId]
    );
  };

  const toggleCategoryFilter = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Practice Modules</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          {/* Search box */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Organizations filter */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
              Organizations
            </h2>
            <ul className="space-y-2">
              {organizations.map((org) => (
                <li key={org.id} className="text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`org-${org.id}`}
                        checked={selectedOrganizations.includes(org.id)}
                        onChange={() => toggleOrganizationFilter(org.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`org-${org.id}`}
                        className="ml-2 text-gray-700"
                      >
                        {org.name}{" "}
                        <span className="text-gray-500">
                          ({org.moduleCount})
                        </span>
                      </label>
                    </div>
                    <button
                      onClick={() => toggleOrganizationExpand(org.id)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      {expandedOrgs[org.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {expandedOrgs[org.id] && (
                    <div className="pl-6 mt-2 space-y-1">
                      {modules
                        .filter((module) => module.organizationId === org.id)
                        .slice(0, 3) // Show only first 3
                        .map((module) => (
                          <div
                            key={module.id}
                            className="text-sm text-gray-600"
                          >
                            • {module.title}
                          </div>
                        ))}
                      {modules.filter(
                        (module) => module.organizationId === org.id
                      ).length > 3 && (
                        <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                          +{" "}
                          {modules.filter(
                            (module) => module.organizationId === org.id
                          ).length - 3}{" "}
                          more modules
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories filter */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`cat-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategoryFilter(category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`cat-${category}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Difficulty filter */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Difficulty
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="diff-all"
                  name="difficulty"
                  value="all"
                  checked={selectedDifficulty === "all"}
                  onChange={() => setSelectedDifficulty("all")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="diff-all"
                  className="ml-2 text-sm text-gray-700"
                >
                  All Levels
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="diff-beginner"
                  name="difficulty"
                  value="beginner"
                  checked={selectedDifficulty === "beginner"}
                  onChange={() => setSelectedDifficulty("beginner")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="diff-beginner"
                  className="ml-2 text-sm text-gray-700"
                >
                  Beginner
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="diff-intermediate"
                  name="difficulty"
                  value="intermediate"
                  checked={selectedDifficulty === "intermediate"}
                  onChange={() => setSelectedDifficulty("intermediate")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="diff-intermediate"
                  className="ml-2 text-sm text-gray-700"
                >
                  Intermediate
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="diff-advanced"
                  name="difficulty"
                  value="advanced"
                  checked={selectedDifficulty === "advanced"}
                  onChange={() => setSelectedDifficulty("advanced")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="diff-advanced"
                  className="ml-2 text-sm text-gray-700"
                >
                  Advanced
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/4">
          {/* Filter summary */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-gray-700 flex items-center">
              <Filter className="h-4 w-4 mr-1" /> Filters:
            </span>

            {selectedOrganizations.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedOrganizations.length} Organizations
                <button
                  onClick={() => setSelectedOrganizations([])}
                  className="ml-1 text-blue-500 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}

            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {cat}
                <button
                  onClick={() => toggleCategoryFilter(cat)}
                  className="ml-1 text-purple-500 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}

            {selectedDifficulty !== "all" && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                  selectedDifficulty
                )}`}
              >
                {selectedDifficulty.charAt(0).toUpperCase() +
                  selectedDifficulty.slice(1)}
                <button
                  onClick={() => setSelectedDifficulty("all")}
                  className="ml-1 text-gray-500 hover:text-gray-800"
                >
                  ×
                </button>
              </span>
            )}

            {(selectedOrganizations.length > 0 ||
              selectedCategories.length > 0 ||
              selectedDifficulty !== "all") && (
              <button
                onClick={() => {
                  setSelectedOrganizations([]);
                  setSelectedCategories([]);
                  setSelectedDifficulty("all");
                  setSearchTerm("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredModules.length}{" "}
              {filteredModules.length === 1 ? "module" : "modules"}
            </p>
          </div>

          {/* Module cards */}
          {currentItems.length > 0 ? (
            <div className="space-y-4">
              {currentItems.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          By {module.organization}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                          module.difficulty
                        )}`}
                      >
                        {module.difficulty.charAt(0).toUpperCase() +
                          module.difficulty.slice(1)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{module.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {module.categories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Questions</p>
                        <p className="font-medium">{module.questionCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Completion</p>
                        <p className="font-medium">{module.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rating</p>
                        <p className="font-medium flex items-center">
                          {module.rating}
                          <Star
                            className="h-4 w-4 text-yellow-400 ml-1 inline"
                            fill="currentColor"
                          />
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Updated</p>
                        <p className="font-medium">
                          {new Date(module.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <button
                        onClick={() => {
                          // Navigate to practice module
                          const apiInput = {
                            questionid: 1, // Start with first question
                            moduleId: module.id,
                            moduleName: module.title,
                            organization: module.organization,
                            timelimit: 500, // Default time limit
                          };

                          // Store selected module in session storage
                          sessionStorage.setItem(
                            "currentApiInput",
                            JSON.stringify(apiInput)
                          );

                          // Navigate to practice page (replace with your routing logic)
                          window.location.href = `/practice`;
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start Practice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                <Search className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No modules found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredModules.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg shadow">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  disabled={currentPage === totalPages}
                  className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredModules.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredModules.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronRight
                        className="h-5 w-5 transform rotate-180"
                        aria-hidden="true"
                      />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            page === currentPage
                              ? "bg-blue-600 text-white focus:z-20"
                              : "text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        )
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeModulesList;
