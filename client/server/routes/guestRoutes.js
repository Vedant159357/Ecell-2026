const express = require("express");
const Guest = require("../models/Guest"); // Fixed: Import Guest Model
const checkAuth = require("../middleware/auth"); // 1. IMPORT MIDDLEWARE

const router = express.Router();

// ---------------------------------------------------
// PUBLIC ROUTES
// ---------------------------------------------------

// GET all guests
router.get("/", async (req, res) => {
  try {
    const guests = await Guest.find(); // Fixed: Use Guest model
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------
// PROTECTED ROUTES (Require 'x-admin-key' Header)
// ---------------------------------------------------

// CREATE guest
router.post("/", checkAuth, async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE guest (New Addition)
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE guest
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.id);
    res.json({ message: "Guest deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
