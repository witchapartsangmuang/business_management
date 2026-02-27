import { Table, Tbody, Thead, TableWrapper, TrHead, Th, TrBody, Td } from "@/components/table/Table";
export default function Page() {
    return (
        <div className="bg-white rounded min-h-[calc(100vh-5rem)]">
            <TableWrapper>
                <Table>
                    <Thead>
                        <TrHead>
                            <Th>Objective</Th>
                            <Th>Key Result</Th>
                            <Th>Progress</Th>
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