import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import GreenifyLogo from "../../assets/logo";

const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const linkActive = "bg-green-100 text-green-800";
const linkIdle = "text-gray-600 hover:text-green-700";

export default function TopBar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: brand + nav links */}
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 text-green-700"
            >
              <GreenifyLogo color="currentColor" size="w-6 h-6" />
              <span className="text-xl font-semibold text-gray-900 hover:text-green-700">
                Greenify
              </span>
            </Link>
            {/* Desktop nav links */}
            <div className="hidden sm:flex items-center gap-2">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/planner"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Planner
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Leaderboard
              </NavLink>
            </div>
          </div>

          {/* Right: Mobile menu button + Desktop logout */}
          <div className="flex items-center gap-2">
            {/* Desktop logout button */}
            <button
              onClick={onLogout}
              className="hidden sm:block cursor-pointer text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign Out
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="sm:hidden cursor-pointer text-gray-500 hover:text-gray-700 p-2 rounded-md transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`py-2 transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? "translate-y-0 scale-100" : "-translate-y-2 scale-95"
            }`}
          >
            <NavLink
              to="/dashboard"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-md transition-colors ${
                  isActive
                    ? "text-green-800"
                    : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/planner"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-md transition-colors ${
                  isActive
                    ? "text-green-800"
                    : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              Planner
            </NavLink>
            <NavLink
              to="/leaderboard"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-md transition-colors ${
                  isActive
                    ? "text-green-800"
                    : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              Leaderboard
            </NavLink>
            <hr className="border-gray-200" />
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="cursor-pointer block w-full text-left px-4 py-2 text-md text-red-600 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
