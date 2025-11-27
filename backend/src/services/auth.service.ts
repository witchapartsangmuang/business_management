// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET_CHANGE_ME";

export class AuthService {
  static async register(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = data;

    if (!username || !email || !password) {
      throw new Error("Username, email and password are required.");
    }

    // ตรวจ user ซ้ำ
    const existing = await db.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existing.rows.length > 0) {
      throw new Error("Username or email already exists.");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const result = await db.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, 'user')
       RETURNING id, username, email, role, created_at`,
      [username, email, hashedPassword]
    );

    return result.rows[0];
  }

  static async login(data: { identifier: string; password: string }) {
    const { identifier, password } = data;

    if (!identifier || !password) {
      throw new Error("Identifier and password are required.");
    }

    // identifier = username หรือ email ก็ได้
    const userResult = await db.query(
      `SELECT id, username, email, password_hash, role
       FROM users
       WHERE username = $1 OR email = $1
       LIMIT 1`,
      [identifier]
    );

    if (userResult.rows.length === 0) {
      throw new Error("Invalid username/email or password.");
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid username/email or password.");
    }

    // สร้าง JWT
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ไม่ส่ง password_hash กลับ
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}
