import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    login(data);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-[#1e293b] p-8 rounded-2xl w-96 shadow-xl">
        <h2 className="text-3xl mb-6 text-green-400 font-semibold text-center">Login</h2>

        <input
          className="mb-4 p-3 w-full rounded bg-[#020617] focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="mb-4 p-3 w-full rounded bg-[#020617] focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-600 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;