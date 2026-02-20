import { Router } from "express";
import { KpiController } from "../controllers/kpi.controller";

const router = Router();

router.get("/", KpiController.readAll);
router.post("/", KpiController.create);

export default router;