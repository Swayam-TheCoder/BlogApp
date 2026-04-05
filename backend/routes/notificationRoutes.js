const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Notification = require("../models/notification");

// GET MY NOTIFICATIONS
router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  })
    .populate("sender", "name")
    .sort({ createdAt: -1 });

  res.json(notifications);
});

// MARK AS READ
router.put("/:id", protect, async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  notification.read = true;
  await notification.save();
  res.json(notification);
});

module.exports = router;