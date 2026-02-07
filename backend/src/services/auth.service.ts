// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "BMJWTSUPERSECRETKEY";

export class AuthService {
	static async register(data: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		phone: string;
		role: string;
	}) {
		const { email, password, firstName, lastName, phone, role } = data;
		console.log("data: ", data);
		// ตรวจ user ซ้ำ
		const existing = await db.query(
			"SELECT id FROM users WHERE email = $1",
			[email]
		);
		if (existing.rows.length > 0) {
			throw new Error("Email already exists.");
		}
		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// insert user
		const result = await db.query(
			`INSERT INTO employee (email, password_hash, first_name, last_name, phone, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, first_name, last_name, phone, role, created_at`,
			[email, hashedPassword, firstName, lastName, phone, role]
		);

		return result.rows[0];

	}

	static async login(data: { email: string; password: string }) {
		console.log("data: ", data);

		const { email, password } = data;

		if (!email || !password) {
			throw new Error("email and password are required.");
		}

		// email = username หรือ email ก็ได้
		const userResult = await db.query(
			`SELECT id, email, password_hash, role
       FROM users
       WHERE  email = $1
       LIMIT 1`,
			[email]
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
