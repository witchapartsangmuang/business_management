"use client"
import Barchart from "@/components/dashboard/BarChart"
import ChartCard from "@/components/dashboard/ChartCard"
import ChartLabel from "@/components/dashboard/ChartLabel"
import Piechart from "@/components/dashboard/PieChart"
import StaticCard from "@/components/dashboard/StaticCard"
import Label from "@/components/input/Label"
import Select from "@/components/input/Select"
import { OrganizationLevel } from "@/types/types"
import { useEffect, useState } from "react"
export default function ManagerDashboardPage() {
    const year = [{ label: "2025", value: "2025" }, { label: "2026", value: "2026" }, { label: "2027", value: "2027" }]
    const [startYear, setstartYear] = useState(String(new Date().getFullYear()))
    const [endYear, setendYear] = useState(String(new Date().getFullYear()))
    const [org, setorg] = useState<{ lv: number, orgList: OrganizationLevel[] } | {}>({})
    const [structureLevel, setstructureLevel] = useState<OrganizationLevel[]>([
        { id: 1, org_level_name: "Company", level: 1, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 2, org_level_name: "Business Unit", level: 2, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 3, org_level_name: "Division", level: 3, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 4, org_level_name: "Department", level: 4, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 5, org_level_name: "Section", level: 5, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null }
    ])
    const [organizationUnit, setorganizationUnit] = useState([
        { id: 1, org_unit_name: "Unit 1", org_level_id: 2, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 2, org_unit_name: "Unit 2", org_level_id: 2, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 3, org_unit_name: "Unit 3", org_level_id: 3, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 4, org_unit_name: "Unit 4", org_level_id: 4, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
        { id: 5, org_unit_name: "Unit 5", org_level_id: 5, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null }
    ])
    useEffect(() => {
        const org = structureLevel.map((level) => {
            return { lv: level.level, orgList: organizationUnit.filter((org) => org.org_level_id === level.level) }
        })
        setorg(org)
    }, [structureLevel, organizationUnit])
    return (
        <>
            <div className="bg-white py-3">
                <p className="px-3 text-4xl">Manager Dashboard</p>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 mt-3 px-3">
                        <Label title="Period From" htmlFor="Period From" require />
                        <Select id="Period From" optionList={year} defaultSelectedValue={startYear} onChange={(e) => { setstartYear(e.target.value) }} />
                    </div>
                    {/* <div className="col-span-6 mt-3 px-3">
                        <Label title="Period To" htmlFor="Period To" require />
                        <Select id="Period To" optionList={year} defaultSelectedValue={endYear} onChange={(e) => { setendYear(e.target.value) }} />
                    </div> */}
                    {structureLevel.map((org) => (
                        <div key={`${org.level}-${org}`} className="col-span-4 mt-3 px-3">
                            <Label title={org.org_level_name} htmlFor={org.org_level_name} require />
                            <Select id={org.org_level_name} optionList={[{ label: org.org_level_name, value: org.org_level_name }]} defaultSelectedValue={org.org_level_name} onChange={(e) => { }} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white mt-2 py-3">
                <div className="grid grid-cols-12">
                    <div className="col-span-3 mt-3 px-3">
                        <ChartCard>
                            <StaticCard label="ROI (AVG)" value={320} unit="%" />
                        </ChartCard>
                    </div>
                    <div className="col-span-3 mt-3 px-3">
                        <ChartCard>
                            <StaticCard label="ROI (AVG)" value={320} unit="%" />
                        </ChartCard>
                    </div>
                    <div className="col-span-3 mt-3 px-3">
                        <ChartCard>
                            <StaticCard label="ROI (AVG)" value={320} unit="%" />
                        </ChartCard>
                    </div>
                    <div className="col-span-3 mt-3 px-3">
                        <ChartCard>
                            <StaticCard label="ROI (AVG)" value={320} unit="%" />
                        </ChartCard>
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 px-3 mt-3">
                        <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                            Graph
                        </div>
                    </div>
                    <div className="col-span-6 px-3 mt-3">
                        <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                            Graph
                        </div>
                    </div>
                    <div className="col-span-6 px-3 mt-3">
                        <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                            Graph
                        </div>
                    </div>
                    <div className="col-span-4 px-3 mt-3">
                        <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                            Graph
                        </div>
                    </div>
                    <div className="col-span-4 px-3 mt-3">
                        <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                            Graph
                        </div>
                    </div>
                    <div className="col-span-4 px-3 mt-3">
                        <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                            Graph
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}