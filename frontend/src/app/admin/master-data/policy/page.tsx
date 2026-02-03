"use client"

import IconArchive from "@/components/icons/icon-archive";
import IconList from "@/components/icons/icon-list";
import IconPlus from "@/components/icons/icon-plus";
import IconSearch from "@/components/icons/icon-search";
import IconShare from "@/components/icons/icon-share";
import Link from "next/dist/client/link";
import { useState } from "react";

export default function PolicyPage() {
    const [category, setCategory] = useState("All");
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
        <div className="bg-white rounded p-3 min-h-[calc(100vh-5rem)]">
            <div className="border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold mb-2">Policy Master</h2>
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
                    <Link href="/admin/master-data/policy/new">
                        <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm">
                            <IconPlus size={18} />
                            <span className="ml-1">Add New Master</span>
                        </button>
                    </Link>
                </div>
            </div>
            <ul className="flex p-3 overflow-x-auto gap-3">
                <span>Show :</span>
                <div className="flex gap-5">
                    <div className="flex items-center">
                        <input className="cursor-pointer" type="radio" value="all" checked={category === "All"} onChange={() => setCategory("All")} id="all-category" />
                        <label className="pl-1 cursor-pointer" htmlFor="all-category">All</label>
                    </div>
                    <div className="flex items-center">
                        <input className="cursor-pointer" type="radio" value="active" checked={category === "Active"} onChange={() => setCategory("Active")} id="active-category" />
                        <label className="pl-1 cursor-pointer" htmlFor="active-category">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input className="cursor-pointer" type="radio" value="inactive" checked={category === "Inactive"} onChange={() => setCategory("Inactive")} id="inactive-category" />
                        <label className="pl-1 cursor-pointer" htmlFor="inactive-category">Inactive</label>
                    </div>
                </div>
            </ul>
            {/* <ul className="flex pb-2 mt-3 overflow-x-auto">
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "All" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("All")}>All</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Active" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Active")}>Active</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Inactive" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Inactive")}>Inactive</button></li>
            </ul> */}
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
        </div>
    )
}