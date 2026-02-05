import express from "express";
import cors from "cors";
import "dotenv/config";

import kpiRouter from "./routes/kpi.route";
import policyRouter from "./routes/policy.route"



import authRouter from "./routes/auth.route";
import dashboardRouter from "./routes/dashboard.route";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

app.get("/me", authMiddleware, (req, res) => {
  // @ts-ignore
  res.json({ user: req.user });
});
app.use("/policy",policyRouter)
app.use("/kpi", kpiRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

const server = app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

// ✅ ถ้า port ชน / permission / bind error จะเห็นทันที
server.on("error", (err: any) => {
  console.error("❌ Server failed to start:", err?.message || err);
});


