import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Health check route
app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json({
    status: "ok",
    message: "Cool Pharmer API is running! 🌾",
    users: userCount,
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
