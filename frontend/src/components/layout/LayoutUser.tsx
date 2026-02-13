import { useState } from "react"
import Link from "next/link";
import IconDashboard from "../icons/icon-dashboard";
import IconBook from "../icons/icon-book";
import IconDatabase from "../icons/icon-database";
import { usePathname } from "next/navigation";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Menu } from "@/types/frontend-type";

export default function LayoutUser({ children, open }: { children: React.ReactNode, open: boolean }) {
    const userPermission = useSelector((state: RootState) => state.userSlice.userPermission)
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState<string>("");
    const menus: Menu[] = [
        { name: "KPI Alignment", path: "/kpi-alignment", icon: IconBook, link: "/kpi-alignment", permission: "kpi_alignment_view" },
        {
            name: "Project Management", path: "/project", icon: IconDashboard, permission: "project_view", children: [
                { name: "My Project Worklist", path: "/project/my-worklist", link: "/project/my-worklist", permission: "project_view" },
                { name: "Create Project", path: "/project/new", link: "/project/new", permission: "project_create" },
            ]
        },
        {
            name: "Dashboard", path: "/dashboard", icon: IconDashboard, permission: "dashboard_view", children: [
                { name: "Executive", path: "/dashboard/executive", link: "/dashboard/executive", permission: "dashboard_executive_view", },
                { name: "Manager", path: "/dashboard/manager", link: "/dashboard/manager", permission: "dashboard_manager_view", },
                { name: "User", path: "/dashboard/user", link: "/dashboard/user", permission: "dashboard_user_view", },
            ]
        },
        {
            name: "Report", path: "/report", icon: IconDashboard, permission: "report_view", children: [
                { name: "Executive", path: "/report/executive", link: "/report/executive", permission: "report_view" },
                { name: "Manager", path: "/report/manager", link: "/report/manager", permission: "report_view" },
                { name: "User", path: "/report/user", link: "/report/user", permission: "report_view" },
            ]
        },
        { name: "Book", path: "/book", icon: IconBook, link: "/book", permission: "-" },
        { name: "Database", path: "/database", icon: IconDatabase, link: "/database", permission: "-" },
        { name: "admin", path: "/admin", icon: IconDatabase, link: "/admin", permission: "admin_view" },
    ]

    function collapseMenu(path: string) {
        if (path !== collapsed) {
            setCollapsed(path)
        } else {
            setCollapsed('')
        }
    }
    return (
        <>
            <div className="flex min-h-[calc(100vh-4rem)]">
                <div className={`h-[calc(100vh-4rem)] sticky top-16 text-white transition-all duration-300 overflow-y-auto ${open ? "min-w-66 p-1 shadow" : "w-0 p-0"} bg-[#F8FAFD]`}>
                    <ul className="">
                        {
                            menus.map((menu) => (
                                menu.children ? (
                                    menu.permission && userPermission[menu.permission] &&
                                    <div key={`${menu.name}-li`}>
                                        <li className={`cursor-pointer p-1 flex h-10 items-center hover:bg-[#EBEDF0] rounded-md ${pathname.startsWith(menu.path) ? 'bg-[#D3E3FD]' : 'bg-[#F8FAFD]'}`} onClick={() => { collapseMenu(menu.path) }}>
                                            <menu.icon className={" text-red-500"} size={20} />
                                            <span className="pl-2 text-black">{menu.name}</span>
                                        </li>
                                        <ul className={`pl-4 overflow-hidden transition-all ${pathname.startsWith(menu.path) || collapsed === menu.path ? "max-h-100 duration-100" : "max-h-0 duration-0"}`}>
                                            {menu.children.map((subMenu) => (
                                                menu.permission && userPermission[subMenu.permission] &&
                                                <Link href={subMenu.link || ''} key={subMenu.name}>
                                                    <li className={`flex items-center p-2 hover:bg-[#EBEDF0] rounded-md ${pathname.startsWith(subMenu.path) || collapsed === subMenu.path ? 'bg-[#D3E3FD]' : 'bg-[#F8FAFD]'}`}>
                                                        <span className="pl-2 text-black">{subMenu.name}</span>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    menu.permission && userPermission[menu.permission] &&
                                    <Link key={menu.name} href={menu.link || ''}>
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