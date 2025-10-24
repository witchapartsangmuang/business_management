"use client"
import Barchart from "./barchart"
import BarchartACC from "./barchart-acc"
import Piechart from "./Piechart"
export default function DashboardPage() {
    return (
        <>
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
                    <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <Barchart />
                    </div>
                </div>
                <div className="col-span-6 h-[450px] mt-3 px-3">
                    <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <Piechart />
                    </div>
                </div>
                <div className="col-span-12 mt-3 px-3">
                    <div className="h-[450px] border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
                        <BarchartACC />
                    </div>
                </div>
            </div>
        </>
    )
}