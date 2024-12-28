import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(""); // For signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignup ? "http://localhost:3000/api/signup" : "http://localhost:3000/api/login";
    const payload = isSignup ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(endpoint, payload);
      setLoading(false);
      alert(`${isSignup ? "Signup" : "Login"} successful!`);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <motion.div
        className="w-full max-w-md bg-white shadow-md rounded px-8 py-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {error && (
          <motion.div
            className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isSignup && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="John Doe"
                required
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="you@example.com"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="••••••••"
              required
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading
              ? `${isSignup ? "Signing Up..." : "Logging In..."}`
              : `${isSignup ? "Sign Up" : "Login"}`}
          </motion.button>
        </form>
        <motion.p
          className="mt-6 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isSignup
            ? "Already have an account?"
            : "Don’t have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
