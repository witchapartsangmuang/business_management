import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/permission.middleware";


const router = Router();
router.post("/executive", authMiddleware, adminOnly, async (req: Request, res: Response) => {
    return res.status(400).json({ message: "ดึงข้อมูลสำเร็จ" });
})
router.post("/manager", async (req: Request, res: Response) => {
    return res.status(400).json({ message: "ดึงข้อมูลสำเร็จ" });
})
router.post("/user", async (req: Request, res: Response) => {
    return res.status(400).json({ message: "ดึงข้อมูลสำเร็จ" });
})

export default router;