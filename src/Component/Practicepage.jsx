import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Timer } from "lucide-react";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [scale, setScale] = useState(1);
  const [stlFile, setStlFile] = useState(null);
  const [stlAnalysis, setStlAnalysis] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Fetch first question
    fetchQuestion(1);
  }, []);

  useEffect(() => {
    if (isActive && timer < currentQuestion?.timeLimit) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timer, currentQuestion]);

  const fetchQuestion = async (questionId) => {
    try {
      // Simulated API call
      const question = {
        id: 1,
        imageUrl:
          "C:/logapathan/projects/capZero/Server-side/demon_slayer_keycjhain.png",
        answer: "example answer",
        timeLimit: 300, // 5 minutes
      };
      setCurrentQuestion(question);
      setIsActive(true);
      setTimer(0);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
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

  const handleSubmit = async () => {
    setIsActive(false);
    clearInterval(timerRef.current);

    const isCorrect =
      answer.toLowerCase() === currentQuestion.answer.toLowerCase();

    try {
      // Simulated API call to save attempt
      const attempt = {
        questionId: currentQuestion.id,
        answer: answer,
        stlAnalysis: stlAnalysis,
        timeTaken: timer,
        isCorrect: isCorrect,
      };

      // Save attempt to database
      // await saveAttempt(attempt);

      if (isCorrect) {
        alert("Correct answer! Moving to next question...");
        fetchQuestion(currentQuestion.id + 1);
      } else {
        alert("Incorrect answer. Try again.");
      }
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Question {currentQuestion.id}</h2>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          <span className="font-mono">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="mb-8 relative">
        <div className="relative inline-block">
          <img
            src={currentQuestion.imageUrl}
            alt={`Question ${currentQuestion.id}`}
            className="max-w-full transition-transform duration-200"
            style={{ transform: `scale(${scale})` }}
          />
          <div className="absolute top-2 right-2 flex gap-2 bg-white/80 p-2 rounded-lg">
            <button
              onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale(1)}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Your Answer:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your answer..."
        />
      </div>

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
            } else {
              alert("Please upload an STL file");
            }
          }}
          accept=".stl"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {stlAnalysis && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">STL Analysis Results:</h3>
          <div className="grid grid-cols-2 gap-4">
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

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuizPage;
