import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import farmRoutes from "./routes/farm.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());
app.use("/api/farms", farmRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Cool Pharmer API is running! 🌾",
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
