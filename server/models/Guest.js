const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String }, // e.g. "Keynote Speaker"
    image: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    website: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guest", guestSchema);
