import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AccessTokenPayload, AuthRequest } from "../types/backend-types";

const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET_CHANGE_ME";

// export interface AuthRequest extends Request {
//   user?: AccessTokenPayload;
// }

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // const token = req.cookies.auth_token;
    // ดึง token จาก Header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // ตรวจ token
    const decoded = jwt.verify(token, JWT_SECRET) as AccessTokenPayload;

    // attach user เข้า req
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
