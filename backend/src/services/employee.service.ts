import { db } from "../db";
type Kpi = {
    id: number;
    kpi_code: string;
    kpi_name: string;
    description: string | null;
    unit: string;
    is_active: boolean;
    created_by: string;
    created_datetime: Date;
    updated_by: string;
    updated_datetime: Date;
};
type Employee = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    organizational_unit: string;
    position: string;
    approver: number;
    language: string;
    is_active: boolean
    // Role
    is_project_leader: number;
    is_project_member: number;
    is_project_approver: number;
    // Menu Permission
    md_policy_view: boolean,
    kpi_alignment_view: boolean,
    project_view: boolean,
    project_create: boolean,
    project_update: boolean,
    project_delete: boolean,

    report_view: boolean,
    report_update: boolean,
    report_delete: boolean,

    dashboard_executive_view: boolean,
    dashboard_manager_view: boolean,
    dashboard_user_view: boolean,

    admin_view: boolean,

    cost_saving_type_view: boolean,
    cost_saving_type_create: boolean,
    cost_saving_type_update: boolean,
    cost_saving_type_delete: boolean,

    policy_view: boolean,
    policy_create: boolean,
    policy_update: boolean,
    policy_delete: boolean,

    kpi_view: boolean,
    kpi_create: boolean,
    kpi_update: boolean,
    kpi_delete: boolean,

    organizational_unit_view: boolean,
    organizational_unit_create: boolean,
    organizational_unit_update: boolean,
    organizational_unit_delete: boolean,

    employee_view: boolean,
    employee_create: boolean,
    employee_update: boolean,
    employee_delete: boolean

}

export class EmployeeService {
    static async readAll() {
        const result = await db.query(`SELECT * FROM employees`)
        return result.rows;
    }

    static async createKpi(data: Kpi) {
        const { kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime } = data
        if (!kpi_code || !kpi_name || !description || !unit || is_active === undefined || !created_by || !created_datetime || !updated_by || !updated_datetime) {
            throw new Error("All KPI details are required.");
        }
        const result = await db.query(
            `INSERT INTO kpis (kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime`,
            [kpi_code.trim(), kpi_name.trim(), description?.trim() || null, unit.trim(), is_active, created_by, created_datetime, updated_by, updated_datetime]
        )
        return result.rows[0];
    }
    static async updateKpi(data: Kpi) {
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