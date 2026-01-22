const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String }, // e.g. "HOD", "Professor"
    department: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
