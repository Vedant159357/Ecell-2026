const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String }, // e.g. "Tech Lead"
    image: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    github: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);
