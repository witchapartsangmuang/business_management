import { Router } from "express";
import { KpiController } from "../controllers/kpi.controller";

const router = Router();

router.get("/", KpiController.readAllKpi);

export default router;