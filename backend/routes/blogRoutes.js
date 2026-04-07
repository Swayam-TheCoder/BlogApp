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
  getSingleBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

// Public
router.get("/", getBlogs);

// Private
router.get("/my", protect, getMyBlogs);
router.delete("/:id", protect, deleteBlog);
router.post("/", protect, upload.single("image"), createBlog);
router.put("/like/:id", protect, toggleLike);
router.put("/:id", protect, updateBlog);
router.get("/:id", getSingleBlog);

module.exports = router;