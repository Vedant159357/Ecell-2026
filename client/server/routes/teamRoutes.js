const express = require("express");
const TeamMember = require("../models/TeamMember");
const checkAuth = require("../middleware/auth"); // 1. IMPORT MIDDLEWARE

const router = express.Router();

// ---------------------------------------------------
// PUBLIC ROUTES (Anyone can see the team)
// ---------------------------------------------------

// GET all members
router.get("/", async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------
// PROTECTED ROUTES (Require 'x-admin-key' Header)
// ---------------------------------------------------

// CREATE team member
router.post("/", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    const member = await TeamMember.create(req.body);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE team member (New Addition)
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE member
router.delete("/:id", checkAuth, async (req, res) => {
  // Added checkAuth
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Team member deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
