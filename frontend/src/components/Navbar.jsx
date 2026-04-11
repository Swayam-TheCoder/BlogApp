import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#020617] border-b border-gray-800">
      <h1 className="text-2xl font-bold text-green-400 tracking-wide">SBlog</h1>

      <div className="flex items-center gap-6 text-sm">
        <Link className="hover:text-green-400 transition" to="/">
          <h1
            className="relative inline-block text-green-400 text-xl
                  before:content-[''] before:absolute before:top-[-5px] before:left-0 before:w-full before:h-[2px]
                  before:bg-gradient-to-r before:from-green-500 before:to-cyan-400
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-500

                  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px]
                  after:bg-gradient-to-r after:from-green-500 after:to-cyan-400
                  after:scale-x-0 after:origin-right after:transition-transform after:duration-500

                  hover:before:scale-x-100 hover:after:scale-x-100"
          >
            Home
          </h1>
        </Link>

        {user ? (
          <>
            <Link className="hover:text-green-400" to="/dashboard">
              <h1
                className="relative inline-block text-green-400 text-xl
                  before:content-[''] before:absolute before:top-[-5px] before:left-0 before:w-full before:h-[2px]
                  before:bg-gradient-to-r before:from-green-500 before:to-cyan-400
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-500

                  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px]
                  after:bg-gradient-to-r after:from-green-500 after:to-cyan-400
                  after:scale-x-0 after:origin-right after:transition-transform after:duration-500

                  hover:before:scale-x-100 hover:after:scale-x-100"
              >
                Dashboard
              </h1>
            </Link>

            <Link className="hover:text-green-400" to="/notifications">
              🔔
            </Link>

            <button
              onClick={logout}
              className="p-6 py-2 bg-red-500 hover:bg-red-600 transition rounded-3xl"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-green-400 " to="/login">
              <h1
                className="relative inline-block text-green-400 text-xl
                  before:content-[''] before:absolute before:top-[-5px] before:left-0 before:w-full before:h-[2px]
                  before:bg-gradient-to-r before:from-green-500 before:to-cyan-400
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-500

                  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px]
                  after:bg-gradient-to-r after:from-green-500 after:to-cyan-400
                  after:scale-x-0 after:origin-right after:transition-transform after:duration-500

                  hover:before:scale-x-100 hover:after:scale-x-100"
              >
                Login
              </h1>
            </Link>

            <Link className="hover:text-green-400" to="/register">
              <h1
                className="relative inline-block text-green-400 text-xl
                  before:content-[''] before:absolute before:top-[-5px] before:left-0 before:w-full before:h-[2px]
                  before:bg-gradient-to-r before:from-green-500 before:to-cyan-400
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-500

                  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px]
                  after:bg-gradient-to-r after:from-green-500 after:to-cyan-400
                  after:scale-x-0 after:origin-right after:transition-transform after:duration-500

                  hover:before:scale-x-100 hover:after:scale-x-100"
              >
                Register
              </h1> 
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
