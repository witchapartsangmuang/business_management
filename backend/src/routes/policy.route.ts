import { Router } from "express";
import { PolicyController } from "../controllers/policy.controller";

const router = Router();

router.get("/", PolicyController.readAll);

export default router;