"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./menu";
import LayoutUser from "./layout/LayoutUser";
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutSystemAdmin from "./layout/LayoutSystemAdmin";

export default function Layout({ children, }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    useEffect(() => {
        console.log("pathname", pathname);

    }, [])
    return (
        <>
            {
                pathname === "/login" ?
                    <>
                        {children}
                    </>
                    : pathname.startsWith("/system") ?
                        <LayoutSystemAdmin>
                            {children}
                        </LayoutSystemAdmin>
                        : pathname.startsWith("/admin") ?
                            <LayoutAdmin>
                                {children}
                            </LayoutAdmin>
                            :
                            <LayoutUser>
                                {children}
                            </LayoutUser>
            }
        </>
        // <div className="flex h-screen bg-gray-100">
        //     <div>
        //         <aside className={`${sidebarOpen ? "block" : "hidden"} w-64 bg-red-700 text-white sticky top-0 overflow-auto`}>
        //             <div className="h-full bg-blue-500 flex items-center px-4 sticky top-0 overflow-auto">
        //                 <div className="">
        //                     {
        //                         Array.from(Array(50), (e, i) => {
        //                             return <li key={i}>Menu {i}</li>
        //                         })
        //                     }
        //                 </div>
        //             </div>
        //         </aside>
        //     </div>
        //     <div className="flex-1 flex flex-col">
        //         <header className="h-16 bg-blue-500 flex items-center px-4  sticky top-0">
        //             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">Toggle Sidebar</button>
        //         </header>
        //         <main className="flex-1 p-4 bg-white">
        //             {children}
        //         </main>
        //     </div>
        // </div>
    );
}
