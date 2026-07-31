const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Mini CRM Backend is Running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });