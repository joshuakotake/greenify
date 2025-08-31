import { Link } from "react-router";
import Typewriter from "typewriter-effect";
import LeafParticles from "../components/Leaderboard/LeafParticles";
import EcoBackground from "../components/EcoBackground";

const LandingPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 relative">
      <EcoBackground />
      <LeafParticles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center text-center min-h-screen">
          <h1 className="font-bold text-gray-900 text-6xl">
            Track Your
            <span className="text-green-600 ">
              <Typewriter
                options={{
                  strings: [
                    "Carbon Streaks",
                    "Green Points",
                    "CO2 Savings",
                    "Climate Wins",
                    "Planet Progress",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl">
            Join a community of eco-conscious individuals. Track your carbon
            savings, compete with friends, and make a positive impact on the
            planet.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
            <Link
              to="/register"
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/login"
              className="group relative bg-white hover:bg-gray-50 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-green-600 hover:border-green-700 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
            >
              <span className="flex items-center justify-center">
                Sign In
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
