"use client"

import Barchart from "@/components/dashboard/Barchart"
import ChartCard from "@/components/dashboard/ChartCard"
import ChartLabel from "@/components/dashboard/ChartLabel"
import Piechart from "@/components/dashboard/PieChart"
import StaticCard from "@/components/dashboard/StaticCard"
import Label from "@/components/input/Label"
import Select from "@/components/input/Select"
import { useState } from "react"

export default function DashboardPage() {
    const year = [{ label: "2025", value: "2025" }, { label: "2026", value: "2026" }, { label: "2027", value: "2027" }]
    const [startYear, setstartYear] = useState(String(new Date().getFullYear()))
    const [endYear, setendYear] = useState(String(new Date().getFullYear()))
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Period From" htmlFor="Period From" require />
                    <Select id="Period From" optionList={year} defaultSelectedValue={startYear} onChange={(e) => { setstartYear(e.target.value) }} />

                </div>
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Period To" htmlFor="Period To" require />
                    <Select id="Period To" optionList={year} defaultSelectedValue={endYear} onChange={(e) => { setendYear(e.target.value) }} />
                </div>
            </div>
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
                <div className="col-span-6 mt-3 px-3">
                    <ChartCard>
                        <ChartLabel label="barchart" />
                        <div className="h-[450px] mt-3">
                            <Barchart
                                dataKey="name"
                                data={[{ name: "Sale", inspiration: 20, idea: 14, project: 30 },
                                { name: "Production", inspiration: 14, idea: 14, project: 35 },
                                { name: "Purchase", inspiration: 5, idea: 7, project: 25 }]}
                                barDetailList={[{ dataKey: "inspiration", fill: "#6684d8" }, { dataKey: "idea", fill: "#5584d8" }, { dataKey: "project", fill: "#8884d8" }]}
                            />
                        </div>
                    </ChartCard>
                </div>
                <div className="col-span-6 mt-3 px-3">
                    <ChartCard>
                        <ChartLabel label="barchart" />
                        <Piechart pieList={[{ name: "Sales Revenue", value: 20, color: "#333333" },
                        { name: "Production Volume", value: 20, color: "#444444" },
                        { name: "Cost Reduction", value: 20, color: "#555555" }]} />
                    </ChartCard>
                </div>
            </div>
        </>
    )
}