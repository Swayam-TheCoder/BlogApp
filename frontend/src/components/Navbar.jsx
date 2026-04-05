import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#020617] border-b border-gray-800">
      
      <h1 className="text-2xl font-bold text-green-400 tracking-wide">
        SBlog
      </h1>

      <div className="flex items-center gap-6 text-sm">
        <Link className="hover:text-green-400 transition" to="/">
          Home
        </Link>

        {user ? (
          <>
            <Link className="hover:text-green-400" to="/dashboard">
              Dashboard
            </Link>

            <Link className="hover:text-green-400" to="/notifications">
              🔔
            </Link>

            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-green-400" to="/login">
              Login
            </Link>

            <Link
              className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 transition"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;