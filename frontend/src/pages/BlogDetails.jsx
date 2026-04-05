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
  setBlog(res.data);
};

  return (
    <div className="p-6">
      <h1 className="text-3xl text-green-400">{blog.title}</h1>
      <p className="mt-4">{blog.content}</p>

      <h2 className="mt-6 text-xl">Comments</h2>
      <button onClick={() => likeBlog(blog._id)} className="text-red-400 mt-2">
        ❤️ {blog.likes?.length || 0}
      </button>

      <div>
        {comments.map((c) => (
          <p key={c._id} className="bg-[#1e293b] p-2 my-2 rounded">
            {c.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-3 p-2 w-full bg-black"
        placeholder="Write comment..."
      />

      <button onClick={addComment} className="bg-green-500 px-4 py-2 mt-2">
        Add Comment
      </button>
    </div>
  );
}

export default BlogDetails;
