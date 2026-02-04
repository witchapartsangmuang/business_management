import express from "express";
import cors from "cors";
// route
import kpiRouter from "./routes/kpi.route";
import authRouter from "./routes/auth.route";
import dashboardRouter from "./routes/dashboard.route";
// middleware
import { authMiddleware } from "./middleware/auth.middleware";

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
app.use("/kpi", kpiRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
