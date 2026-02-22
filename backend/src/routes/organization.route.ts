import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";

const router = Router();
// Organization Level
router.get("/level", OrganizationController.organizationLevelReadAll);
// Organization Structure
router.get("/structure", OrganizationController.organizationStructureReadAll);

export default router;