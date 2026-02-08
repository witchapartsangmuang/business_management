import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
router.get("/", EmployeeController.readAll);
router.get("/:id", EmployeeController.readDetail);
router.post("/", EmployeeController.create);
export default router;
