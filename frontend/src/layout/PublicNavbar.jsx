import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
        {/* App Name */}
        <Link to="/" className="font-bold text-lg">
          MiniGram
        </Link>

        {/* Auth Links */}
        <div className="flex gap-4 text-sm">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
