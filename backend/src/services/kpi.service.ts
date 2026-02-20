import { db } from "../db";
type Kpi = {
    id: string;
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
async function duplicateCheck(kpi_code: string, kpi_name: string) {
    const duplicateCheck = await db.query(
        `SELECT (kpi_code = $1) AS kpi_code_dup, (kpi_name = $2) AS kpi_name_dup FROM kpi
            WHERE kpi_code = $1 OR kpi_name = $2 LIMIT 1`,
        [kpi_code.trim(), kpi_name.trim()])
    if (duplicateCheck.rows.length > 0) {
        const row = duplicateCheck.rows[0];
        const duplicatedFields: string[] = [];

        if (row.kpi_code_dup) duplicatedFields.push("kpi_code");
        if (row.kpi_name_dup) duplicatedFields.push("kpi_name");

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

export class KpiService {
    static async readAll() {
        const result = await db.query(`SELECT * FROM kpi`)
        return result.rows;
    }

    static async createKpi(data: Kpi) {
        const { kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime } = data
        if (!kpi_code || !kpi_name || !unit) {
            throw {
                status: 400,
                code: "VALIDATION_ERROR",
                message: "Required fields are missing"
            };
        }
        await duplicateCheck(kpi_code.trim(), kpi_name.trim())
        const result = await db.query(
            `INSERT INTO kpi (kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime`,
            [kpi_code.trim(), kpi_name.trim(), description?.trim() || null, unit.trim(), is_active, created_by, created_datetime, updated_by, updated_datetime]
        )
        return result.rows[0];
    }
    static async updateKpi(data: Kpi) {
        const { id, kpi_code, kpi_name, description, unit, is_active, updated_by, updated_datetime } = data;
        if (!id || !kpi_code || !kpi_name || !unit) {
            throw {
                status: 400,
                code: "VALIDATION_ERROR",
                message: "Required fields are missing"
            };
        }
        const result = await db.query(
            `UPDATE kpis SET kpi_code = $1, kpi_name = $2, description = $3, unit = $4, is_active = $5, updated_by = $6, updated_datetime = $7 WHERE id = $8 RETURNING id, kpi_code, kpi_name, description, unit, is_active, created_by, created_datetime, updated_by, updated_datetime`,
            [kpi_code.trim(), kpi_name.trim(), description?.trim() || null, unit.trim(), is_active, updated_by.trim(), updated_datetime, id]
        )
        return result.rows[0];
    }
}