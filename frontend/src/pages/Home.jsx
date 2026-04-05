import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 grid gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 bg-[#1e293b] rounded-xl">
            <h2 className="text-xl font-bold text-green-400">
              {blog.title}
            </h2>
            <p>{blog.content.slice(0, 100)}...</p>

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