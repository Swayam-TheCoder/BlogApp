const Blog = require("../models/Blog");
const Notification = require("../models/notification");
// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    console.log(req.body);
    console.log(req.file);
    console.log(req.user);
    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BLOGS (Public)
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BLOGS (Private)
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BLOG (Owner only)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    const updated = await blog.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BLOG (Owner only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    // ⚡ Only fetch needed fields
    const blog = await Blog.findById(blogId).select("likes author");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLiked = blog.likes.some(
      (id) => id.toString() === userId.toString()
    );

    // ⚡ Use atomic update (FASTER)
    const update = alreadyLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, update, {
      new: true,
      select: "likes",
    }).lean();

    // ⚡ Send response immediately
    res.json(updatedBlog);

    // 🔔 Background notification (non-blocking)
    if (!alreadyLiked && blog.author.toString() !== userId.toString()) {
      Notification.create({
        user: blog.author,
        sender: userId,
        blog: blogId,
        type: "like",
        message: `${req.user.name} liked your blog`,
        content: blog.content.slice(0, 150),
      }).catch(() => {});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const {
      search = "",
      author,
      sort = "latest",
      page = 1,
      limit = 10,
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    // ⚡ Use TEXT SEARCH instead of regex
    const keyword = search
      ? { $text: { $search: search } }
      : {};

    const authorFilter = author ? { author } : {};

    const sortOption =
      sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const blogs = await Blog.find({
      ...keyword,
      ...authorFilter,
    })
      .select("title content image likes author createdAt") // ⚡ reduce payload
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(); // ⚡ HUGE speed boost

    // ⚡ Count separately (optimized)
    const total = await Blog.countDocuments({
      ...keyword,
      ...authorFilter,
    });

    res.json({
      blogs,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};