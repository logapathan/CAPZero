import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleRequest = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });

    const data = await response.data;

    if (data.pass) {
      navigate("/contestpage");
    } else {
      setError({ value: true, message: data.message });
    }

    setEmail("");
    setPassword("");
  };
  const [error, setError] = useState({ value: false, message: "" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {error.value && (
          <div
            style={{
              color: "red",
              backgroundColor: "#ffe6e6",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              border: "1px solid red",
            }}
          >
            {error.message}
          </div>
        )}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In to your Account
        </h2>
        <form className="space-y-6" onSubmit={handleRequest}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              autoComplete="on"
              placeholder="Mail"
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              name="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                terms and conditions
              </a>
            </label>
          </div>
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Do not Have a Account?{""}
          <a
            href=""
            className="text-blue-500 underline"
            onClick={() => {
              navigate("/l");
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
