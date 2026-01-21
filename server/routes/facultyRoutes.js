const express = require("express");
const Faculty = require("../models/Faculty");
const checkAuth = require("../middleware/auth"); // 1. IMPORT MIDDLEWARE

const router = express.Router();

// ---------------------------------------------------
// PUBLIC ROUTES
// ---------------------------------------------------

// GET all faculty
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------
// PROTECTED ROUTES (Require 'x-admin-key' Header)
// ---------------------------------------------------

// CREATE faculty
router.post("/", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    const faculty = await Faculty.create(req.body);
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE faculty (New Addition)
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE faculty
router.delete("/:id", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
