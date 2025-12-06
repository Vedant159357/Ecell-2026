const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  price: { type: Number, default: 0 },
  image: String,
  speakers: [String],
  isUpcoming: { type: Boolean, default: false },
});

module.exports = mongoose.model("Event", eventSchema);
