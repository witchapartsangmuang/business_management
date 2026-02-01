'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LayoutUser from "./layout/LayoutUser";
import LayoutAdmin from "./layout/LayoutAdmin";
import IconArrowBarRight from "./icons/icon-arrow-bar-right";
import IconArrowBarLeft from "./icons/icon-arrow-bar-left";
import NotificationBell from "./navbar/NotificationBell";
import LanguageSwitcher from "./navbar/LanguageSwitch";
import UserMenuDropdown from "./navbar/UserMenuDropdown";
export default function Layout({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
    // useEffect(() => {
    //     console.log("pathname", pathname);
    // }, [])
    return (
        <>
            {
                pathname === "/login" || pathname === "/sys" ?
                    <>
                        {children}
                    </>
                    :
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
                        {
                            pathname.startsWith("/admin") ?
                                <LayoutAdmin open={open}>
                                    {children}
                                </LayoutAdmin>
                                :
                                <LayoutUser open={open}>
                                    {children}
                                </LayoutUser>
                        }
                    </>

            }
        </>
    )
}