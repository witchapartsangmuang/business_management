import { Table, Tbody, Thead, TableWrapper, TrHead, Th, TrBody, Td } from "@/components/table/Table";

type KpiAlignmentData = {
    policy_id: number;
    policy_code: string;
    policy_name: string;
    operation: string;
    calculate_type: string;
    kpi_target: number;
    kpi_actual: number;
    kpi_unit: string;
    kpi_id: number;
    kpi_code: string;
    kpi_name: string;
    project_id: number;
    project_code: string;
    project_name: string;
    project_kpi_target: number;
    project_kpi_actual: number;
    stage: string;
    grade: string;
    project_leader:number;
    first_name: string;
    last_name: string;
}
const ProjectData: KpiAlignmentData[] = [

];

const mdPolicy = [
    
]

export default function Page() {
    return (
        <div className="bg-white rounded min-h-[calc(100vh-5rem)]">
            <TableWrapper>
                <Table>
                    <Thead>
                        <TrHead>
                            <Th>MD Policy</Th>
                            <Th>KPI</Th>
                            <Th>Unit</Th>
                            <Th>Plan</Th>
                            <Th>Actual</Th>
                            <Th>Project Leader</Th>
                            <Th>Project Code</Th>
                            <Th>Project Name</Th>
                            <Th>KPI</Th>
                            <Th>Plan</Th>
                            <Th>Actual</Th>
                            <Th>Status</Th>
                            <Th>Grade</Th>
                        </TrHead>
                    </Thead>
                    <Tbody>
                        <TrBody>
                            <Td>Increase Customer Satisfaction</Td>
                            <Td>Achieve a Net Promoter Score (NPS) of 50 or higher</Td>
                            <Td>75%</Td>
                        </TrBody>
                        <TrBody>
                            <Td>Expand Market Share</Td>
                            <Td>Increase market share by 10% in the next quarter</Td>
                            <Td>60%</Td>
                        </TrBody>
                        <TrBody>
                            <Td>Improve Employee Engagement</Td>
                            <Td>Achieve an employee engagement score of 80% or higher</Td>
                            <Td>85%</Td>
                        </TrBody>
                    </Tbody>
                </Table>
            </TableWrapper>
        </div>
    )
}