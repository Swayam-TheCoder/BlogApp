import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    API.get("/blogs").then((res) => {
      const found = res.data.find((b) => b._id === id);
      setBlog(found);
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
    const res = await API.get("/blogs");
    const found = res.data.find((b) => b._id === id);
    setBlog(found);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-4">{blog.title}</h1>
      <p className="text-gray-300 leading-relaxed">{blog.content}</p>

      <button onClick={() => likeBlog(blog._id)} className="text-red-400 mt-4">
        ❤️ {blog.likes?.length || 0}
      </button>

      <h2 className="mt-8 text-xl">Comments</h2>
      <div className="space-y-3 mt-3">
        {comments.map((c) => (
          <p key={c._id} className="bg-[#1e293b] p-3 rounded-lg">
            {c.text}
          </p>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-[#020617]"
          placeholder="Write comment..."
        />

        <button onClick={addComment} className="bg-green-500 px-4 rounded">
          Post
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
