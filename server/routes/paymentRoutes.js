const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Payment = require("../models/Payment");
const checkAuth = require("../middleware/auth"); // Import Middleware

// 1. CONDITIONAL RAZORPAY SETUP
let razorpay = null;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    const Razorpay = require("razorpay");
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } else {
    console.warn("⚠️  WARNING: Razorpay Keys missing. Running in MOCK MODE.");
  }
} catch (err) {
  console.warn("⚠️  Razorpay failed to initialize:", err.message);
}

// 2. Initialize Nodemailer (Email Sender)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// ROUTE 1: Create Order (Mock-Safe)
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    // A. IF REAL RAZORPAY EXISTS
    if (razorpay) {
      const options = {
        amount: amount * 100, // paise
        currency: currency,
        receipt: `receipt_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      return res.json(order);
    }

    // B. IF NO KEYS (MOCK MODE)
    // We return a fake order ID so your frontend thinks it worked
    console.log("📝 Mock Order Created (No Real Payment)");
    res.json({
      id: `order_MOCK_${Date.now()}`,
      entity: "order",
      amount: amount * 100,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      status: "created",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTE 2: Verify Payment (Mock-Safe)
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
    } = req.body;

    // A. IF REAL KEYS EXIST (Verify Signature)
    if (process.env.RAZORPAY_KEY_SECRET) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res
          .status(400)
          .json({ status: "failure", message: "Invalid Signature" });
      }
    } else {
      console.log("📝 Mock Payment Verified (Skipping Signature Check)");
    }

    // B. SAVE TO DB (Works in both modes)
    const newPayment = new Payment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "success",
      userEmail: email,
      amount: req.body.amount,
    });
    await newPayment.save();

    // C. SEND EMAIL
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Payment Successful - E-Cell Event",
      html: `<h3>Payment Confirmed!</h3><p>Transaction ID: ${razorpay_payment_id}</p>`,
    };

    // Only send email if credentials exist
    if (process.env.EMAIL_USER) {
      transporter.sendMail(mailOptions, (err) => {
        if (err) console.log("Email Error:", err);
      });
    }

    res.json({ status: "success", message: "Payment Verified" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTE 3: Get All Payments (Admin Only)
router.get("/", checkAuth, async (req, res) => {
  try {
    const payments = await Payment.find({ status: "success" }).sort({
      createdAt: -1,
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
