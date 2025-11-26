import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import { authMiddleware } from "./middleware/auth.middleware";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "API is running" });
});
app.get("/me", authMiddleware, (req, res) => {
  // @ts-ignore
  res.json({ user: req.user });
});
// Routes
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
