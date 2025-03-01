import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Timer } from "lucide-react";
import axios from "axios";

const PracticePage = () => {
  // State management
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [scale, setScale] = useState(1);
  const [stlFile, setStlFile] = useState(null);
  const [stlAnalysis, setStlAnalysis] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [feedback, setFeedback] = useState(null);

  // Refs
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  // Fetch question when component mounts or question ID changes
  useEffect(() => {
    fetchQuestion(currentQuestionId);
  }, [currentQuestionId]);

  // Timer effect
  useEffect(() => {
    if (isActive && currentQuestion && timer < currentQuestion.timelimit) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          // Auto-submit when time limit is reached
          if (prev + 1 >= currentQuestion.timelimit) {
            handleTimeUp();
            return currentQuestion.timelimit;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timer, currentQuestion]);
  useEffect(() => {
    if (currentQuestion && timer > 0) {
      localStorage.setItem(
        `question_timer_${currentQuestion.id}`,
        timer.toString()
      );
    }
  }, [timer, currentQuestion]);

  // Fetch question from API
  const fetchQuestion = async (questionId) => {
    try {
      setLoading(true);

      // Reset states for new question
      setAnswer("");
      setStlFile(null);
      setStlAnalysis(null);
      setFeedback(null);
      setScale(1);

      const response = await axios.get(
        `${"http://localhost:3000"}/fetchquestion/${questionId}`
      );

      setCurrentQuestion(response.data);

      // Check if we have a saved timer value for this question
      const savedTimer = localStorage.getItem(
        `question_timer_${response.data.id}`
      );
      if (savedTimer) {
        const timerValue = parseInt(savedTimer, 10);
        // Make sure we don't set a timer value higher than the time limit
        if (response.data.timelimit && timerValue < response.data.timelimit) {
          setTimer(timerValue);
        } else {
          // If timer exceeds time limit or is invalid, reset it
          setTimer(0);
          localStorage.removeItem(`question_timer_${response.data.id}`);
        }
      } else {
        setTimer(0);
      }

      setIsActive(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching question:", error);
      setLoading(false);
      // Handle error state - show message to user
      setFeedback({
        type: "error",
        message: "Failed to load question. Please try again.",
      });
    }
  };

  // Handle time up event
  const handleTimeUp = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    handleSubmit(true);
  };

  // STL file parsing and analysis
  const parseSTLFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target.result;
      const view = new DataView(buffer);
      const triangles = (buffer.byteLength - 84) / 50;

      let meshData = {
        triangleCount: triangles,
        vertices: [],
        normals: [],
      };

      let offset = 84;

      for (let i = 0; i < triangles; i++) {
        const nx = view.getFloat32(offset, true);
        const ny = view.getFloat32(offset + 4, true);
        const nz = view.getFloat32(offset + 8, true);
        meshData.normals.push([nx, ny, nz]);

        for (let j = 0; j < 3; j++) {
          const x = view.getFloat32(offset + 12 + j * 12, true);
          const y = view.getFloat32(offset + 16 + j * 12, true);
          const z = view.getFloat32(offset + 20 + j * 12, true);
          meshData.vertices.push([x, y, z]);
        }

        offset += 50;
      }

      const analysis = {
        volume: calculateVolume(meshData.vertices),
        surfaceArea: calculateSurfaceArea(meshData.vertices, meshData.normals),
        centerOfMass: calculateCenterOfMass(meshData.vertices),
        triangleCount: meshData.triangleCount,
        vertexCount: meshData.vertices.length,
      };

      setStlAnalysis(analysis);
    };
    reader.readAsArrayBuffer(file);
  };

  const calculateSurfaceArea = (vertices, normals) => {
    let totalArea = 0;
    for (let i = 0; i < vertices.length; i += 3) {
      // Calculate area of each triangle using cross product
      const v1 = vertices[i];
      const v2 = vertices[i + 1];
      const v3 = vertices[i + 2];

      const vec1 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
      const vec2 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];

      // Cross product
      const cross = [
        vec1[1] * vec2[2] - vec1[2] * vec2[1],
        vec1[2] * vec2[0] - vec1[0] * vec2[2],
        vec1[0] * vec2[1] - vec1[1] * vec2[0],
      ];

      // Area = 1/2 * magnitude of cross product
      const area =
        Math.sqrt(
          cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2]
        ) / 2;

      totalArea += area;
    }
    return totalArea;
  };

  const calculateCenterOfMass = (vertices) => {
    let totalX = 0,
      totalY = 0,
      totalZ = 0;
    const vertexCount = vertices.length;

    vertices.forEach((vertex) => {
      totalX += vertex[0];
      totalY += vertex[1];
      totalZ += vertex[2];
    });

    return {
      x: totalX / vertexCount,
      y: totalY / vertexCount,
      z: totalZ / vertexCount,
    };
  };

  const calculateVolume = (vertices) => {
    let volume = 0;
    // Calculate volume using signed tetrahedra method
    for (let i = 0; i < vertices.length; i += 3) {
      const v1 = vertices[i];
      const v2 = vertices[i + 1];
      const v3 = vertices[i + 2];

      volume +=
        (v1[0] * (v2[1] * v3[2] - v2[2] * v3[1]) +
          v1[1] * (v2[2] * v3[0] - v2[0] * v3[2]) +
          v1[2] * (v2[0] * v3[1] - v2[1] * v3[0])) /
        6.0;
    }
    return Math.abs(volume);
  };

  // Handle form submission
  const handleSubmit = async (timeExpired = false) => {
    if (!currentQuestion) return;

    setIsActive(false);
    clearInterval(timerRef.current);

    // Clear saved timer when submitting
    if (currentQuestion.id) {
      localStorage.removeItem(`question_timer_${currentQuestion.id}`);
    }

    const isCorrect =
      answer.toLowerCase() === currentQuestion.answer.toLowerCase();

    try {
      // Prepare attempt data
      const attempt = {
        questionId: currentQuestion.id,
        answer: answer,
        stlAnalysis: stlAnalysis,
        timeTaken: timer,
        isCorrect: isCorrect,
        timeExpired: timeExpired,
      };

      // Save attempt to database
      await axios.post(`${"http://localhost:3000"}/api/attempts`, attempt);

      // Set feedback based on result
      setFeedback({
        type: isCorrect ? "success" : "error",
        message: timeExpired
          ? "Time's up! Your answer was " +
            (isCorrect ? "correct!" : "incorrect.")
          : isCorrect
          ? "Correct answer! Well done."
          : "Incorrect answer. Try again.",
      });
    } catch (error) {
      console.error("Error saving attempt:", error);
      setFeedback({
        type: "error",
        message: "Error saving your answer. Please try again.",
      });
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate time remaining and set color
  const getTimeDisplay = () => {
    if (!currentQuestion) return { time: "0:00", color: "text-gray-600" };

    const timeRemaining = currentQuestion.timelimit - timer;
    let color = "text-green-600";

    if (timeRemaining <= 60) color = "text-red-600";
    else if (timeRemaining <= 120) color = "text-yellow-600";

    return {
      time: formatTime(timeRemaining),
      color,
    };
  };

  // Get next question
  const handleNextQuestion = () => {
    setCurrentQuestionId((prevId) => prevId + 1);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Main render
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header section */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Practice Question {currentQuestion?.quesitonid}
        </h2>
        <div className={`flex items-center gap-2 ${getTimeDisplay().color}`}>
          <Timer className="w-5 h-5" />
          <span className="font-mono font-medium">{getTimeDisplay().time}</span>
        </div>
      </div>

      {/* Question content section */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        {/* Question text */}
        <div className="p-4 bg-blue-50 border-b">
          <h3 className="text-lg font-medium mb-2">Question:</h3>
          <p className="text-gray-800">
            {currentQuestion?.question || "No question text available"}
          </p>
        </div>

        {/* Question image */}
        {currentQuestion?.questionurl && (
          <div className="p-4 relative">
            <div className="relative inline-block max-w-full">
              <img
                src={currentQuestion.questionurl}
                alt={`Question ${currentQuestion.questionid} illustration`}
                className="max-w-full max-h-96 object-contain transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
              />
              <div className="absolute top-2 right-2 flex gap-2 bg-white/80 p-2 rounded-lg shadow-sm">
                <button
                  onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setScale(1)}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Additional details/hints if available */}
        {currentQuestion?.hint && (
          <div className="p-4 bg-yellow-50 border-t">
            <h4 className="font-medium text-yellow-800">Hint:</h4>
            <p className="text-yellow-700">{currentQuestion.hint}</p>
          </div>
        )}
      </div>

      {/* Answer input */}
      <div className="mb-6">
        <label htmlFor="answer-input" className="block mb-2 font-medium">
          Your Answer:
        </label>
        <input
          id="answer-input"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your answer..."
          disabled={!isActive}
        />
      </div>

      {/* STL file upload section */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Upload STL File (optional):
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.name.toLowerCase().endsWith(".stl")) {
              setStlFile(file);
              parseSTLFile(file);
            } else if (file) {
              setFeedback({
                type: "error",
                message: "Please upload a valid STL file",
              });
            }
          }}
          accept=".stl"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={!isActive}
        />
      </div>

      {/* STL analysis results */}
      {stlAnalysis && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">STL Analysis Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Geometry:</h4>
              <ul className="space-y-1">
                <li>Volume: {stlAnalysis.volume.toFixed(2)} cubic units</li>
                <li>
                  Surface Area: {stlAnalysis.surfaceArea.toFixed(2)} square
                  units
                </li>
                <li>Triangle Count: {stlAnalysis.triangleCount}</li>
                <li>Vertex Count: {stlAnalysis.vertexCount}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Center of Mass:</h4>
              <ul className="space-y-1">
                <li>X: {stlAnalysis.centerOfMass.x.toFixed(3)}</li>
                <li>Y: {stlAnalysis.centerOfMass.y.toFixed(3)}</li>
                <li>Z: {stlAnalysis.centerOfMass.z.toFixed(3)}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Feedback display */}
      {feedback && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            feedback.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-medium">{feedback.message}</p>
          {feedback.type === "success" && (
            <button
              className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      )}

      {/* Submit button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => handleSubmit(false)}
        disabled={!isActive}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default PracticePage;
