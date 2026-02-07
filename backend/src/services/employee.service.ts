import { db } from "../db";
import bcrypt from "bcrypt";
export type Employee = {
    id: null | number;
    profile_picture: null | string;
    emp_code: string;
    first_name: string;
    last_name: string;
    description: string;
    email: string;
    phone: string;
    password: string;
    position: string;
    organizational_unit: string;
    report_to: null | number;
    language: string;
    is_active: boolean;
    is_project_leader: boolean;
    is_project_approver: boolean;
    is_project_member: boolean;
    created_by: null | number;
    created_datetime: null | string;
    updated_by: null | number;
    updated_datetime: null | string;
}
export type Permission = {
    id: null | number;
    md_policy_view: boolean;
    kpi_alignment_view: boolean;
    project_view: boolean;
    project_create: boolean;
    project_update: boolean;
    project_delete: boolean;
    report_view: boolean;
    report_update: boolean;
    report_delete: boolean;
    dashboard_executive_view: boolean;
    dashboard_manager_view: boolean;
    dashboard_user_view: boolean;
    admin_view: boolean;
    cost_saving_type_view: boolean;
    cost_saving_type_create: boolean;
    cost_saving_type_update: boolean;
    cost_saving_type_delete: boolean;
    policy_view: boolean;
    policy_create: boolean;
    policy_update: boolean;
    policy_delete: boolean;
    kpi_view: boolean;
    kpi_create: boolean;
    kpi_update: boolean;
    kpi_delete: boolean;
    organizational_unit_view: boolean;
    organizational_unit_create: boolean;
    organizational_unit_update: boolean;
    organizational_unit_delete: boolean;
    employee_view: boolean;
    employee_create: boolean;
    employee_update: boolean;
    employee_delete: boolean
    permission_for: null | number;
}

function generatePassword() {

}

export class EmployeeService {
    static async readAll() {
        const result = await db.query(`SELECT * FROM employee`)
        return result.rows;
    }


    static async createEmployee(data: Employee) {
        const { profile_picture, emp_code, first_name, last_name, description, email, phone, password, position, organizational_unit, report_to, language, is_active, is_project_leader, is_project_approver, is_project_member, created_by, created_datetime, updated_by, updated_datetime } = data
        console.log('createEmployee : ', data);
        // const hashedPassword = await bcrypt.hash(password, 10)
        if (!emp_code || !first_name || !last_name || !email || !password || !organizational_unit) {
            throw new Error("All employee details are required.");
        }

        // const result = await db.query(
        //     `INSERT INTO employees (emp_code, first_name, last_name, description, email, phone, organizational_unit, position, approver, language, is_active, is_project_leader, is_project_member, is_project_approver, created_by, created_datetime, updated_by, updated_datetime)
        //      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15, $16, $17, $18)
        //      RETURNING id, emp_code, first_name, last_name, description, email, phone, password, organizational_unit, position, approver, language, is_active, is_project_leader, is_project_member, is_project_approver, created_by, created_datetime, updated_by, updated_datetime`,
        //     [emp_code.trim(), first_name.trim(), last_name.trim(), description?.trim() || null, email.trim(), phone.trim() || null, organizational_unit.trim(), position.trim(), approver.trim(), language.trim(), is_active, is_project_leader, is_project_member, is_project_approver, created_by, created_datetime, updated_by, updated_datetime]
        // )

        // const result = await db.query(
        //     `INSERT INTO employee (emp_code, first_name, last_name)
        //     VALUES ($1, $2, $3)
        //     RETURNING id, emp_code, first_name, last_name`,
        //     [emp_code.trim(), first_name.trim(), last_name.trim()]
        // )
        // return result.rows[0];
        return "gg"
    }
    static async updateEmployee(data: Kpi) {
        const { id, kpi_code, kpi_name, description, unit, is_active, updated_by, updated_datetime } = data;
        if (!id || !kpi_code || !kpi_name || !description || !unit || is_active === undefined || !updated_by || !updated_datetime) {
            throw new Error("All KPI details are required.");
        }
        const result = await db.query(
            `UPDATE kpis SET kpi_code = $1, kpi_name = $2, description = $3, unit = $4, is_active = $5, updated_by = $6, updated_datetime = $7 WHERE id = $8 RETURNING id, kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime`,
            [kpi_code.trim(), kpi_name.trim(), description?.trim() || null, unit.trim(), is_active, updated_by.trim(), updated_datetime, id]
        )
        return result.rows[0];
    }
}