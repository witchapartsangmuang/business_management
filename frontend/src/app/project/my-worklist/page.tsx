"use client";

import IconList from "@/components/icons/icon-list";
import IconPlus from "@/components/icons/icon-plus";
import { useState } from "react";
import Link from "next/link";
export default function ProjectWorkList() {
    const [category, setCategory] = useState<string>("Project Leader");
    return (
        <>
            <ul className="flex">
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Leader" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Leader")}>Project Leader</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Approver" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Approver")}>Project Approver</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Team Member" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Team Member")}>Team Member</button></li>
                <li className="p-0.5"><button className={`rounded p-3 ${category === "Project Sponsor" ? "bg-blue-500 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Sponsor")}>Project Sponsor</button></li>
            </ul>
            <div className="flex w-full justify-between my-2">
                {/* <ul className="flex ">
                    <li className="p-0.5"><button className="border p-3 text-nowrap">Registered</button></li>
                    <li className="p-0.5"><button className="border p-3 text-nowrap">On Going</button></li>
                    <li className="p-0.5"><button className="border p-3 text-nowrap">Completed</button></li>
                </ul> */}
                <div className="flex w-full justify-between">
                    <div className="flex items-center">
                        <Link href="/project/new">
                            <button className="flex items-center rounded px-[0.5rem] py-[0.25rem] bg-gray-200 hover:bg-gray-300"><IconPlus className="h-6 w-6" size={24} /><span className="ml-1">New</span></button>
                        </Link>
                    </div>
                    <div className="flex">
                        <div className="flex items-center mr-0.5 p-1">
                            <button className="bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded"><IconList className="h-6 w-6" size={24} /></button>
                        </div>
                        <input className="form-input" type="text" />
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Project No.</th>
                            <th>Project Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Estimate Investment</th>
                            <th>Actual Investment</th>
                            <th>Estimate Cost Saving</th>
                            <th>Actual Cost Saving</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>PM-XXXXX</td>
                            <td>Project Name XXXXX</td>
                            <th>xx/xx/xxxx</th>
                            <th>xx/xx/xxxx</th>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                            <th>xxxxxxx</th>
                            <td>
                                <button>Edit</button><button>DEL</button>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>PM-XXXXX</td>
                            <td>Project Name XXXXX</td>
                            <th>xx/xx/xxxx</th>
                            <th>xx/xx/xxxx</th>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                            <th>xxxxxxx</th>
                            <td>
                                <button>Edit</button><button>DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}