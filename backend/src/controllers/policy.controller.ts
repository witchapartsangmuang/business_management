import { Request, Response } from "express";
import { PolicyService } from "../services/policy.service";

export class PolicyController {
  static async readAll(req: Request, res: Response) {
    try {
      const policy = await PolicyService.readAll();
      return res.status(200).json({
        message: "KPI read successfully",
        policy,
      });
    } catch (error: any) {
      console.error("Read error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const kpi = await PolicyService.createKpi(req.body);
      return res.status(201).json({
        message: "KPI registered successfully",
        kpi,
      });
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const kpi = await PolicyService.updateKpi(req.body);
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
}