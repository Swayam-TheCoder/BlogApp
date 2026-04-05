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
      `/blogs?search=${search}&sort=${sort}&page=${page}`,
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

      <div className="p-6 max-w-6xl mx-auto">
        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            placeholder="Search blogs..."
            className="p-3 rounded-lg bg-[#1e293b] w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-3 rounded-lg bg-[#1e293b] focus:outline-none"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* BLOG CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#1e293b] p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold text-green-400 mb-2">
                {blog.title}
              </h2>

              <p className="text-gray-300 text-sm mb-3">
                {blog.content.slice(0, 120)}...
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => likeBlog(blog._id)}
                  className="flex items-center gap-1 text-red-400 hover:scale-110 transition"
                >
                  ❤️ {blog.likes?.length || 0}
                </button>

                <Link
                  to={`/blog/${blog._id}`}
                  className="text-green-400 text-sm hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
