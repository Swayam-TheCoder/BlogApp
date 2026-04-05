const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog,
  toggleLike,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

// Public
router.get("/", getBlogs);

// Private
router.get("/my", protect, getMyBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/", protect, upload.single("image"), createBlog);
router.put("/like/:id", protect, toggleLike);

module.exports = router;