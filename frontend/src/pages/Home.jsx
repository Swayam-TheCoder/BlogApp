import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  // 🔄 Fetch blogs
  const fetchBlogs = async () => {
  const { data } = await API.get(
    `/blogs?search=${search}&sort=${sort}&page=${page}`
  );
  setBlogs(data.blogs);
};

  useEffect(() => {
  const delay = setTimeout(() => {
    fetchBlogs();
  }, 500);

  return () => clearTimeout(delay);
}, [search, sort, page]);

  // ❤️ LIKE FUNCTION (CORRECT WAY)
  const likeBlog = async (id) => {
    await API.put(`/blogs/like/${id}`);
    fetchBlogs(); // refresh after like
  };

  return (
    <>
      <Navbar />

      <div className="p-6 grid gap-4">
        <div className="flex gap-4 mb-6">
          <input
            placeholder="Search blogs..."
            className="p-2 bg-[#1e293b] w-full"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 bg-[#1e293b]"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 bg-[#1e293b] rounded-xl">
            <h2 className="text-xl font-bold text-green-400">
              {blog.title}
            </h2>

            <p>{blog.content.slice(0, 100)}...</p>

            {/* ❤️ LIKE BUTTON */}
            <button
              onClick={() => likeBlog(blog._id)}
              className="text-red-400 mt-2"
            >
              ❤️ {blog.likes?.length || 0}
            </button>

            <br />

            <Link to={`/blog/${blog._id}`} className="text-green-500">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;