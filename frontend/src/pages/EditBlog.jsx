import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // 📌 Load existing blog data
  useEffect(() => {
  API.get(`/blogs/${id}`).then((res) => {
    setForm({
      title: res.data.title,
      content: res.data.content,
    });
  });
}, [id]);

  // 📌 Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put(`/blogs/${id}`, form);

    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <form
          onSubmit={handleUpdate}
          className="bg-[#1e293b] p-6 rounded-2xl"
        >
          <h2 className="text-2xl text-green-400 mb-4">
            Edit Blog
          </h2>

          <input
            value={form.title}
            className="mb-4 p-3 w-full bg-[#020617] rounded"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            value={form.content}
            rows="6"
            className="mb-4 p-3 w-full bg-[#020617] rounded"
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />

          <button className="bg-green-500 px-4 py-2 rounded">
            Update Blog ✏️
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBlog;