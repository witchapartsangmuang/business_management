"use client"
export default function DashboardPage() {
    return (
        <>
            <p className="px-3 text-4xl">Manager Dashboard</p>
            <div className="m-3 p-3 grid grid-cols-12 bg-white border border-[#D2D2D2] rounded">
                <div className="col-span-2 mt-3 px-3">
                    <div className="w-full mb-3">
                        <label className="mb-2 inline-block" htmlFor="">Year</label>
                        <select className="block w-full rounded border border-[#D2D2D2] leading-4 py-1.5">
                            <option>2025</option>
                            <option>2024</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <div className="w-full mb-3">
                        <label className="mb-2 inline-block" htmlFor="">MD Policy</label>
                        <select className="block w-full rounded border border-[#D2D2D2] leading-4 py-1.5">
                            <option>Sale Revenue</option>
                            <option>Cost Reduction</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <div className="w-full mb-3">
                        <label className="mb-2 inline-block" htmlFor="">Business Unit</label>
                        <select className="block w-full rounded border border-[#D2D2D2] leading-4 py-1.5">
                            <option>Business Unit</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <div className="w-full mb-3">
                        <label className="mb-2 inline-block" htmlFor="">Division</label>
                        <select className="block w-full rounded border border-[#D2D2D2] leading-4 py-1.5">
                            <option>Division</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <div className="w-full mb-3">
                        <label className="mb-2 inline-block" htmlFor="">Department</label>
                        <select className="block w-full rounded border border-[#D2D2D2] leading-4 py-1.5">
                            <option>Department</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <div className="w-full mb-3">
                        <label className="mb-2 inline-block" htmlFor="">Section</label>
                        <select className="block w-full rounded border border-[#D2D2D2] leading-4 py-1.5">
                            <option>Section</option>
                        </select>
                    </div>
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
        </>
    )
}