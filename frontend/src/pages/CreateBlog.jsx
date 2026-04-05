import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("content", form.content);
  formData.append("image", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/blogs", formData);
    navigate("/");
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          className="block mb-3 p-2 w-full bg-[#1e293b]"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Content"
          className="block mb-3 p-2 w-full bg-[#1e293b]"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="bg-green-500 px-4 py-2">Publish</button>
      </form>
    </div>
  );
}

export default CreateBlog;
