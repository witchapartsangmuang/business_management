import { db } from "../db";
import bcrypt from "bcrypt";
import { Employee, Permission } from "../types/types";


async function duplicateCheck(emp_code: string, email: string) {
    const duplicateCheck = await db.query(
        `SELECT (emp_code = $1) AS emp_code_dup, (email = $2) AS email_dup FROM employee
            WHERE emp_code = $1 OR email = $2 LIMIT 1`,
        [emp_code.trim(), email.trim()])
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
    static async readDetail(id: number) {
        if (!id) {
            throw {
                status: 400,
                code: "VALIDATION_ERROR",
                message: "missing id for find data"
            };
        }
        const result = await db.query(`SELECT * FROM employee WHERE id = $1;`, [id])
        const { password, ...employeeObj } = result.rows[0]
        return employeeObj
    }
    static async createEmployee(data: { employee: Omit<Employee, "id">, permission: Omit<Permission, "id"> }) {
        const { employee, permission } = data
        const { profile_picture, emp_code, first_name, last_name, description, email, phone, password, position, organizational_unit,
            report_to, is_active, is_project_leader, is_project_approver, is_project_member, created_by, created_datetime, updated_by, updated_datetime } = employee
        const { md_policy_view, kpi_alignment_view, project_view, project_create, project_update, project_delete, report_view,
            report_update, report_delete, dashboard_view, dashboard_executive_view, dashboard_manager_view, dashboard_user_view, admin_view, cost_saving_type_view,
            cost_saving_type_create, cost_saving_type_update, cost_saving_type_delete, policy_view, policy_create, policy_update, policy_delete, kpi_view,
            kpi_create, kpi_update, kpi_delete, organizational_unit_view, organizational_unit_create, organizational_unit_update, organizational_unit_delete,
            employee_view, employee_create, employee_update, employee_delete, permission_for } = permission
        if (!emp_code || !first_name || !last_name || !email || !password || !organizational_unit) {
            throw {
                status: 400,
                code: "VALIDATION_ERROR",
                message: "Required fields are missing"
            };
        }
        await duplicateCheck(emp_code.trim(), email.trim())
        const hashedPassword = await bcrypt.hash(password, 10)
        const employeeCreated = await db.query(
            `INSERT INTO employee (profile_picture, emp_code, first_name, last_name, description, email, phone, 
            password, position, organizational_unit, report_to, is_active, is_project_leader, is_project_approver, 
            is_project_member, created_by, created_datetime, updated_by, updated_datetime)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING *;`,
            [profile_picture?.trim() || null, emp_code.trim(), first_name.trim(), last_name.trim(), description?.trim() || null, email.trim(),
            phone?.trim() || null, hashedPassword, position?.trim() || null, organizational_unit.trim(), report_to || null, is_active,
                is_project_leader, is_project_member, is_project_approver, created_by, created_datetime, updated_by, updated_datetime])
        const permissionCreated = await db.query(
            `INSERT INTO permission (md_policy_view, kpi_alignment_view, project_view, project_create, project_update, project_delete,
            report_view, report_update, report_delete, dashboard_view, dashboard_executive_view, dashboard_manager_view, dashboard_user_view,
            admin_view, cost_saving_type_view, cost_saving_type_create, cost_saving_type_update, cost_saving_type_delete, policy_view, 
            policy_create, policy_update, policy_delete, kpi_view, kpi_create, kpi_update, kpi_delete, organizational_unit_view, 
            organizational_unit_create, organizational_unit_update, organizational_unit_delete, employee_view, employee_create, 
            employee_update, employee_delete, permission_for)
            VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35)
            RETURNING *;`,
            [md_policy_view, kpi_alignment_view, project_view, project_create, project_update, project_delete, report_view, report_update,
                report_delete, dashboard_executive_view, dashboard_manager_view, dashboard_view, dashboard_user_view, admin_view, cost_saving_type_view,
                cost_saving_type_create, cost_saving_type_update, cost_saving_type_delete, policy_view, policy_create, policy_update,
                policy_delete, kpi_view, kpi_create, kpi_update, kpi_delete, organizational_unit_view, organizational_unit_create,
                organizational_unit_update, organizational_unit_delete, employee_view, employee_create, employee_update, employee_delete, employeeCreated.rows[0].id])
        return { employee: { ...employeeCreated.rows[0], password: "" }, permission: permissionCreated.rows[0] }

    }

    static async updateEmployee(id: string, data: { employee: Employee, permission: Permission }) {
        console.log(data);
        const { employee, permission } = data
        const { profile_picture, emp_code, first_name, last_name, description, email, phone, password, position, organizational_unit,
            report_to, is_active, is_project_leader, is_project_approver, is_project_member, created_by, created_datetime, updated_by, updated_datetime } = employee
        const { md_policy_view, kpi_alignment_view, project_view, project_create, project_update, project_delete, report_view,
            report_update, report_delete, dashboard_view, dashboard_executive_view, dashboard_manager_view, dashboard_user_view, admin_view, cost_saving_type_view,
            cost_saving_type_create, cost_saving_type_update, cost_saving_type_delete, policy_view, policy_create, policy_update, policy_delete, kpi_view,
            kpi_create, kpi_update, kpi_delete, organizational_unit_view, organizational_unit_create, organizational_unit_update, organizational_unit_delete,
            employee_view, employee_create, employee_update, employee_delete, permission_for } = permission
        if (!emp_code || !first_name || !last_name || !email || !organizational_unit) {
            throw {
                status: 400,
                code: "VALIDATION_ERROR",
                message: "Required fields are missing"
            };
        }
        await duplicateCheck(emp_code.trim(), email.trim())

        const employeeUpdated = await db.query(`
            UPDATE employee SET
            profile_picture = $1,
            emp_code = $2,
            first_name = $3,
            last_name = $4,
            description = $5,
            email = $6,
            phone = $7,
            position = $8,
            organizational_unit = $9,
            report_to = $10,
            is_active = $11,
            is_project_leader = $12,
            is_project_approver = $13,
            is_project_member = $14,
            updated_by = $15,
            updated_datetime = $16
            WHERE id = $17
            RETURNING *;
            `,
            [
                profile_picture?.trim() || null,
                emp_code.trim(),
                first_name.trim(),
                last_name.trim(),
                description?.trim() || null,
                email.trim(),
                phone?.trim() || null,
                position?.trim() || null,
                organizational_unit.trim(),
                report_to || null,
                is_active,
                is_project_leader,
                is_project_approver,
                is_project_member,
                updated_by,
                updated_datetime,
                id
            ]
        );
        const permissionUpdated = await db.query(
            `UPDATE permission SET
            md_policy_view = $1,
            kpi_alignment_view = $2,
            project_view = $3,
            project_create = $4,
            project_update = $5,
            project_delete = $6,
            report_view = $7,
            report_update = $8,
            report_delete = $9,
            dashboard_view = $10,
            dashboard_executive_view = $11,
            dashboard_manager_view = $12,
            dashboard_user_view = $13,
            admin_view = $14,
            cost_saving_type_view = $15,
            cost_saving_type_create = $16,
            cost_saving_type_update = $17,
            cost_saving_type_delete = $18,
            policy_view = $19,
            policy_create = $20,
            policy_update = $21,
            policy_delete = $22,
            kpi_view = $23,
            kpi_create = $24,
            kpi_update = $25,
            kpi_delete = $26,
            organizational_unit_view = $27,
            organizational_unit_create = $28,
            organizational_unit_update = $29,
            organizational_unit_delete = $30,
            employee_view = $31,
            employee_create = $32,
            employee_update = $33,
            employee_delete = $34
            WHERE permission_for = $35
            RETURNING *;
            `,
            [
                md_policy_view,
                kpi_alignment_view,
                project_view,
                project_create,
                project_update,
                project_delete,
                report_view,
                report_update,
                report_delete,
                dashboard_view,
                dashboard_executive_view,
                dashboard_manager_view,
                dashboard_user_view,
                admin_view,
                cost_saving_type_view,
                cost_saving_type_create,
                cost_saving_type_update,
                cost_saving_type_delete,
                policy_view,
                policy_create,
                policy_update,
                policy_delete,
                kpi_view,
                kpi_create,
                kpi_update,
                kpi_delete,
                organizational_unit_view,
                organizational_unit_create,
                organizational_unit_update,
                organizational_unit_delete,
                employee_view,
                employee_create,
                employee_update,
                employee_delete,
                id
            ]
        );
        return { employee: { ...employeeUpdated.rows[0], password: "" }, permission: permissionUpdated.rows[0] }
    }
}