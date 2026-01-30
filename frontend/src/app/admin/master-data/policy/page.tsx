"use client"

import IconArchive from "@/components/icons/icon-archive";
import IconShare from "@/components/icons/icon-share";
import { useState } from "react";

export default function PolicyPage() {
    const [policyList, setPolicyList] = useState([
        {
            id: 1,
            code: "SD&SG",
            name: "Strategic Direction & Sustainable Growth Policy",
            description: "นโยบายทิศทางกลยุทธ์และการเติบโตอย่างยั่งยืน",
            isActive: true,
        },
        {
            id: 2,
            code: "PRM",
            name: "Performance & Result-Oriented Management Policy",
            description: "นโยบายการบริหารจัดการที่มุ่งเน้นผลงาน",
            isActive: true,
        },
        {
            id: 3,
            code: "PLS",
            name: "People, Leadership & Successor Development Policy",
            description: "นโยบายบุคลากรและผู้นำ",
            isActive: true,
        },
        {
            id: 4,
            code: "PE&CE",
            name: "Process Excellence & Cost Efficiency Policy",
            description: "นโยบายการพัฒนากระบวนการและต้นทุน",
            isActive: true,
        },
        {
            id: 5,
            code: "DT&TE",
            name: "Digital Transformation & Technology Enablement Policy",
            description: "นโยบายดิจิทัลและเทคโนโลยี",
            isActive: true,
        },
        {
            id: 6,
            code: "GRC",
            name: "Governance, Risk & Compliance Policy",
            description: "นโยบายธรรมาภิบาลและการกำกับดูแล",
            isActive: true,
        },
        {
            id: 7,
            code: "CSV",
            name: "Customer & Stakeholder Value Policy",
            description: "นโยบายคุณค่าลูกค้าและผู้มีส่วนได้ส่วนเสีย",
            isActive: false,
        },
        {
            id: 8,
            code: "EDA",
            name: "Execution Discipline & Accountability Policy",
            description: "นโยบายวินัยการปฏิบัติและความรับผิดชอบ",
            isActive: false,
        },
    ]);
    return (
        <div className="bg-white rounded p-2 min-h-[calc(100vh-5rem)]">
            {/* <ul className="flex">
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Leader" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Leader")}>Project Leader</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Approver" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Approver")}>Project Approver</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Team Member" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Team Member")}>Team Member</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Sponsor" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Sponsor")}>Project Sponsor</button></li>
            </ul> */}
            <div className="flex w-full justify-between my-2">
                <ul className="flex ">
                    <li className="p-0.5"><button className="border rounded-md px-3 h-full text-nowrap">All</button></li>
                    <li className="p-0.5"><button className="border rounded-md px-3 h-full text-nowrap">Active</button></li>
                    <li className="p-0.5"><button className="border rounded-md px-3 h-full text-nowrap">Inactive</button></li>
                </ul>
                <div className="flex w-full justify-between">
                    <div className="flex items-center">
                        {/* <Link href="/project/new">
                            <button className="flex items-center rounded px-[0.5rem] py-[0.25rem] bg-gray-200 hover:bg-gray-300"><IconPlus className="h-6 w-6" size={24} /><span className="ml-1">New</span></button>
                        </Link> */}
                    </div>
                    <div className="flex">
                        <div className="flex items-center mr-0.5 p-1">
                            {/* <button className="bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded"><IconList className="h-6 w-6" size={24} /></button> */}
                        </div>
                        <input className="form-input" type="text" />
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Policy Code</th>
                            <th>Policy Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            policyList.map((policy, index) => (
                                <tr key={policy.id}>
                                    <td>{index + 1}.</td>
                                    <td>{policy.code}</td>
                                    <td>{policy.name}</td>
                                    <td>{policy.description}</td>
                                    <td>
                                        {
                                            policy.isActive ? (
                                                <button className="danger-button w-auto"><IconArchive className="text-red-200" size={24} /></button>
                                            ) : (
                                                <button className="danger-button w-auto"><IconShare className="text-red-200" size={24} /></button>
                                            )
                                        }
                                        
                                    </td>
                                </tr>
                            ))}
                        {/* <tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr> */}
                    </tbody>
                </table>
            </div>
            <nav className="mt-4 flex items-center justify-between gap-3" aria-label="Pagination">
                {/* <!-- Left: summary --> */}
                <div className="text-sm text-gray-600">
                    Showing <span className="font-medium text-gray-900">1</span> to
                    <span className="font-medium text-gray-900">10</span> of
                    <span className="font-medium text-gray-900">128</span> results
                </div>

                {/* <!-- Right: controls --> */}
                <div className="flex items-center gap-2">
                    {/* <!-- Rows per page --> */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-600">Rows:</label>
                        <select
                            id="pageSize"
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>

                    {/* <!-- Prev --> */}
                    <button
                        className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                        aria-label="Previous page"
                        type="button"
                    >
                        Prev
                    </button>

                    {/* <!-- Page numbers --> */}
                    <div className="flex items-center gap-1" role="list">
                        <button
                            type="button"
                            className="min-w-9 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm text-white"
                            aria-current="page"
                        >
                            1
                        </button>
                        <button
                            type="button"
                            className="min-w-9 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            2
                        </button>
                        <button
                            type="button"
                            className="min-w-9 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            3
                        </button>

                        <span className="px-2 text-gray-500">…</span>

                        <button
                            type="button"
                            className="min-w-9 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            12
                        </button>
                        <button
                            type="button"
                            className="min-w-9 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            13
                        </button>
                    </div>

                    {/* <!-- Next --> */}
                    <button
                        className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        aria-label="Next page"
                        type="button"
                    >
                        Next
                    </button>

                    {/* <!-- Jump to page --> */}
                    <div className="hidden items-center gap-2 sm:flex">
                        <label htmlFor="jumpPage" className="text-sm text-gray-600">Page:</label>
                        <input
                            id="jumpPage"
                            type="number"
                            min="1"
                            className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1"
                        />
                        <button
                            type="button"
                            className="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-300"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}