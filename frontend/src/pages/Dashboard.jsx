import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const { data } = await API.get("/blogs/my");
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    await API.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl text-green-400">My Blogs</h2>
          <Link
            to="/create"
            className="bg-green-500 px-4 py-2 rounded"
          >
            + New Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <p>No blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#1e293b] p-4 mb-3 rounded"
            >
              <h3 className="text-lg">{blog.title}</h3>

              <div className="mt-2 space-x-3">
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;