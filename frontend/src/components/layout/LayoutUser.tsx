import { useState } from "react"
import IconDashboard from "../icons/icon-dashboard";

export default function LayoutUser({ children, }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <>
            <div className="flex h-16 p-2 sticky top-0 bg-yellow-100">
                <div className="w-[16rem] bg-[#555555]">Logo</div>
                <div>
                    <button className="p-3 w-full text-left hover:bg-slate-700" onClick={() => setOpen(!open)} >
                        {open ? "⏴" : "⏵"}
                    </button>
                </div>
                <div>Header</div>
            </div>
            <div className="flex min-h-[calc(100vh-4rem)]">
                <div className={`h-[calc(100vh-4rem)] sticky top-16 bg-slate-800 text-white transition-all duration-300 overflow-y-auto ${open ? "w-[16.5rem] p-1" : "w-[0rem] p-0"}`}>
                <div className=" bg-amber-600 p-1"><div className="p-1 bg-blue-500"><IconDashboard className={" text-red-500"} size={24}/></div></div>
                <div className=" bg-amber-600 p-1"><div className="p-1 bg-blue-500">1</div></div>
                </div>
                <div className="flex-1 bg-slate-100 p-2">
                    {children}
                    <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
                    <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
                    <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
                
                </div>
            </div>
        </>
    )
}