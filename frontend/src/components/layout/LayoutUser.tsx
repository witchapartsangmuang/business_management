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
        { name: "KPI Alignment", path: "/kpi-alignment", icon: IconBook, link: "/kpi-alignment" },
        {
            name: "Project Management", path: "/project", icon: IconDashboard, children: [
                { name: "My Project Worklist", path: "/project/my-worklist", link: "/project/my-worklist" },
                { name: "Create Project", path: "/project/new", link: "/project/new" },
            ]
        },
        {
            name: "Dashboard", path: "/dashboard", icon: IconDashboard, children: [
                { name: "Executive", path: "/dashboard/executive", link: "/dashboard/executive" },
                { name: "Manager", path: "/dashboard/manager", link: "/dashboard/manager" },
                { name: "User", path: "/dashboard/user", link: "/dashboard/user" },
            ]
        },
        {
            name: "Report", path: "/report", icon: IconDashboard, children: [
                { name: "Executive", path: "/report/executive", link: "/report/executive" },
                { name: "Manager", path: "/report/manager", link: "/report/manager" },
                { name: "User", path: "/report/user", link: "/report/user" },
            ]
        },
        { name: "Book", path: "/book", icon: IconBook, link: "/book" },
        { name: "Database", path: "/database", icon: IconDatabase, link: "/database" },
        { name: "admin", path: "/admin", icon: IconDatabase, link: "/admin" },
    ]);

    function collapseMenu(path: string) {
        if (path !== collapsed) {
            setCollapsed(path)
        } else {
            setCollapsed('')
        }
    }
    useEffect(() => {
        console.log("collapsed", collapsed);
    }, [collapsed]);
    useEffect(() => {
        console.log("pathname ", pathname);
    }, [pathname]);


    return (
        <>
            <div className="flex h-16 p-2 sticky top-0 bg-yellow-100">
                <div className="w-[16rem] bg-[#555555]">Logo</div>
                <div>
                    <button className="p-3 w-full text-left hover:bg-[#EBEDF0]" onClick={() => setOpen(!open)} >
                        {open ? "⏴" : "⏵"}
                    </button>
                </div>
                <div className="w-full flex justify-end items-center">
                    <Link href={"/profile"}>
                        <img className="w-[24px] h-[24px] object-cover rounded-full" src="/default-profile-avatar.webp" alt="avatar" />
                    </Link>
                </div>
            </div>
            <div className="flex min-h-[calc(100vh-4rem)]">
                <div className={`h-[calc(100vh-4rem)] sticky top-16 text-white transition-all duration-300 overflow-y-auto ${open ? "min-w-66 p-1" : "w-0 p-0"} bg-[#F8FAFD]`}>
                    <ul className="">
                        {
                            menus.map((menu) => (
                                menu.children ? (
                                    <>
                                        <li key={`${menu.name}-li`} className={`cursor-pointer p-1 flex h-10 items-center hover:bg-[#EBEDF0] rounded-md ${pathname.startsWith(menu.path) ? 'bg-[#D3E3FD]' : 'bg-[#F8FAFD]'}`} onClick={() => { collapseMenu(menu.path) }}>
                                            <menu.icon className={" text-red-500"} size={20} />
                                            <span className="pl-2 text-black">{menu.name}</span>
                                        </li>
                                        <ul key={`${menu.name}-ul`} className={`pl-4 overflow-hidden transition-all ${pathname.startsWith(menu.path) || collapsed === menu.path ? "max-h-100 duration-100" : "max-h-0 duration-0"}`}>
                                            {menu.children.map((subMenu) => (
                                                <Link href={subMenu.link} key={subMenu.name}>
                                                    <li className={`flex items-center p-2 hover:bg-[#EBEDF0] rounded-md ${pathname.startsWith(subMenu.path) || collapsed === subMenu.path ? 'bg-[#D3E3FD]' : 'bg-[#F8FAFD]'}`}>
                                                        <span className="pl-2 text-black">{subMenu.name}</span>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link key={menu.name} href={menu.link}>
                                        <li className={`p-1 flex h-10 items-center hover:bg-[#EBEDF0] rounded-md ${pathname.startsWith(menu.path) ? 'bg-[#D3E3FD]' : 'bg-[#F8FAFD]'}`}>
                                            <menu.icon className={" text-red-500"} size={20} />
                                            <span className="pl-2 text-black">{menu.name}</span>
                                        </li>
                                    </Link>
                                )
                            ))
                        }
                    </ul>
                </div>
                <div className="flex-1 bg-slate-100 p-2 overflow-auto">
                    {children}
                </div>
            </div>
        </>
    )
}