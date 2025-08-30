import { Link, NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const linkActive = "bg-emerald-700 text-white";
const linkIdle = "text-gray-700 hover:bg-gray-200";

export default function TopBar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: brand + nav links */}
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-xl font-semibold text-gray-900"
            >
              Greenify
            </Link>
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
            </div>
          </div>

          {/* Right: auth actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-gray-700 hidden sm:inline">
                  Welcome, {user.displayName || user.email}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
