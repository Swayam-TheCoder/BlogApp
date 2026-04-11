import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateBlog() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("content", form.content);

  if (file) {
    formData.append("image", file); // MUST match backend
  }

  await API.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  navigate("/");
};


  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl text-green-400 mb-4 font-semibold">
            Create Blog
          </h2>

          {/* TITLE */}
          <input
            placeholder="Enter blog title..."
            className="mb-4 p-3 w-full rounded bg-[#020617] focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          {/* CONTENT */}
          <textarea
            placeholder="Write your content..."
            rows="6"
            className="mb-4 p-3 w-full rounded bg-[#020617] focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />

          {/* IMAGE UPLOAD */}
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300">
              Upload Image
            </label>

            <input
              type="file"
              className="text-sm"
              onChange={(e) => {
                const selected = e.target.files[0];
                setFile(selected);

                // preview
                if (selected) {
                  setPreview(URL.createObjectURL(selected));
                }
              }}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mb-4 rounded-lg max-h-60 object-cover"
            />
          )}

          {/* BUTTON */}
          <button className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-600 transition">
            Publish Blog 🚀
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;