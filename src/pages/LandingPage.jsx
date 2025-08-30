import { Link } from "react-router";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center min-h-screen py-12">
          <h1 className="font-bold text-gray-900 text-6xl">
            Track Your
            <span className="text-green-600">
              <Typewriter
                options={{
                  strings: [
                    "Carbon Streaks",
                    "Green Points",
                    "Eco Challenge",
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
            Join a community of eco-conscious individuals. Track your emissions,
            compete with friends, and make a positive impact on the planet.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row  gap-4 sm:gap-6">
            <Link
              to="/register"
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent"
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
              className="group relative bg-white hover:bg-gray-50 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-green-600 hover:border-green-700 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
          {/* 
          <div className="mt-20  grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Track Emissions</h3>
              <p className="text-gray-600">
                Log your daily activities and see your carbon impact
              </p>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Join Community</h3>
              <p className="text-gray-600">
                Connect with friends and compete on leaderboards
              </p>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Make Impact</h3>
              <p className="text-gray-600">
                Reduce your footprint and inspire others
              </p>
            </div>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
