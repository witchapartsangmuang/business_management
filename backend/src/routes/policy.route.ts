import { Router } from "express";
import { PolicyController } from "../controllers/policy.controller";

const router = Router();

router.get("/", PolicyController.readAll);
router.post("/", PolicyController.create);
router.put("/:id", PolicyController.update);

export default router;