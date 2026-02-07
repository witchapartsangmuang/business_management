import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

export class EmployeeController {
    static async readAll(req: Request, res: Response) {
        try {
            // const kpi = await EmployeeService.readAll(req.body);
            const employee = [
                {
                    "id": 1,
                    "first_name": "Anan",
                    "last_name": "Suksomboon",
                    "email": "anan@company.com",
                    "phone": "0811111111",
                    "password": "hashed_password_1",
                    "organizational_unit": "Executive Office",
                    "position": "CEO",
                    "approver": 0,
                    "language": "th",
                    "is_active": true,

                    "is_project_leader": 1,
                    "is_project_member": 0,
                    "is_project_approver": 1,

                    "md_policy_view": true,
                    "kpi_alignment_view": true,
                    "project_view": true,
                    "project_create": false,
                    "project_update": false,
                    "project_delete": false,

                    "report_view": true,
                    "report_update": false,
                    "report_delete": false,

                    "dashboard_executive_view": true,
                    "dashboard_manager_view": false,
                    "dashboard_user_view": false,

                    "admin_view": false,

                    "cost_saving_type_view": true,
                    "cost_saving_type_create": false,
                    "cost_saving_type_update": false,
                    "cost_saving_type_delete": false,

                    "policy_view": true,
                    "policy_create": false,
                    "policy_update": false,
                    "policy_delete": false,

                    "kpi_view": true,
                    "kpi_create": false,
                    "kpi_update": false,
                    "kpi_delete": false,

                    "organizational_unit_view": true,
                    "organizational_unit_create": false,
                    "organizational_unit_update": false,
                    "organizational_unit_delete": false,

                    "employee_view": true,
                    "employee_create": false,
                    "employee_update": false,
                    "employee_delete": false
                },
                {
                    "id": 2,
                    "first_name": "Somsak",
                    "last_name": "Manager",
                    "email": "somsak@company.com",
                    "phone": "0822222222",
                    "password": "hashed_password_2",
                    "organizational_unit": "Strategy Department",
                    "position": "Department Manager",
                    "approver": 1,
                    "language": "th",
                    "is_active": true,

                    "is_project_leader": 1,
                    "is_project_member": 1,
                    "is_project_approver": 1,

                    "md_policy_view": true,
                    "kpi_alignment_view": true,
                    "project_view": true,
                    "project_create": true,
                    "project_update": true,
                    "project_delete": false,

                    "report_view": true,
                    "report_update": true,
                    "report_delete": false,

                    "dashboard_executive_view": false,
                    "dashboard_manager_view": true,
                    "dashboard_user_view": false,

                    "admin_view": false,

                    "cost_saving_type_view": true,
                    "cost_saving_type_create": true,
                    "cost_saving_type_update": true,
                    "cost_saving_type_delete": false,

                    "policy_view": true,
                    "policy_create": true,
                    "policy_update": true,
                    "policy_delete": false,

                    "kpi_view": true,
                    "kpi_create": true,
                    "kpi_update": true,
                    "kpi_delete": false,

                    "organizational_unit_view": true,
                    "organizational_unit_create": false,
                    "organizational_unit_update": false,
                    "organizational_unit_delete": false,

                    "employee_view": true,
                    "employee_create": false,
                    "employee_update": true,
                    "employee_delete": false
                },
                {
                    "id": 3,
                    "first_name": "Pim",
                    "last_name": "Officer",
                    "email": "pim@company.com",
                    "phone": "0833333333",
                    "password": "hashed_password_3",
                    "organizational_unit": "PMO",
                    "position": "Project Officer",
                    "approver": 2,
                    "language": "en",
                    "is_active": true,

                    "is_project_leader": 0,
                    "is_project_member": 1,
                    "is_project_approver": 0,

                    "md_policy_view": true,
                    "kpi_alignment_view": true,
                    "project_view": true,
                    "project_create": true,
                    "project_update": true,
                    "project_delete": false,

                    "report_view": true,
                    "report_update": true,
                    "report_delete": false,

                    "dashboard_executive_view": false,
                    "dashboard_manager_view": false,
                    "dashboard_user_view": true,

                    "admin_view": false,

                    "cost_saving_type_view": true,
                    "cost_saving_type_create": false,
                    "cost_saving_type_update": false,
                    "cost_saving_type_delete": false,

                    "policy_view": true,
                    "policy_create": false,
                    "policy_update": false,
                    "policy_delete": false,

                    "kpi_view": true,
                    "kpi_create": false,
                    "kpi_update": true,
                    "kpi_delete": false,

                    "organizational_unit_view": true,
                    "organizational_unit_create": false,
                    "organizational_unit_update": false,
                    "organizational_unit_delete": false,

                    "employee_view": true,
                    "employee_create": false,
                    "employee_update": false,
                    "employee_delete": false
                },
                {
                    "id": 4,
                    "first_name": "Nok",
                    "last_name": "HR",
                    "email": "nok@company.com",
                    "phone": "0844444444",
                    "password": "hashed_password_4",
                    "organizational_unit": "Human Resources",
                    "position": "HR Officer",
                    "approver": 2,
                    "language": "th",
                    "is_active": true,

                    "is_project_leader": 0,
                    "is_project_member": 0,
                    "is_project_approver": 0,

                    "md_policy_view": true,
                    "kpi_alignment_view": false,
                    "project_view": false,
                    "project_create": false,
                    "project_update": false,
                    "project_delete": false,

                    "report_view": false,
                    "report_update": false,
                    "report_delete": false,

                    "dashboard_executive_view": false,
                    "dashboard_manager_view": false,
                    "dashboard_user_view": false,

                    "admin_view": false,

                    "cost_saving_type_view": false,
                    "cost_saving_type_create": false,
                    "cost_saving_type_update": false,
                    "cost_saving_type_delete": false,

                    "policy_view": true,
                    "policy_create": true,
                    "policy_update": true,
                    "policy_delete": false,

                    "kpi_view": false,
                    "kpi_create": false,
                    "kpi_update": false,
                    "kpi_delete": false,

                    "organizational_unit_view": true,
                    "organizational_unit_create": true,
                    "organizational_unit_update": true,
                    "organizational_unit_delete": false,

                    "employee_view": true,
                    "employee_create": true,
                    "employee_update": true,
                    "employee_delete": false
                },
                {
                    "id": 5,
                    "first_name": "Admin",
                    "last_name": "System",
                    "email": "admin@company.com",
                    "phone": "0899999999",
                    "password": "hashed_password_admin",
                    "organizational_unit": "IT",
                    "position": "System Admin",
                    "approver": 0,
                    "language": "en",
                    "is_active": true,

                    "is_project_leader": 1,
                    "is_project_member": 1,
                    "is_project_approver": 1,

                    "md_policy_view": true,
                    "kpi_alignment_view": true,
                    "project_view": true,
                    "project_create": true,
                    "project_update": true,
                    "project_delete": true,

                    "report_view": true,
                    "report_update": true,
                    "report_delete": true,

                    "dashboard_executive_view": true,
                    "dashboard_manager_view": true,
                    "dashboard_user_view": true,

                    "admin_view": true,

                    "cost_saving_type_view": true,
                    "cost_saving_type_create": true,
                    "cost_saving_type_update": true,
                    "cost_saving_type_delete": true,

                    "policy_view": true,
                    "policy_create": true,
                    "policy_update": true,
                    "policy_delete": true,

                    "kpi_view": true,
                    "kpi_create": true,
                    "kpi_update": true,
                    "kpi_delete": true,

                    "organizational_unit_view": true,
                    "organizational_unit_create": true,
                    "organizational_unit_update": true,
                    "organizational_unit_delete": true,

                    "employee_view": true,
                    "employee_create": true,
                    "employee_update": true,
                    "employee_delete": true
                }
            ]

            return res.status(200).json({
                message: "Employee read successfully",
                employee,
            });
        } catch (error: any) {
            console.error("Read error:", error);
            return res.status(400).json({ message: error.message || "Bad request" });
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
            return res.status(400).json({ message: error.message || "Bad request" });
        }
    }
    static async update(req: Request, res: Response) {
        try {
            const kpi = await EmployeeService.updateEmployee(req.body);
        } catch (error: any) {
            console.error("Register error:", error);
            return res.status(400).json({ message: error.message || "Bad request" });
        }
    }
}