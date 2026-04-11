const Comment = require("../models/Comment");
const Blog = require("../models/Blog"); 
const Notification = require("../models/notification");
// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment is required" });
    }

    // ⚡ Only fetch required fields (faster)
    const blog = await Blog.findById(req.params.blogId).select("author");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // ⚡ Create comment
    const comment = await Comment.create({
      text: text.trim(),
      blog: req.params.blogId,
      user: req.user._id,
    });

    // ⚡ Populate user (so frontend gets name instantly)
    const populatedComment = await comment.populate("user", "name email");

    // ⚡ Send response immediately (DON'T WAIT for notification)
    res.status(201).json(populatedComment);

    // 🔔 Create notification in background (non-blocking)
    if (blog.author.toString() !== req.user._id.toString()) {
      Notification.create({
        user: blog.author,
        sender: req.user._id,
        blog: req.params.blogId,
        type: "comment",
        message: `${req.user.name} commented on your blog`,
      }).catch((err) => console.error("Notification error:", err));
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS FOR A BLOG
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "name email");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT (Owner only)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};