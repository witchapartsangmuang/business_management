'use client'

import { useEffect, useState } from "react"
import { Employee, Permission } from "@/types/types";
import { EmployeeService } from "@/features/services/employee";
export default function EmployeePage() {
    const [emplyeeList, setEmployeeList] = useState<Employee[] & Permission[]>([])


    async function GetAllPolicyList() {
        await EmployeeService.readAll().then((res) => setEmployeeList(res.employee)).catch(() => (setEmployeeList([])))
    }
    useEffect(() => {
        GetAllPolicyList()
    }, []);
    useEffect(() => {
        console.log(emplyeeList);

    }, [emplyeeList])
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* <!-- Header --> */}
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">User List</h2>
                    <p className="text-sm text-gray-500">แสดงข้อมูลผู้ใช้งานล่าสุด</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    {/* <!-- Search --> */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search name / email..."
                            className="w-full sm:w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <span className="pointer-events-none absolute right-3 top-2.5 text-gray-400">⌕</span>
                    </div>

                    {/* <!-- Filter --> */}
                    <select
                        className="w-full sm:w-44 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">All Status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Inactive</option>
                    </select>

                    {/* <!-- Button --> */}
                    <button
                        className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        + Add User
                    </button>
                </div>
            </div>

            {/* <!-- Table --> */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Employee Code</th>
                            <th className="px-4 py-3 text-left font-medium">Name</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Position</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            emplyeeList.map((emp) => (
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-900">{emp.emp_code}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                            <div>
                                                <div className="font-medium text-gray-900">Piyawadee S.</div>
                                                <div className="text-xs text-gray-500">Department Manager</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">piyawadee@company.com</td>
                                    <td className="px-4 py-3 text-gray-700">Marketing</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="inline-flex gap-2">
                                            <button className="rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50">View</button>
                                            <button className="rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50">Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* <!-- Pagination --> */}
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-500">Showing 1-3 of 24</div>

                <div className="inline-flex items-center gap-1">
                    <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">Prev</button>
                    <button className="rounded-md border px-3 py-1.5 text-sm bg-gray-900 text-white">1</button>
                    <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">2</button>
                    <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">3</button>
                    <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    )
}