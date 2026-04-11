import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });

    API.get(`/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

  const addComment = async () => {
    await API.post(`/comments/${id}`, { text });
    const res = await API.get(`/comments/${id}`);
    setComments(res.data);
    setText("");
  };

  const likeBlog = async (id) => {
    await API.put(`/blogs/like/${id}`);

    // refresh blogs
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-4">{blog.title}</h1>
      {blog.image && (
        <img
          src={blog.image}
          alt="blog"
          className="max-w-full h-[400px] w-lg max-h-lg object-cover object-center rounded-xl mb-4 hover:scale-105 transition"
        />
      )}
      <p className="text-gray-300 leading-relaxed">{blog.content}</p>

      <button onClick={() => likeBlog(blog._id)} className="text-red-400 mt-4">
        ❤️ {blog.likes?.length || 0}
      </button>

      {/* COMMENTS SECTION */}
      <h2 className="mt-10 text-2xl font-semibold text-green-400">
        Comments ({comments.length})
      </h2>

      <div className="space-y-4 mt-5">
        {comments.slice(0, visibleComments).map((c) => (
          <div
            key={c._id}
            className="bg-[#1e293b] p-4 rounded-xl flex gap-3 hover:bg-[#273549] transition"
          >
            {/* Avatar */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-black font-bold">
              {c.user?.email?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  {c.user?.email || "Anonymous"}
                </p>

                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-300 mt-1">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 👇 ADD HERE (IMPORTANT POSITION) */}
      {comments.length > 5 && (
        <div className="text-center mt-4">
          {visibleComments < comments.length ? (
            <button
              onClick={() => setVisibleComments((prev) => prev + 10)}
              className="text-green-400 hover:text-green-300 transition"
            >
              See More Comments
            </button>
          ) : (
            <button
              onClick={() => setVisibleComments(5)}
              className="text-red-400 hover:text-red-300 transition"
            >
              Show Less
            </button>
          )}
        </div>
      )}

      {/* ADD COMMENT */}
      <div className="mt-6 flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#020617] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Write a comment..."
        />

        <button
          onClick={addComment}
          className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
