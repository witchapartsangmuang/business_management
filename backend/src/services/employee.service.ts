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
    organizational_unit: null | string;
    report_to: null | number;
    is_active: boolean;
    is_project_leader: boolean;
    is_project_approver: boolean;
    is_project_member: boolean;
    created_by: null | number;
    created_datetime: null | string;
    updated_by: null | number;
    updated_datetime: null | string;
};

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

async function duplicateCheck(emp_code: string, email: string) {
    const duplicateCheck = await db.query(
        `SELECT (emp_code = $1) AS emp_code_dup, (email = $2) AS email_dup FROM employee
            WHERE emp_code = $1 OR email = $2 LIMIT 1`,
        [emp_code.trim(), email.trim()]
    )
    if (duplicateCheck.rows.length > 0) {
        const row = duplicateCheck.rows[0];
        const duplicatedFields: string[] = [];

        if (row.emp_code_dup) duplicatedFields.push("emp_code");
        if (row.email_dup) duplicatedFields.push("email");
        if (row.phone_dup) duplicatedFields.push("phone");

        if (duplicatedFields.length > 0) {
            throw {
                status: 409,
                code: "DUPLICATE_FIELD",
                message: "Value already exist",
                fields: duplicatedFields
            };
        }
    }
}

export class EmployeeService {
    static async readAll() {
        const result = await db.query(`SELECT * FROM employee`)
        return result.rows;
    }

    static async createEmployee(data: { employee: Omit<Employee, "id">, permission: Permission }) {
        const { employee, permission } = data
        const { profile_picture, emp_code, first_name, last_name, description, email, phone, password, position, organizational_unit, report_to, is_active, is_project_leader, is_project_approver, is_project_member, created_by, created_datetime, updated_by, updated_datetime } = employee
        // console.log('createEmployee : ', data);
        if (!emp_code || !first_name || !last_name || !email || !password || !organizational_unit) {
            throw {
                status: 400,
                code: "VALIDATION_ERROR",
                message: "Required fields are missing"
            };
        }
        await duplicateCheck(emp_code.trim(), email.trim())
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await db.query(
            `INSERT INTO employee (profile_picture, emp_code, first_name, last_name, description, email, phone, password, position, organizational_unit, report_to, is_active, is_project_leader, is_project_approver, is_project_member, created_by, created_datetime, updated_by, updated_datetime)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15, $16, $17, $18, $19)
             RETURNING id, profile_picture, emp_code, first_name, last_name, description, email, phone, password, position, organizational_unit, report_to, is_active, is_project_leader, is_project_approver, is_project_member, created_by, created_datetime, updated_by, updated_datetime`,
            [profile_picture?.trim() || null, emp_code.trim(), first_name.trim(), last_name.trim(), description?.trim() || null, email.trim(), phone?.trim() || null, hashedPassword, position?.trim() || null, organizational_unit.trim(), report_to || null, is_active, is_project_leader, is_project_member, is_project_approver, created_by, created_datetime, updated_by, updated_datetime]
        )
        return result.rows[0];
    }
    static async updateEmployee(data: Employee) {
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