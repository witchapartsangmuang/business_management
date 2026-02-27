import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

// อนุญาตเฉพาะ role = 'admin' หรือ 'super_admin' เป็นต้น
export const permissionCheck = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const user = req.user; // หรือดึงจาก token decode

    if (!user || !user.permissions?.includes(requiredPermission)) {
      return res.status(403).json({
        message: "ไม่มีสิทธิ์เข้าถึงข้อมูล"
      });
    }

    next();
  };
};