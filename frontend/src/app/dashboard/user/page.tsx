"use client"
import Barchart from "@/components/dashboard/BarChart"
import ChartCard from "@/components/dashboard/ChartCard"
import ChartLabel from "@/components/dashboard/ChartLabel"
import Piechart from "@/components/dashboard/PieChart"
import StaticCard from "@/components/dashboard/StaticCard"
import Label from "@/components/input/Label"
import Select from "@/components/input/Select"
import { useState } from "react"

export default function UserDashboardPage() {
    const year = [{ label: "2025", value: "2025" }, { label: "2026", value: "2026" }, { label: "2027", value: "2027" }]
    const [startYear, setstartYear] = useState(String(new Date().getFullYear()))
    const [endYear, setendYear] = useState(String(new Date().getFullYear()))
    return (
        <>
            <p className="px-3 text-4xl">User Dashboard</p>
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
                                data={[{ name: "Sale", inspiration: 20, idea: 14 },
                                { name: "Production", inspiration: 14, idea: 14, project: 35 },
                                { name: "Purchase", inspiration: 5, idea: 7, project: 25 }]}
                                barDetailList={[{ dataKey: "inspiration", fill: "#6684d8" }, { dataKey: "idea", fill: "#5584d8" }, { dataKey: "project", fill: "#8884d8" }]}
                            />
                        </div>
                    </ChartCard>
                </div>
                <div className="col-span-6 mt-3 px-3">
                    <ChartCard>
                        <ChartLabel label="Project Status" />
                        <Piechart pieList={[
                            { name: "Registered", value: 20, color: "#333333" },
                            { name: "On Going", value: 20, color: "#444444" },
                            { name: "Completed", value: 20, color: "#555555" },
                            { name: "Cancelled", value: 20, color: "#666666" },
                        ]} />
                    </ChartCard>
                </div>

                <div className="col-span-12 mt-3 px-3">
                    <ChartCard>
                        <ChartLabel label="My Investment" />
                        <div className="h-[450px] mt-3">
                            <Barchart
                                dataKey="month"
                                data={[
                                    { month: "JAN 2025", EstInvestment: 20, ActInvestment: 14 },
                                    { month: "FEB 2025", EstInvestment: 14, ActInvestment: 14 },
                                    { month: "MAR 2025", EstInvestment: 5, ActInvestment: 7 },
                                    { month: "APR 2025", EstInvestment: 10, ActInvestment: 20 },
                                    { month: "MAY 2025", EstInvestment: 8, ActInvestment: 12 },
                                    { month: "JUN 2025", EstInvestment: 12, ActInvestment: 18 },
                                    { month: "JUL 2025", EstInvestment: 15, ActInvestment: 10 },
                                    { month: "AUG 2025", EstInvestment: 18, ActInvestment: 16 },
                                    { month: "SEP 2025", EstInvestment: 10, ActInvestment: 14 },
                                    { month: "OCT 2025", EstInvestment: 5, ActInvestment: 8 },
                                    { month: "NOV 2025", EstInvestment: 7, ActInvestment: 10 },
                                    { month: "DEC 2025", EstInvestment: 9, ActInvestment: 12 },
                                    { month: "JAN 2026", EstInvestment: 11, ActInvestment: 14 },
                                    { month: "FEB 2026", EstInvestment: 13, ActInvestment: 16 },
                                    { month: "MAR 2026", EstInvestment: 6, ActInvestment: 9 },
                                    { month: "APR 2026", EstInvestment: 8, ActInvestment: 11 },
                                    { month: "MAY 2026", EstInvestment: 10, ActInvestment: 13 },
                                    { month: "JUN 2026", EstInvestment: 12, ActInvestment: 15 },
                                    { month: "JUL 2026", EstInvestment: 14, ActInvestment: 18 },
                                    { month: "AUG 2026", EstInvestment: 16, ActInvestment: 20 },
                                    { month: "SEP 2026", EstInvestment: 18, ActInvestment: 22 },
                                    { month: "OCT 2026", EstInvestment: 20, ActInvestment: 25 },
                                    { month: "NOV 2026", EstInvestment: 22, ActInvestment: 28 },
                                    { month: "DEC 2026", EstInvestment: 24, ActInvestment: 30 }
                                ]}
                                barDetailList={[{ dataKey: "EstInvestment", fill: "#6684d8" }, { dataKey: "ActInvestment", fill: "#5584d8" }]}
                            />
                        </div>
                    </ChartCard>
                </div>
                <div className="col-span-12 mt-3 px-3">
                    <ChartCard>
                        <ChartLabel label="My Gross Earnings" />
                        <div className="h-[450px] mt-3">
                            <Barchart
                                dataKey="month"
                                data={[
                                    { month: "JAN 2025", EstGrossEarnings: 20, ActGrossEarnings: 14 },
                                    { month: "FEB 2025", EstGrossEarnings: 14, ActGrossEarnings: 14 },
                                    { month: "MAR 2025", EstGrossEarnings: 5, ActGrossEarnings: 7 },
                                    { month: "APR 2025", EstGrossEarnings: 10, ActGrossEarnings: 20 },
                                    { month: "MAY 2025", EstGrossEarnings: 8, ActGrossEarnings: 12 },
                                    { month: "JUN 2025", EstGrossEarnings: 12, ActGrossEarnings: 18 },
                                    { month: "JUL 2025", EstGrossEarnings: 15, ActGrossEarnings: 10 },
                                    { month: "AUG 2025", EstGrossEarnings: 18, ActGrossEarnings: 16 },
                                    { month: "SEP 2025", EstGrossEarnings: 10, ActGrossEarnings: 14 },
                                    { month: "OCT 2025", EstGrossEarnings: 5, ActGrossEarnings: 8 },
                                    { month: "NOV 2025", EstGrossEarnings: 7, ActGrossEarnings: 10 },
                                    { month: "DEC 2025", EstGrossEarnings: 9, ActGrossEarnings: 12 },
                                    { month: "JAN 2026", EstGrossEarnings: 11, ActGrossEarnings: 14 },
                                    { month: "FEB 2026", EstGrossEarnings: 13, ActGrossEarnings: 16 },
                                    { month: "MAR 2026", EstGrossEarnings: 6, ActGrossEarnings: 9 },
                                    { month: "APR 2026", EstGrossEarnings: 8, ActGrossEarnings: 11 },
                                    { month: "MAY 2026", EstGrossEarnings: 10, ActGrossEarnings: 13 },
                                    { month: "JUN 2026", EstGrossEarnings: 12, ActGrossEarnings: 15 },
                                    { month: "JUL 2026", EstGrossEarnings: 14, ActGrossEarnings: 18 },
                                    { month: "AUG 2026", EstGrossEarnings: 16, ActGrossEarnings: 20 },
                                    { month: "SEP 2026", EstGrossEarnings: 18, ActGrossEarnings: 22 },
                                    { month: "OCT 2026", EstGrossEarnings: 20, ActGrossEarnings: 25 },
                                    { month: "NOV 2026", EstGrossEarnings: 22, ActGrossEarnings: 28 },
                                    { month: "DEC 2026", EstGrossEarnings: 24, ActGrossEarnings: 30 }
                                ]}
                                barDetailList={[{ dataKey: "EstInvestment", fill: "#6684d8" }, { dataKey: "ActInvestment", fill: "#5584d8" }]}
                            />
                        </div>
                    </ChartCard>
                </div>



            </div>
        </>
    )
}