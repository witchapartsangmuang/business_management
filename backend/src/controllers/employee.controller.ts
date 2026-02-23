import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

export class EmployeeController {
    static async readAll(req: Request, res: Response) {
        try {
            const employee = await EmployeeService.readAll();
            return res.status(200).json({
                message: "Employee read successfully",
                employee,
            });
        } catch (error: any) {
            console.error("Read error:", error);
            return res.status(400).json({ message: error.message || "Bad request" });
        }
    }
    static async readDetail(req: Request, res: Response) {
        try {
            console.log(req.params.id, ": req");
            const employee = await EmployeeService.readDetail(Number(req.params.id))
            return res.status(200).json({
                message: "Employee read successfully",
                employee,
            });
        } catch (error: any) {
            console.log(error, ": error");
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const employee = await EmployeeService.createEmployee(req.body);
            return res.status(201).json({
                message: "Employee registered successfully",
                employee,
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
            const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
            return res.status(200).json({
                message: "Employee updated successfully",
                employee,
            });
        } catch (error: any) {
            console.error("Update error:", error);
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
}