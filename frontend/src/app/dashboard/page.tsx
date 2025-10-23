"use client"
import Barchart from "./barchart"
import Piechart from "./Piechart"
export default function DashboardPage() {
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-6 h-[450px] mt-3 px-3">
                    <Barchart />
                </div>
                <div className="col-span-6 h-[450px] mt-3 px-3">
                    <Piechart />
                </div>
            </div>
        </>
    )
}