"use client";

import { useState } from "react";
import Sidebar from "./menu";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* SIDEBAR (ตรึง) */}
            <div>
                <aside className={`${sidebarOpen ? "block" : "hidden"} w-64 bg-red-700 text-white sticky top-0 overflow-auto`}>
                    <div className="h-full bg-blue-500 flex items-center px-4 sticky top-0 overflow-auto">
                        <div className="">
                            {
                                Array.from(Array(50), (e, i) => {
                                    return <li key={i}>Menu {i}</li>
                                })
                            }
                        </div>
                    </div>
                </aside>
            </div>
            {/* MAIN AREA (ไม่ตรึง header) */}
            <div className="flex-1 flex flex-col">
                {/* HEADER - ไม่ sticky */}
                <header className="h-16 bg-blue-500 flex items-center px-4  sticky top-0">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">Toggle Sidebar</button>
                </header>
                {/* CONTENT AREA ที่ scroll ได้ */}
                <main className="flex-1 p-4 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
