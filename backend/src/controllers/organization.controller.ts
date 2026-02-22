import { Request, Response } from "express";
import { OrganizationService } from "../services/organization.sevice";

export class OrganizationController {
    // Organization Level
    static async organizationLevelReadAll(req: Request, res: Response) {
        try {
            const organizationLevel = await OrganizationService.organizationLevelReadAll();
            return res.status(201).json({
                message: "User registered successfully",
                organizationLevel,
            });
        } catch (error: any) {
            console.error("Register error:", error);
            return res.status(400).json({ message: error.message || "Bad request" });
        }
    }

    // Organization Structure
    static async organizationStructureReadAll(req: Request, res: Response) {
        try {
            const organizationStructure = await OrganizationService.organizationStructureReadAll();
            return res.status(201).json({
                message: "User registered successfully",
                organizationStructure,
            });
        } catch (error: any) {
            console.error("Register error:", error);
            return res.status(400).json({ message: error.message || "Bad request" });
        }
    }

}