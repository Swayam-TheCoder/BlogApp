const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

// Public
router.get("/:blogId", getComments);

// Private
router.post("/:blogId", protect, addComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;