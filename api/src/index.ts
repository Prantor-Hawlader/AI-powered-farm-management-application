import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "Running 🌾",
    service: "Cool Pharmer API",
    timestamp: new Date().toISOString(),
  });
});

// Server
app.listen(PORT, () => {
  console.log(`🌾 Cool Pharmer API has started → http://localhost:${PORT}`);
});
