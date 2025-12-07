import { useEffect, useState } from "react"
import Link from "next/link";
import IconDashboard from "../icons/icon-dashboard";
import IconBook from "../icons/icon-book";
import IconDatabase from "../icons/icon-database";
import { usePathname } from "next/navigation";
export default function LayoutUser({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
    const [collapsed, setCollapsed] = useState<string>("");
    const [menus, setMenus] = useState([
        {
            name: "Dashboard", path: "/dashboard", icon: IconDashboard, children: [
                { name: "Executive", link: "/dashboard/executive" },
                { name: "Manager", link: "/dashboard/manager" },
                { name: "User", link: "/dashboard/user" },
            ]
        },
        {
            name: "Report", path: "/report", icon: IconDashboard, children: [
                { name: "Executive", link: "/report/executive" },
                { name: "Manager", link: "/report/manager" },
                { name: "User", link: "/report/user" },
            ]
        },
        { name: "Book", path: "/book", icon: IconBook, link: "/book" },
        { name: "Database", path: "/database", icon: IconDatabase, link: "/database" },
    ]);
    useEffect(() => {
        console.log(collapsed);
    }, [collapsed]);
    useEffect(() => {
        console.log(pathname);
    }, [pathname]);


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
                    {/* {menus.map((menu) => (
                        <Link href={menu.link} key={menu.name}>
                            <div className=" bg-amber-600 p-1">
                                <div className="p-1 bg-blue-500 flex h-[40px] items-center">
                                    <menu.icon className={" text-red-500"} size={24} />
                                    <span className="pl-2">{menu.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))} */}
                    <ul>
                        {
                            menus.map((menu) => (
                                menu.children ? (
                                    <>
                                        <li key={`${menu.name}-li`} className="p-1 bg-blue-500 flex h-[40px] items-center" onClick={() => { setCollapsed(menu.path) }}>
                                            <menu.icon className={" text-red-500"} size={20} />
                                            <span className="pl-2">{menu.name}</span>
                                        </li>
                                        <ul key={`${menu.name}-ul`} className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all ${collapsed === menu.path ? "max-h-100 duration-100" : "max-h-0 duration-0"}`}>
                                            {menu.children.map((subMenu) => (
                                                <Link href={subMenu.link} key={subMenu.name}>
                                                    <li className="flex items-center p-2 hover:bg-slate-700 rounded-md">
                                                        <span className="pl-2">{subMenu.name}</span>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link key={menu.name} href={menu.link}>
                                        <li className="p-1 bg-blue-500 flex h-[40px] items-center">
                                            <menu.icon className={" text-red-500"} size={20} />
                                            <span className="pl-2">{menu.name}</span>
                                        </li>
                                    </Link>
                                )
                            ))
                        }
                    </ul>
                </div>
                <div className="flex-1 bg-slate-100 p-2">
                    {children}
                </div>
            </div>
        </>
    )
}