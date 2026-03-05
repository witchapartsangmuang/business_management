'use client'
import IconPlus from "@/components/icons/icon-plus";
import { Table, TableWrapper, Tbody, Td, Th, Thead, TrBody, TrHead } from "@/components/table/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

import { StrategicMaster, Strategic } from "@/types/types";
import { mdPolicyService } from "@/features/services/md-policy";


export default function Page() {
    const [strategicList, setstrategicList] = useState<(Strategic & Pick<StrategicMaster, "strategic_code" | "strategic_name">)[]>([]);
    async function fetchData() {
        await mdPolicyService.readAll().then((res) => setstrategicList(res.md_policy)).catch(() => (setstrategicList([])))
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="bg-white rounded min-h-[calc(100vh-5rem)]">
            <Link href="/md-policy/new">
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm">
                    <IconPlus size={18} />
                    <span className="ml-1">Add New MD Policy</span>
                </button>
            </Link>
            <TableWrapper>
                <Table>
                    <Thead>
                        <TrHead>
                            <Th>#</Th>
                            <Th>Year</Th>
                            <Th>Strategic Code</Th>
                            <Th>Strategic Name</Th>
                            <Th>strategic Description</Th>
                            <Th>Actions</Th>
                        </TrHead>
                    </Thead>
                    <Tbody>
                        {strategicList.map((strategic, index) => (
                            <TrBody key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{strategic.year_target}</Td>
                                <Td>{strategic.strategic_code}</Td>
                                <Td>{strategic.strategic_name}</Td>
                                <Td>Defines company policies for all employees</Td>
                                <Td>Edit | Delete</Td>
                            </TrBody>
                        ))}
                    </Tbody>
                </Table>
            </TableWrapper>
        </div>
    )
}