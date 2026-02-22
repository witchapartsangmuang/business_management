"use client"
import Label from "@/components/input/Label"
import Barchart from "./barchart"
import BarchartACC from "./barchart-acc"
import Piechart from "./Piechart"
import GaugeChart from "./test"
import Select, { SelectOption } from "@/components/input/Select";
import { useState } from "react"

type Role = "admin" | "manager" | "staff";

export default function DashboardPage() {
    const year = [2025, 2026, 2027]

    const roleOptions: SelectOption<Role>[] = [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "staff", label: "Staff", disabled: true },
    ];
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Period From" htmlFor="Period From" require />
                </div>
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Period To" htmlFor="Period To" require />
                </div>
                <div className="col-span-6 mt-3 px-3">
                    <Select<Role>
                        id="role"
                        label="Role"
                        placeholder="Choose a role"
                        options={roleOptions}
                        value={role}
                        onChange={(v) => setRole(v)}
                        helperText={role ? `Selected: ${role}` : "Please select a role"}
                        error={!role}
                    />

                    <div className="mt-6 rounded-lg border bg-gray-50 p-3 text-sm">
                        <div className="font-medium">Current value</div>
                        <pre className="mt-2 overflow-auto">{JSON.stringify(role, null, 2)}</pre>
                    </div>
                </div>
            </div>
            <p className="px-3 text-4xl">Executive Insight Dashboard</p>
            <div className="grid grid-cols-12">
                <div className="col-span-12 mt-3 px-3">
                    <div className="w-full mb-3 border border-[#D2D2D2] rounded p-3 bg-white">
                        <label className="mb-2 inline-block" htmlFor="">Year</label>
                        <select className="block w-full rounded border leading-4 py-1.5">
                            <option>2025</option>
                            <option>2024</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-10">
                <div className="col-span-2 h-[120px] px-3">
                    <div className="h-[120px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <p className="text-lg">Sales Revenue</p>
                        <p><span className="text-3xl me-1">205.00</span><span className="text-xl">MB</span></p>
                    </div>
                </div>
                <div className="col-span-2 h-[120px] px-3">
                    <div className="h-[120px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <p className="text-lg">Cost Saving</p>
                        <p><span className="text-3xl me-1">205.00</span><span className="text-xl">MB</span></p>
                    </div>
                </div>
                <div className="col-span-2 h-[120px] px-3">
                    <div className="h-[120px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <p className="text-lg">Investment</p>
                        <p><span className="text-3xl me-1">205.00</span><span className="text-xl">MB</span></p>
                    </div>
                </div>
                <div className="col-span-2 h-[120px] px-3">
                    <div className="h-[120px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <p className="text-lg">Payback Period</p>
                        <p><span className="text-3xl me-1">14</span><span className="text-xl">Month</span></p>
                    </div>
                </div>
                <div className="col-span-2 h-[120px] px-3">
                    <div className="h-[120px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <p className="text-lg">ROI Avg.</p>
                        <p><span className="text-3xl me-1">250</span><span className="text-xl">%</span></p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-6 mt-3 px-3">
                    <div className="border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-700 px-2 mb-2">Bar Chart</h2>
                        <div className="h-[450px] mt-3">
                            <Barchart />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 h-[450px] mt-3 px-3">
                    <div className="border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-700 px-2 mb-2">Pie Chart</h2>
                        <div className="h-[450px] mt-3">
                            <Piechart />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 mt-3 px-3">
                    <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <BarchartACC />
                    </div>
                </div>
                <div className="col-span-12 mt-3 px-3">
                    <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <GaugeChart value={50} />
                    </div>
                </div>
            </div>
        </>
    )
}