import { Link } from "react-router";
import GreenifyLogo from "../assets/logo";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link
          to="/"
          className="flex items-center space-x-3 group text-green-600 pointer-events-auto"
        >
          <GreenifyLogo color="currentColor" />
          <span className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
            Greenify
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
