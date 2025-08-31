import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../lib/auth";
import EcoBackground from "../components/EcoBackground";
import LeafParticles from "../components/Leaderboard/LeafParticles";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp(formData.email, formData.password, formData.name);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-1 xs:px-2 sm:px-4 lg:px-8 overflow-y-auto">
      <EcoBackground />
      <LeafParticles />
      <div className="max-w-md w-full space-y-4 xs:space-y-6 sm:space-y-8 py-2 xs:py-4">
        <div className="text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-1 xs:mb-2">
            Join Greenify
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-gray-600">
            Start your journey to a greener future
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl shadow-xl p-4 xs:p-6 sm:p-8 border border-white/20">
          <form
            className="space-y-3 xs:space-y-4 sm:space-y-6"
            onSubmit={handleEmailSignup}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 rounded-lg xs:rounded-xl flex items-center text-xs xs:text-sm">
                <svg
                  className="w-4 h-4 xs:w-5 xs:h-5 mr-1 xs:mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm xs:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm xs:text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm xs:text-base"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 xs:px-3 xs:py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm xs:text-base"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 rounded-lg xs:rounded-xl text-sm xs:text-base sm:text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 xs:mr-3 h-4 w-4 xs:h-5 xs:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </form>

          <div className="mt-3 xs:mt-4 sm:mt-6 text-center">
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium transition-colors duration-300 text-xs xs:text-sm sm:text-base"
            >
              Already have an account?{" "}
              <span className="underline">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
