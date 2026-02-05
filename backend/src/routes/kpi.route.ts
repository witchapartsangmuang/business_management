import { Router } from "express";
import { KpiController } from "../controllers/kpi.controller";

const router = Router();

router.get("/", KpiController.readAll);

export default router;