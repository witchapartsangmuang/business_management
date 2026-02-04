// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class KpiController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      return res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
}