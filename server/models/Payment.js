const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  currency: String,
  status: { type: String, default: "pending" }, // pending, success, failed
  userEmail: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
