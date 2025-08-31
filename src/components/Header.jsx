import { Link } from "react-router";
import GreenifyLogo from "../assets/logo";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
      <div className="w-full flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-3 group text-green-600 pointer-events-auto"
        >
          <GreenifyLogo color="currentColor" />
          <span className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
            Greenify
          </span>
        </Link>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <div className="cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Live Impacts
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
