import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

// อนุญาตเฉพาะ role = 'admin' หรือ 'super_admin' เป็นต้น
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }

  next();
};
