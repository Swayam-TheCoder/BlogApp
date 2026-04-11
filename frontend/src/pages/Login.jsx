import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import Navbar from "../components/Navbar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-2xl w-full max-w-md shadow-lg"
      >
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Welcome Back 
        </h2>

        {error && (
          <p className="text-red-400 mb-3 text-sm">{error}</p>
        )}

        <div className="space-y-4">
          <Input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 
          transition p-3 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400">
            Register
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Login;