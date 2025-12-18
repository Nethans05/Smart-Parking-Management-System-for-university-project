import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");

const PORT = process.env.PORT || 5000;

// Middlewares
const DEFAULT_DEV_ORIGINS = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://[::1]:5173",
  "http://[::1]:5174",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://[::1]:5000",
]);

const configuredOrigin = process.env.CLIENT_URL?.trim();

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (configuredOrigin && origin === configuredOrigin) {
      return callback(null, true);
    }

    if (DEFAULT_DEV_ORIGINS.has(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(PUBLIC_DIR));
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/bookings", bookingRoutes);


// Test route
app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
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
