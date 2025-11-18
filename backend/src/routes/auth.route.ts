import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// ❗ ตัวอย่าง user จำลอง (จริง ๆ ต้องมาจาก DB)
const fakeUser = {
  id: "1",
  email: "user@example.com",
  passwordHash: bcrypt.hashSync("123456", 10), // สร้าง hash ไว้ล่วงหน้า
  role: "user",
};

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email และ Password จำเป็นต้องกรอก" });
    }

    // ในระบบจริง: หา user จาก DB ด้วย email
    if (email !== fakeUser.email) {
      return res.status(401).json({ message: "Email หรือ Password ไม่ถูกต้อง" });
    }

    const isMatch = await bcrypt.compare(password, fakeUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Email หรือ Password ไม่ถูกต้อง" });
    }

    // สร้าง JWT
    const token = jwt.sign(
      {
        sub: fakeUser.id,
        email: fakeUser.email,
        role: fakeUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login สำเร็จ",
      token,
      user: {
        id: fakeUser.id,
        email: fakeUser.email,
        role: fakeUser.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
});

export default router;
