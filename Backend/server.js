import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);



// Test route
app.get("/", (req, res) => {
  res.json({ message: "Smart Parking Backend is running 🔧" });
});

const MONGO_URI = process.env.MONGO_URI || "";

async function startServer() {
  try {
    if (!MONGO_URI) {
      console.warn("⚠️ WARNING: MONGO_URI not set. Server running without DB.");
    } else {
      await mongoose.connect(MONGO_URI);
      console.log("✅ Connected to MongoDB");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed:", err);
    process.exit(1);
  }
}

startServer();
