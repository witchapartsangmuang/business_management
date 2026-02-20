import { Request, Response } from "express";
import { KpiService } from "../services/kpi.service";

export class KpiController {
	static async readAll(req: Request, res: Response) {
		try {
			const kpi = await KpiService.readAll();
			return res.status(200).json({
				message: "KPI read successfully",
				kpi,
			});
		} catch (error: any) {
			console.error("Read error:", error);
			return res.status(400).json({ message: error.message || "Bad request" });
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const kpi = await KpiService.createKpi(req.body);
			return res.status(201).json({
				message: "KPI registered successfully",
				kpi,
			});
		} catch (error: any) {
			console.error("Register error:", error);
			if (error?.status && error?.code) {
				return res.status(error.status).json({
					code: error.code,
					message: error.message,
					fields: error.fields,
					errors: error.errors,
				});
			}
			if (error instanceof Error) {
				console.log("BAD_REQUEST");

				return res.status(400).json({
					code: "BAD_REQUEST",
					message: error.message,
				});
			}
			return res.status(500).json({
				code: "INTERNAL_SERVER_ERROR",
				message: "Internal server error.",
			})
		}
	}
	static async update(req: Request, res: Response) {
		try {
			const kpi = await KpiService.updateKpi(req.body);
		} catch (error: any) {
			console.error("Register error:", error);
			return res.status(400).json({ message: error.message || "Bad request" });
		}
	}
}