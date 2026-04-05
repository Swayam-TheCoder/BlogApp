const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

// Public
router.get("/", getBlogs);

// Private
router.post("/", protect, createBlog);
router.get("/my", protect, getMyBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;