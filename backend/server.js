// import { ClerkExpressRequireAuth } from "@clerk/express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

/* -------------------- ENV CHECK -------------------- */

const ork = process.env.OPENROUTER_API_KEY || "";
const hfk = process.env.HF_API_KEY || "";

console.log(
  "OPENROUTER KEY LOADED:",
  ork ? `${ork.slice(0, 10)}... (length: ${ork.length})` : "NOT FOUND"
);

console.log(
  "HF KEY LOADED:",
  hfk ? `${hfk.slice(0, 10)}... (length: ${hfk.length})` : "NOT FOUND"
);

/* -------------------- DB CONNECT (FIXED) -------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

/* -------------------- APP -------------------- */

const app = express();

app.use(
  cors({
  origin: [
  "http://localhost:5173",
  "https://museai-alpha.vercel.app",
],
    credentials: true,
  })
);


app.use(express.json());

// ✅ ADD THIS (very important)
app.use(clerkMiddleware());

/* -------------------- ROUTES -------------------- */

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ✅ FIXED HERE
app.use("/api", aiRoutes);

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
console.log("CLERK PUB:", process.env.CLERK_PUBLISHABLE_KEY);
console.log("CLERK SEC:", process.env.CLERK_SECRET_KEY);