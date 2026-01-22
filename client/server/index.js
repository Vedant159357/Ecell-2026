require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const eventRoutes = require("./routes/eventRoutes");
const guestRoutes = require("./routes/guestRoutes");
const teamRoutes = require("./routes/teamRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(cors());
app.use(express.json());

// ----------------------
// CONNECT MONGODB
// ----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ----------------------
// API ROUTES
// ----------------------
app.use("/api/events", eventRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/payment", paymentRoutes);

// ----------------------
// BASE ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("E-Cell Backend Running Successfully 🚀");
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
