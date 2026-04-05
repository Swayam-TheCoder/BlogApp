const Blog = require("../models/Blog");
const Notification = require("../models/notification");
// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
      image: req.file?.path,
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
  const blog = await Blog.findById(req.params.id);

  const alreadyLiked = blog.likes.includes(req.user._id);

  if (alreadyLiked) {
    blog.likes.pull(req.user._id);
  } else {
    blog.likes.push(req.user._id);
  }
  
  if (!alreadyLiked) {
  // create notification only when liking
  if (blog.author.toString() !== req.user._id.toString()) {
    await Notification.create({
      user: blog.author,
      sender: req.user._id,
      blog: blog._id,
      type: "like",
      message: `${req.user.name} liked your blog`,
    });
  }
}

  await blog.save();
  res.json(blog);
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

    // 🔍 Search (title + content)
    const keyword = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // 🧑 Filter by author
    const authorFilter = author ? { author } : {};

    // 📅 Sorting
    const sortOption =
      sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const blogs = await Blog.find({
      ...keyword,
      ...authorFilter,
    })
      .populate("author", "name")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Blog.countDocuments({
      ...keyword,
      ...authorFilter,
    });

    res.json({
      blogs,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};