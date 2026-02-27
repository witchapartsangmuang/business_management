import { Response, NextFunction } from "express";
import { db } from "../db";
import { AuthRequest } from "../types/backend-types";


export const permissionCheck = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.user; // หรือดึงจาก token decode
    const permission = await db.query(
      `SELECT * FROM permission WHERE permission_for = $1 LIMIT 1;`,
      [id]
    );
    if (!permission || !permission.rows[0].permissions?.includes(requiredPermission)) {
      return res.status(403).json({
        message: "ไม่มีสิทธิ์เข้าถึงข้อมูล"
      });
    }
    next();
  };
};