"use client";

import IconList from "@/components/icons/icon-list";
import IconPlus from "@/components/icons/icon-plus";
import { useState } from "react";
import Link from "next/link";
import IconSearch from "@/components/icons/icon-search";
import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from "@/components/table/Table";
export default function ProjectMyWorkListPage() {
    const [category, setCategory] = useState<string>("Project Leader");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(10);
    const [pageSize, setPageSize] = useState<number>(10);
    return (
        <div className="bg-white rounded p-2 min-h-[calc(100vh-5rem)]">
            <div className="border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold mb-2">My Worklist</h2>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex w-full max-w-xl items-center gap-2">
                        <button className="bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded"><IconList className="h-6 w-6" size={24} /></button>
                        <div className="relative flex-1">
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <IconSearch size={18} />
                            </span>
                            <input className="form-input pr-3 pl-10 " placeholder="Search" />
                        </div>
                        <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm">
                            <IconSearch size={18} />
                            <span className="ml-1">Search</span>
                        </button>
                    </div>
                    <Link href="/project/new">
                        <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm">
                            <IconPlus size={18} />
                            <span className="ml-1">Add New Project</span>
                        </button>
                    </Link>
                </div>
            </div>
            <ul className="flex pb-2 mt-3 overflow-x-auto">
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Project Leader" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Leader")}>Project Leader</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Project Approver" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Approver")}>Project Approver</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Team Member" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Team Member")}>Team Member</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Project Sponsor" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Project Sponsor")}>Project Sponsor</button></li>
            </ul>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th className="min-w-[42rem]">Project No.</th>
                            <th className="min-w-[42rem]">Project Name</th>
                            <th className="min-w-[42rem]">Start Date</th>
                            <th className="w-[42rem]">End Date</th>
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
            <div className="flex justify-between mt-3 gap-3">
                <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Showing {1} to {10} of {128} results</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* <!-- Rows per page --> */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-600">Rows:</label>
                        <select
                            id="pageSize"
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>

                    {/* <!-- Prev --> */}
                    <button
                        className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                        aria-label="Previous page"
                        type="button"
                    >
                        Prev
                    </button>

                    {/* <!-- Page numbers --> */}
                    <div className="flex items-center gap-1" role="list">
                        {
                            [...Array(pageCount)].map((_, i) => (
                                i < 5 &&
                                <button key={`button-page-${i + 1}`}
                                    type="button"
                                    className="min-w-9 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm text-white"
                                    aria-current="page"
                                >
                                    {i + 1}
                                </button>
                            )
                            )}
                        <span className="px-2 text-gray-500">…</span>
                        {
                            [...Array(pageCount)].map((_, i) => (
                                i >= pageCount - 5 && i < pageCount &&
                                <button key={`button-page-${i + 1}`}
                                    type="button"
                                    className="min-w-9 rounded border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm text-white"
                                    aria-current="page"
                                >
                                    {i + 1}
                                </button>
                            )
                            )}

                    </div>

                    {/* <!-- Next --> */}
                    <button
                        className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        aria-label="Next page"
                        type="button"
                    >
                        Next
                    </button>

                    {/* <!-- Jump to page --> */}
                    <div className="hidden items-center gap-2 sm:flex">
                        <label htmlFor="jumpPage" className="text-sm text-gray-600">Page:</label>
                        <input
                            id="jumpPage"
                            type="number"
                            min="1"
                            className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1"
                        />
                        <button
                            type="button"
                            className="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-300"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}