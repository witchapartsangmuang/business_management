import { db } from "../db";

export class CompanyService {
    static async register(data: { companyNo: string; companyName: string; licenseType: string; totalUser: number; createdDate: Date }) {
        const { companyNo, companyName, licenseType, totalUser, createdDate } = data;
        if (!companyNo || !companyName || !licenseType || !totalUser || !createdDate) {
            throw new Error("All company details are required.");
        }
        const result = await db.query(
            `INSERT INTO companies (company_no, company_name, license_type, total_user, created_date)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, company_no, company_name, license_type, total_user, created_date`,
            [companyNo, companyName, licenseType, totalUser, createdDate]
        )
        return result.rows[0];
    }
    static async getAllCompanies() {
        const result = await db.query(
            `SELECT id, company_no, company_name, license_type, total_user, created_date
             FROM companies`
        );
        return result.rows;
    }
    static async getCompanyById(id: number) {
        const result = await db.query(
            `SELECT id, company_no, company_name, license_type, total_user, created_date
             FROM companies
             WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }
    static async updateCompany(id: number, data: { companyNo?: string; companyName?: string; licenseType?: string; totalUser?: number; createdDate?: Date;[key: string]: string | number | Date | undefined }) {

        const fields: string[] = [];
        const values: any[] = [];
        let index = 1;

        // สร้าง dynamic fields
        for (const key in data) {
            if (data[key] !== undefined) {
                fields.push(`${key} = $${index}`);
                values.push(data[key]);
                index++;
            }
        }

        if (fields.length === 0) {
            throw new Error("No fields to update");
        }

        // เพิ่ม id เป็น parameter ตัวสุดท้าย
        values.push(id);

        const result = await db.query(
            `UPDATE companies SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`, values);

        return result.rows[0];
    }
    static async deleteCompany(id: number) {
        await db.query(
            `DELETE FROM companies
             WHERE id = $1`,
            [id]
        );
    }
}