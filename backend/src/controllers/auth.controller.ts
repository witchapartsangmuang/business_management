// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
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

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      return res.json({
        message: "Login successful",
        ...result,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      return res.status(401).json({ message: error.message || "Unauthorized" });
    }
  }
}
