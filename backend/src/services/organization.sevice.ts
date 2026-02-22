import { db } from "../db";


export class OrganizationService {
    // Organization Level
    static async organizationLevelReadAll() {
        const result = await db.query(`SELECT * FROM organization_structure_level`)
        return result.rows;
    }

    // Organization Structure
    static async organizationStructureReadAll() {
        const result = await db.query(`SELECT * FROM organization_structure`)
        return result.rows;
    }
    
}