import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between p-4 bg-[#020617]">
      <h1 className="text-2xl font-bold text-green-500">SBlog</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/notifications">🔔</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;