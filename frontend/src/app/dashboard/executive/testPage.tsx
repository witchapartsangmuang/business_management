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
export default function ExecutiveDashboardPage() {
    const year = [{ label: "2025", value: "2025" }, { label: "2026", value: "2026" }, { label: "2027", value: "2027" }]
    const [startYear, setstartYear] = useState(String(new Date().getFullYear()))
    const [endYear, setendYear] = useState(String(new Date().getFullYear()))
    const [selectedMDPolicy, setSelectedMDPolicy] = useState("")
    const [mdPolicyList, setmdPolicyList] = useState([{ label: "MD Policy 1", value: "MD Policy 1" }, { label: "MD Policy 2", value: "MD Policy 2" }, { label: "MD Policy 3", value: "MD Policy 3" }])

    useEffect(() => {
        // Fetch MD Policy List from API and update state
        // Example:
    }, [startYear, endYear])
    return (
        <>
            <p className="px-3 text-4xl">Executive Dashboard</p>
            <div className="grid grid-cols-12">
                <div className="col-span-6 mt-3 px-3">
                    <Label title="MD Policy" htmlFor="MD Policy" require />
                    <Select id="MD Policy" optionList={mdPolicyList} defaultSelectedValue={selectedMDPolicy} onChange={(e) => { setSelectedMDPolicy(e.target.value) }} />
                </div>
                <div className="col-span-3 mt-3 px-3">
                    <Label title="Period From" htmlFor="Period From" require />
                    <Select id="Period From" optionList={year} defaultSelectedValue={startYear} onChange={(e) => { setstartYear(e.target.value) }} />
                </div>
                <div className="col-span-3 mt-3 px-3">
                    <Label title="Period To" htmlFor="Period To" require />
                    <Select id="Period To" optionList={year} defaultSelectedValue={endYear} onChange={(e) => { setendYear(e.target.value) }} />
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-3 mt-3 px-3">
                    <ChartCard>
                        <StaticCard label="Investment" value={"320"} unit="MB" />
                    </ChartCard>
                </div>
                <div className="col-span-3 mt-3 px-3">
                    <ChartCard>
                        <StaticCard label="Gross Earnings" value={"320"} unit="MB" />
                    </ChartCard>
                </div>
                <div className="col-span-3 mt-3 px-3">
                    <ChartCard>
                        <StaticCard label="ROI (AVG)" value={"320"} unit="%" />
                    </ChartCard>
                </div>
            </div>
        </>
    )
}