'use client';

import { Table, TableWrapper, Tbody, Td, Th, Thead, TrBody, TrHead } from "@/components/table/Table";
import { OrganizationLevel } from "@/types/types";
import { useState } from "react";

export default function StructureLevelPage() {
    const [structureLevel, setstructureLevel] = useState<OrganizationLevel[]>([
        { id: 1, org_level_name: "Company", level: 1, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 2, org_level_name: "Business Unit", level: 2, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 3, org_level_name: "Division", level: 3, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 4, org_level_name: "Department", level: 4, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 5, org_level_name: "Section", level: 5, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null }
    ])

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <TableWrapper>
                <Table>
                    <Thead>
                        <TrHead>
                            <Th>Level</Th>
                            <Th>Org Level Name</Th>
                        </TrHead>
                    </Thead>
                    <Tbody>
                        {
                            structureLevel.map((org) => (
                                <TrBody key={`${org.level}-${org}`}>
                                    <Td>{org.level}</Td>
                                    <Td>{org.org_level_name}</Td>
                                    <Td>
                                        <button>Edit</button>
                                        <button>Del</button>
                                    </Td>
                                </TrBody>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableWrapper>
        </div>
    )
}