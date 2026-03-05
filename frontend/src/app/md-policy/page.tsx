'use client'
import IconPlus from "@/components/icons/icon-plus";
import { Table, TableWrapper, Tbody, Td, Th, Thead, TrBody, TrHead } from "@/components/table/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

import { StrategicMaster, Strategic } from "@/types/types";
import { mdPolicyService } from "@/features/services/md-policy";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const [strategicList, setstrategicList] = useState<(Strategic & Pick<StrategicMaster, "strategic_code" | "strategic_name">)[]>([]);
    async function fetchData() {
        await mdPolicyService.readAll().then((res) => setstrategicList(res.md_policy)).catch(() => (setstrategicList([])))
    }
    async function deleteStrategic(id: number) {
        await mdPolicyService.delete(id).then(() => fetchData()).catch(() => (setstrategicList([])))
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
                                <Td>
                                    <button className="text-blue-600 hover:text-blue-800" onClick={() => router.push(`/md-policy/${strategic.id}`)}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteStrategic(strategic.id!)} className="ml-2 text-red-600 hover:text-red-800">
                                        Delete
                                    </button>
                                </Td>
                            </TrBody>
                        ))}
                    </Tbody>
                </Table>
            </TableWrapper>
        </div>
    )
}