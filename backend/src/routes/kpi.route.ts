import { Router } from "express";
import { KpiController } from "../controllers/kpi.controller";

const router = Router();

router.post("/kpi/", KpiController.register);

export default router;