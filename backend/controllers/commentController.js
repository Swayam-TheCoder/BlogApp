const Comment = require("../models/Comment");
const Blog = require("../models/Blog"); 
const Notification = require("../models/notification");
// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = await Comment.create({
      text,
      blog: blog._id,
      user: req.user._id,
    });

    // 🔔 Create Notification (only if not self)
    if (blog.author.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: blog.author,        // receiver
        sender: req.user._id,     // who commented
        blog: blog._id,
        type: "comment",
        message: `${req.user.name} commented on your blog`,
      });
    }

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS FOR A BLOG
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "name");

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