import { Router, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

const router = Router();
router.post("/total-project", async (req: Request, res: Response) => {
    return res.status(400).json({ message: "ดึงข้อมูลสำเร็จ" });
})
