import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/register", form);
    login(data);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-[#1e293b] p-6 rounded-xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-green-500">Register</h2>

        <input
          placeholder="Name"
          className="block mb-3 p-2 w-full bg-black"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="block mb-3 p-2 w-full bg-black"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="block mb-3 p-2 w-full bg-black"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-green-500 px-4 py-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;