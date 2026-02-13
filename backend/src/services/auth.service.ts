// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { Employee } from "../types/types";

const JWT_SECRET = process.env.JWT_SECRET || "BMJWTSUPERSECRETKEY";
function unpackPassword(employee: Employee) {
	const { password, ...employeeObj } = employee
	return employeeObj
}
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
		const employee = await db.query(
			`SELECT * FROM employee WHERE email = $1 LIMIT 1;`,
			[email]
		);
		if (employee.rows.length === 0) {
			throw new Error("Invalid username/email or password.");
		}
		const employee_info = employee.rows[0];
		const isMatch = await bcrypt.compare(password, employee_info.password);
		if (!isMatch) {
			throw new Error("Invalid username/email or password.");
		}
		const userInfo = unpackPassword(employee_info)
		const permission = await db.query(`SELECT * FROM permission WHERE permission_for = $1 LIMIT 1;`, [employee_info.id])
		const permissionInfo = permission.rows[0];
		// สร้าง JWT
		const token = jwt.sign(
			{
				employee: userInfo,
				permission: permissionInfo,
			},
			JWT_SECRET,
			{ expiresIn: "1h" }
		);
		return {
			token,
			employee: userInfo,
			permission: permissionInfo,
		};
	}

	static async refresh(token: string) {
		const decoded = jwt.verify(
			token,
			JWT_SECRET
		)
		console.log(decoded, 'decoded');
	}
}
