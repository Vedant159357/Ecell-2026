const express = require("express");
const Event = require("../models/Event");
const checkAuth = require("../middleware/auth"); // 1. IMPORT MIDDLEWARE

const router = express.Router();

// ---------------------------------------------------
// PUBLIC ROUTES (No Password Needed)
// ---------------------------------------------------

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET upcoming event
router.get("/upcoming", async (req, res) => {
  try {
    const event = await Event.findOne({ isUpcoming: true });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------
// PROTECTED ROUTES (Require 'x-admin-key' Header)
// ---------------------------------------------------

// CREATE event
router.post("/", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE event
router.put("/:id", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE event
router.delete("/:id", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
