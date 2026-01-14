const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    shortDescription: { type: String },
    banner: { type: String }, // User input: image URL
    date: { type: Date },
    price: { type: Number, default: 0 },
    isUpcoming: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
