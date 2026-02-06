'use client'
import IconEyeOpen from "@/components/icons/icon-eye-open";
import IconList from "@/components/icons/icon-list";
import IconSearch from "@/components/icons/icon-search";
import { TableWrapper, Table, Thead, TrHead, Th, Tbody, TrBody, Td } from "@/components/table/Table";
import { ProjectInfo } from "@/types/project";
import { useState } from "react";
export default function ReportPage() {
    const [fieldList, setFieldList] = useState(['No.', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date', 'Project No.', 'Project Name', 'Start Date', 'End Date'])
    const [projectList, setProjectList] = useState<ProjectInfo[]>([
        {
            project_id: "",
            project_name: "",
            md_policy: 0,
            project_leader: "",
            project_org: "",
            start_date: "",
            end_date: "",
            step: "Registed",
            status: null,
            // For Revise
            end_date_rev: "",
            opportunity_statement: "",
            est_investment: 0,
            // For Revise
            est_investment_rev: 0,
            est_gross_earnings: 0,
            payback_period_year: 0,
            return_on_investment: 0,
            project_approver: "",
            grade_quality: "",
            grade_reason: ""
        }
    ])
    return (
        <div className="bg-white rounded p-2 min-h-[calc(100vh-5rem)]">
            <div className="border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold mb-2">Project Report</h2>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex w-full max-w-xl items-center gap-2">
                        <button className="bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded"><IconList className="h-6 w-6" size={24} /></button>
                        <div className="relative flex-1">
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <IconSearch size={18} />
                            </span>
                            <input className="form-input pr-3 pl-10 " placeholder="Search" />
                        </div>
                        <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm">
                            <IconSearch size={18} />
                            <span className="ml-1">Search</span>
                        </button>
                    </div>
                </div>
            </div>
            <TableWrapper overflow >
                <Table>
                    <Thead>
                        <TrHead>
                            <Th sticky={"left"}>No.</Th>
                            {
                                fieldList.map((fieldName, index) => (
                                    <Th key={`${index}-fieldName-${fieldName}`}>{fieldName}</Th>
                                ))
                            }
                            <Th sticky={"right"}>Actions</Th>
                        </TrHead>
                    </Thead>
                    <Tbody>
                        {
                            projectList.map((project, index) => (
                                <TrBody key={`projectList-${index}`}>
                                    <Td>{project.project_id}</Td>
                                    <Td>{project.project_name}</Td>
                                    <Td>{project.project_name}</Td>
                                    <Td>{project.start_date}</Td>
                                    <Td>{project.end_date}</Td>
                                    <Td>{project.project_leader}</Td>
                                    <Td>{project.project_approver}</Td>
                                    <Td>{project.step}</Td>
                                    <Td>{project.status}</Td>
                                    <Td sticky={"right"}>
                                        <div>
                                            <button className="icon-button w-auto" onClick={() => { }}><IconEyeOpen className="text-gray-400" size={18} /></button>
                                        </div>
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