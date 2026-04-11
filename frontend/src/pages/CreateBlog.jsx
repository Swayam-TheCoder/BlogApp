import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateBlog() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);

      if (file) {
        formData.append("image", file);
      }

      await API.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* CONTENT */}
          <textarea
            placeholder="Write your content..."
            rows="6"
            className="mb-4 p-3 w-full rounded bg-[#020617] focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
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
                if (selected && selected.size > 2 * 1024 * 1024) {
                  setError("File must be less than 2MB");
                  return;
                }
                setFile(selected);

                // preview
                if (selected) {
                  setPreview(URL.createObjectURL(selected));
                }
              }}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
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
          <button
            disabled={loading}
            className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Publishing...
              </span>
            ) : (
              "Publish Blog 🚀"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
