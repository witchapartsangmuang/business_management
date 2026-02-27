// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
	static async register(req: Request, res: Response) {
		try {
			const user = await AuthService.register(req.body);
			return res.status(201).json({
				message: "User registered successfully",
				user,
			});
		} catch (error: any) {
			console.error("Register error:", error);
			return res.status(400).json({ message: error.message || "Bad request" });
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const result = await AuthService.login(req.body);
			res.cookie("access_token", result.access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production", // true บน https
				sameSite: "strict",
				maxAge: 60 * 60 * 1000, // 1 ชั่วโมง
				path: "/",
			})
			return res.status(200).json({
				message: "Login successful",
				...result,
			});
		} catch (error: any) {
			console.error("Login error:", error);
			return res.status(401).json({
				code: "UNAUTHORIZED",
				message: "Invalid username or password.",
			})
		}
	}
	static async refresh(req: Request, res: Response) {
		const result = await AuthService.refresh(req.cookies.auth_token);
		console.log(result, 'result');

	}
	static async logout(req: Request, res: Response) {
		try {
			const refreshToken = req.cookies.auth_token;
			if (!refreshToken) {
				return res.status(200).json({ message: "Already logged out" });
			}
			res.clearCookie("auth_token", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
			});
			return res.status(200).json({
				message: "Logout successful",
			});
		} catch (error) {
			return res.status(500).json({
				message: "Logout failed",
			});
		}
	}
}
