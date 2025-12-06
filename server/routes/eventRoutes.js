const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Add a new event
router.post("/add", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

// Get upcoming event
router.get("/upcoming", async (req, res) => {
  const event = await Event.findOne({ isUpcoming: true });
  res.json(event);
});

module.exports = router;
