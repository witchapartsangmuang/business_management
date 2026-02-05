import { db } from "../db";
type Policy = {
    id: string;
    policy_code: string;
    policy_name: string;
    description: string | null;
    unit: string;
    is_active: boolean;
    created_by: string;
    created_datetime: Date;
    updated_by: string;
    updated_datetime: Date;
};

export class PolicyService {
    static async readAll() {
        const result = await db.query(`SELECT * FROM kpis`)
        return result.rows;
    }

    static async createKpi(data: Policy) {
        const { policy_code, policy_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime } = data
        if (!policy_code || !policy_name || !description || !unit || is_active === undefined || !created_by || !created_datetime || !updated_by || !updated_datetime) {
            throw new Error("All Policy details are required.");
        }
        const result = await db.query(
            `INSERT INTO kpis (policy_code, policy_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, policy_code, policy_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime`,
            [policy_code.trim(), policy_name.trim(), description?.trim() || null, unit.trim(), is_active, created_by, created_datetime, updated_by, updated_datetime]
        )
        return result.rows[0];
    }
    static async updateKpi(data: Policy) {
        const { id, policy_code, policy_name, description, unit, is_active, updated_by, updated_datetime } = data;
        if (!id || !policy_code || !policy_name || !description || !unit || is_active === undefined || !updated_by || !updated_datetime) {
            throw new Error("All Policy details are required.");
        }
        const result = await db.query(
            `UPDATE kpis SET policy_code = $1, policy_name = $2, description = $3, unit = $4, is_active = $5, updated_by = $6, updated_datetime = $7 WHERE id = $8 RETURNING id, policy_code, policy_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime`,
            [policy_code.trim(), policy_name.trim(), description?.trim() || null, unit.trim(), is_active, updated_by.trim(), updated_datetime, id]
        )
        return result.rows[0];
    }
}