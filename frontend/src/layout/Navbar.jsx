import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { unreadCount } = useContext(NotificationContext);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="font-bold text-lg">
          MiniGram
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>

          <Link to="/notifications" className="relative">
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link to="/profile">Profile</Link>

          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
