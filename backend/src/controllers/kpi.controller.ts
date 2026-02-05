import { Request, Response } from "express";
import { KpiService } from "../services/kpi.service";

export class KpiController {
  static async readAll(req: Request, res: Response) {
    try {
      // const kpi = await KpiService.readAll(req.body);
      const kpi = [
        {
          id: 1,
          kpi_code: "SOAR",
          kpi_name: "Strategic Objective Achievement Rate",
          description: "สัดส่วนเป้าหมายเชิงกลยุทธ์ที่บรรลุตามแผนประจำปี",
          unit: "%",
          is_active: false,
        },
        {
          id: 2,
          kpi_code: "CKAAI",
          kpi_name: "Corporate KPI Achievement Index",
          description: "คะแนนเฉลี่ยการบรรลุ KPI ระดับองค์กร",
          unit: "%",
          is_active: true,
        },
        {
          id: 3,
          kpi_code: "KPIC",
          kpi_name: "Key Position Successor Coverage",
          description: "ตำแหน่งสำคัญที่มีผู้สืบทอดพร้อมใช้งาน",
          unit: "%",
          is_active: true,
        },
        {
          id: 4,
          kpi_code: "CRPI",
          kpi_name: "Cost Reduction from Process Improvement",
          description: "มูลค่าการลดต้นทุนจากการปรับปรุงกระบวนการ",
          unit: "MB",
          is_active: true,
        },
        {
          id: 5,
          kpi_code: "DAR",
          kpi_name: "Digital Adoption Rate",
          description: "อัตราการใช้งานระบบดิจิทัลตามที่กำหนด",
          unit: "%",
          is_active: true,
        },
        {
          id: 6,
          kpi_code: "MCRI",
          kpi_name: "Major Compliance & Risk Incident",
          description: "จำนวนเหตุการณ์ความเสี่ยง/ไม่ปฏิบัติตามที่มีผลกระทบร้ายแรง",
          unit: "Case",
          is_active: false,
        },
        {
          id: 7,
          kpi_code: "CSI",
          kpi_name: "Customer Satisfaction Index (CSI)",
          description: "คะแนนความพึงพอใจลูกค้าเฉลี่ยทั้งองค์กร",
          unit: "Score",
          is_active: true,
        },
        {
          id: 8,
          kpi_code: "OTSPD",
          kpi_name: "On-Time Strategic Project Delivery",
          description: "โครงการเชิงกลยุทธ์ที่ส่งมอบตรงเวลา",
          unit: "%",
          is_active: true,
        },
      ]
      return res.status(200).json({
        message: "KPI read successfully",
        kpi,
      });
    } catch (error: any) {
      console.error("Read error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const kpi = await KpiService.createKpi(req.body);
      return res.status(201).json({
        message: "KPI registered successfully",
        kpi,
      });
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const kpi = await KpiService.updateKpi(req.body);
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
}