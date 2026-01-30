'use client';
import { useEffect, useState } from "react"
import Link from "next/link";
import IconDashboard from "../icons/icon-dashboard";
import IconBook from "../icons/icon-book";
import IconDatabase from "../icons/icon-database";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "../testCom/switcherLang";
import UserMenuDropdown from "../testCom/userMenu";
import IconArrowBarLeft from "../icons/icon-arrow-bar-left";
import IconArrowBarRight from "../icons/icon-arrow-bar-right";
import NotificationBell from "../testCom/notificationBell";
export default function LayoutAdmin({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
    const [collapsed, setCollapsed] = useState<string>("");
    const [menus, setMenus] = useState([
        { name: "MD Policy", path: "/admin/md-policy", icon: IconBook, link: "/md-policy" },
        {
            name: "Master Data", path: "/admin/master-data", icon: IconDashboard, children: [
                { name: "Cost Saving Type", path: "/admin/master-data/cost-saving-type", link: "/admin/master-data/cost-saving-type" },
                { name: "Policy", path: "/admin/master-data/policy", link: "/admin/master-data/policy" },
                { name: "KPI", path: "/admin/master-data/kpi", link: "/admin/master-data/kpi" },
            ]
        },
        {
            name: "Organizational Structure", path: "/admin/organizational-structure", icon: IconDashboard, children: [
                { name: "Organizational Unit", path: "/admin/organizational-structure/organizational-unit", link: "/admin/organizational-structure/organizational-unit" },
                { name: "Employee", path: "/admin/organizational-structure/employee", link: "/admin/organizational-structure/employee" },
            ]
        },
        { name: "basic Menus", path: "/", icon: IconDatabase, link: "/" },
    ]);
    function collapseMenu(path: string) {
        if (path !== collapsed) {
            setCollapsed(path)
        } else {
            setCollapsed('')
        }
    }
    return (
        <>
            <div className="flex h-16 p-2 sticky top-0 shadow bg-white z-10">
                <div className="w-[16rem] bg-[#555555]">Logo</div>
                <div>
                    <button className="p-3 w-full text-left hover:bg-[#EBEDF0]" onClick={() => setOpen(!open)} >
                        {open ? <IconArrowBarLeft className={" text-red-500"} size={20} /> : <IconArrowBarRight className={" text-red-500"} size={20} />}
                    </button>
                </div>
                <div className="w-full flex justify-end items-center pr-2">
                    <div className="mr-3">
                        <NotificationBell />
                    </div>
                    <div className="mr-3">
                        <LanguageSwitcher />
                    </div>
                    <div>
                        <UserMenuDropdown profileHref="/profile" />
                    </div>
                    {/* <Link href={"/profile"}>
                        <img className="w-[24px] h-[24px] object-cover rounded-full" src="/default-profile-avatar.webp" alt="avatar" />
                    </Link> */}
                </div>
            </div>
            <div className="flex min-h-[calc(100vh-4rem)]">
                <div className={`h-[calc(100vh-4rem)] sticky top-16 text-white transition-all duration-300 overflow-y-auto ${open ? "min-w-66 p-1 shadow" : "w-0 p-0"} bg-[#F8FAFD]`}>
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