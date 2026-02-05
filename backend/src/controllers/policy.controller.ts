import { Request, Response } from "express";
import { PolicyService } from "../services/policy.service";

export class PolicyController {
  static async readAll(req: Request, res: Response) {
    try {
      // const kpi = await PolicyService.readAll(req.body);
      const policy = [
        {
          id: 1,
          policy_code: "SD&SG",
          policy_name: "Strategic Direction & Sustainable Growth Policy",
          description: "นโยบายทิศทางกลยุทธ์และการเติบโตอย่างยั่งยืน",
          is_active: true,
        },
        {
          id: 2,
          policy_code: "PRM",
          policy_name: "Performance & Result-Oriented Management Policy",
          description: "นโยบายการบริหารจัดการที่มุ่งเน้นผลงาน",
          is_active: true,
        },
        {
          id: 3,
          policy_code: "PLS",
          policy_name: "People, Leadership & Successor Development Policy",
          description: "นโยบายบุคลากรและผู้นำ",
          is_active: true,
        },
        {
          id: 4,
          policy_code: "PE&CE",
          policy_name: "Process Excellence & Cost Efficiency Policy",
          description: "นโยบายการพัฒนากระบวนการและต้นทุน",
          is_active: true,
        },
        {
          id: 5,
          policy_code: "DT&TE",
          policy_name: "Digital Transformation & Technology Enablement Policy",
          description: "นโยบายดิจิทัลและเทคโนโลยี",
          is_active: true,
        },
        {
          id: 6,
          policy_code: "GRC",
          policy_name: "Governance, Risk & Compliance Policy",
          description: "นโยบายธรรมาภิบาลและการกำกับดูแล",
          is_active: true,
        },
        {
          id: 7,
          policy_code: "CSV",
          policy_name: "Customer & Stakeholder Value Policy",
          description: "นโยบายคุณค่าลูกค้าและผู้มีส่วนได้ส่วนเสีย",
          is_active: false,
        },
        {
          id: 8,
          policy_code: "EDA",
          policy_name: "Execution Discipline & Accountability Policy",
          description: "นโยบายวินัยการปฏิบัติและความรับผิดชอบ",
          is_active: false,
        },
      ]
      return res.status(200).json({
        message: "KPI read successfully",
        policy,
      });
    } catch (error: any) {
      console.error("Read error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const kpi = await PolicyService.createKpi(req.body);
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
      const kpi = await PolicyService.updateKpi(req.body);
    } catch (error: any) {
      console.error("Register error:", error);
      return res.status(400).json({ message: error.message || "Bad request" });
    }
  }
}