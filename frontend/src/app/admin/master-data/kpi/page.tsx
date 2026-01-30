"use client"

import IconArchive from "@/components/icons/icon-archive";
import IconPlus from "@/components/icons/icon-plus";
import IconShare from "@/components/icons/icon-share";
import { useEffect, useState } from "react";

export default function KpiPage() {
    const [isKpiInfoModalOpen, setIsKpiInfoModalOpen] = useState(false);
    const [kpiInfo, setKpiInfo] = useState({
        id: null,
        code: "",
        name: "",
        description: "",
        unit: "",
    });
    const [kpiList, setKpiList] = useState([
        {
            id: 1,
            code: "SOAR",
            name: "Strategic Objective Achievement Rate",
            description: "สัดส่วนเป้าหมายเชิงกลยุทธ์ที่บรรลุตามแผนประจำปี",
            unit: "%",
            isActive: false,
        },
        {
            id: 2,
            code: "CKAAI",
            name: "Corporate KPI Achievement Index",
            description: "คะแนนเฉลี่ยการบรรลุ KPI ระดับองค์กร",
            unit: "%",
            isActive: true,
        },
        {
            id: 3,
            code: "KPIC",
            name: "Key Position Successor Coverage",
            description: "ตำแหน่งสำคัญที่มีผู้สืบทอดพร้อมใช้งาน",
            unit: "%",
            isActive: true,
        },
        {
            id: 4,
            code: "CRPI",
            name: "Cost Reduction from Process Improvement",
            description: "มูลค่าการลดต้นทุนจากการปรับปรุงกระบวนการ",
            unit: "MB",
            isActive: true,
        },
        {
            id: 5,
            code: "DAR",
            name: "Digital Adoption Rate",
            description: "อัตราการใช้งานระบบดิจิทัลตามที่กำหนด",
            unit: "%",
            isActive: true,
        },
        {
            id: 6,
            code: "MCRI",
            name: "Major Compliance & Risk Incident",
            description: "จำนวนเหตุการณ์ความเสี่ยง/ไม่ปฏิบัติตามที่มีผลกระทบร้ายแรง",
            unit: "Case",
            isActive: false,
        },
        {
            id: 7,
            code: "CSI",
            name: "Customer Satisfaction Index (CSI)",
            description: "คะแนนความพึงพอใจลูกค้าเฉลี่ยทั้งองค์กร",
            unit: "Score",
            isActive: true,
        },
        {
            id: 8,
            code: "OTSPD",
            name: "On-Time Strategic Project Delivery",
            description: "โครงการเชิงกลยุทธ์ที่ส่งมอบตรงเวลา",
            unit: "%",
            isActive: true,
        },
    ]);

    const submitKpiInfo = (e) => {
        e.preventDefault();
        // Submit kpiInfo to backend or state management
        console.log("Submitted KPI Info:", kpiInfo);
        setKpiInfo({
            id: null,
            code: "",
            name: "",
            description: "",
            unit: "",
        })
        setIsKpiInfoModalOpen(false);
    }

    const openKpiInfoModal = (kpiInfo) => {
        if (kpiInfo) {
            setKpiInfo(kpiInfo);
        } else {
            setKpiInfo({
                id: null,
                code: "",
                name: "",
                description: "",
                unit: "",
            })
        }
        setIsKpiInfoModalOpen(true);
    };

    const closeKpiInfoModal = () => {
        setIsKpiInfoModalOpen(false);
        setKpiInfo({
            id: null,
            code: "",
            name: "",
            description: "",
            unit: "",
        })
    };
    useEffect(() => {
        console.log("kpiInfo", kpiInfo);

    }, [kpiInfo]);
    return (
        <div className="bg-white rounded p-2 min-h-[calc(100vh-5rem)]">
            <ul className="flex ">
                <li className="p-0.5"><button className="border rounded-md px-3 py-1 h-full text-nowrap">All</button></li>
                <li className="p-0.5"><button className="border rounded-md px-3 py-1 h-full text-nowrap">Active</button></li>
                <li className="p-0.5"><button className="border rounded-md px-3 py-1 h-full text-nowrap">Inactive</button></li>
            </ul>
            {/* <ul className="flex">
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Leader" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Leader")}>Project Leader</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Approver" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Approver")}>Project Approver</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Team Member" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Team Member")}>Team Member</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Sponsor" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Sponsor")}>Project Sponsor</button></li>
            </ul> */}
            <div className="flex w-full justify-between my-2">
                <div className="flex w-full justify-between">
                    <div className="flex items-center">
                        <button className="flex items-center rounded px-[0.5rem] py-[0.25rem] bg-gray-200 hover:bg-gray-300" onClick={() => openKpiInfoModal(null)}><IconPlus className="h-6 w-6" size={24} /><span className="ml-1">New</span></button>
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
                            kpiList.map((kpi, index) => (
                                <tr key={kpi.code}>
                                    <td>{index + 1}.</td>
                                    <td>{kpi.code}</td>
                                    <td>{kpi.name}</td>
                                    <td>{kpi.description}</td>
                                    <td>
                                        {
                                            kpi.isActive ? (
                                                <>
                                                    <button className="danger-button w-auto" onClick={() => openKpiInfoModal(kpi)}>Edit</button>
                                                    <button className="danger-button w-auto"><IconArchive className="text-red-200" size={24} /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="danger-button w-auto" onClick={() => openKpiInfoModal(kpi)}>Edit</button>
                                                    <button className="danger-button w-auto"><IconShare className="text-red-200" size={24} /></button>
                                                </>
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
            {isKpiInfoModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={closeKpiInfoModal}
                    />

                    {/* Modal Card */}
                    <div className="relative z-10 w-[92%] max-w-md rounded-xl bg-white p-5 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">เปลี่ยนรหัสผ่าน</h3>
                            <button
                                type="button"
                                onClick={closeKpiInfoModal}
                                className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={submitKpiInfo} className="mt-4 space-y-3">
                            <div>
                                <label className="form-label">Code</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={kpiInfo.code}
                                    onChange={(e) => setKpiInfo({ ...kpiInfo, code: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={kpiInfo.name}
                                    onChange={(e) => setKpiInfo({ ...kpiInfo, name: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={kpiInfo.description}
                                    onChange={(e) => setKpiInfo({ ...kpiInfo, description: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="form-label">Unit</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={kpiInfo.unit}
                                    onChange={(e) => setKpiInfo({ ...kpiInfo, unit: e.target.value })}
                                    autoFocus
                                />
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeKpiInfoModal}
                                    className="px-3 py-2 rounded-md border hover:bg-gray-50"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    ยืนยันเปลี่ยนรหัส
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}