'use client';
import IconPencil from "@/components/icons/icon-pen";
import ToggleSwitch from "@/components/input/ToggleSwitch";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import { Employee, Permission } from "@/types/types";
import SearchSelect from "@/components/input/SearchSelect";
export default function EmployeeDetailPage() {
    const params = useParams<{ id: string }>()
    const [tabOpen, setTabOpen] = useState(0);
    const [employeeInfo, setEmployeeInfo] = useState<Employee & Permission>({
        id: null,
        profile_picture: '',
        employee_code: '',
        description: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        organizational_unit: '',
        approver: '',
        language: 'en',
        is_active: true,
        is_project_leader: true,
        is_project_approver: true,
        is_project_member: true,
        // Permissions
        md_policy_view: true,
        kpi_alignment_view: true,
        project_view: true,
        project_create: true,
        project_update: true,
        project_delete: true,

        report_view: true,
        report_update: true,
        report_delete: true,

        dashboard_executive_view: true,
        dashboard_manager_view: true,
        dashboard_user_view: true,

        admin_view: true,

        cost_saving_type_view: true,
        cost_saving_type_create: true,
        cost_saving_type_update: true,
        cost_saving_type_delete: true,

        policy_view: true,
        policy_create: true,
        policy_update: true,
        policy_delete: true,

        kpi_view: true,
        kpi_create: true,
        kpi_update: true,
        kpi_delete: true,

        organizational_unit_view: true,
        organizational_unit_create: true,
        organizational_unit_update: true,
        organizational_unit_delete: true,

        employee_view: true,
        employee_create: true,
        employee_update: true,
        employee_delete: true
    });
    // useEffect(()=>{
    //     console.log(employeeInfo.approver, 'employeeInfo.approver');

    // },[employeeInfo.approver])
    async function fetchData() {
        try {
            await axios.get(`/api/employee/${params.id}`).then((response) => {
                setEmployeeInfo(response.data);
            }).catch((error) => {
                console.error("Error fetching employee data:", error);
                notFound();
            })
        } catch (error) {
            console.error("Error fetching employee data:", error);
            notFound();
        }
    }
    useEffect(() => {
        console.log("Employee ID:", params.id);
        if (params.id === 'new') {

        } else {
            fetchData()
        }
    }, [params.id]);
    return (
        <>
            <div className="flex mt-3">
                <ul className="flex px-2">
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 0 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(0) }}>Information</button>
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 1 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(1) }}>Menu Permission</button>
                </ul>
            </div>
            <div className="bg-white rounded min-h-[calc(100vh-12rem)]">
                <div className="grid grid-cols-12">
                    {tabOpen === 0 &&
                        <>
                            {/* <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={onPickFile}
                            /> */}
                            <div className="col-span-12 mt-3 px-3">
                                <div className="flex justify-end">
                                    <ToggleSwitch checked={employeeInfo.is_active} onChange={() => setEmployeeInfo({ ...employeeInfo, is_active: !employeeInfo.is_active })} />
                                </div>
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <div
                                    className="group relative w-[128px] h-[128px] cursor-pointer overflow-hidden rounded-full"
                                    // onClick={openPicker}
                                    title="คลิกเพื่อเปลี่ยนรูป"
                                >
                                    <img
                                        // src={displayUrl}
                                        src="/default-profile-avatar.webp"
                                        alt="Profile"
                                        className="w-[128px] h-[128px] object-cover rounded-full border border-gray-300 bg-gray-200"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <IconPencil className="h-6 w-6 text-white opacity-80" />
                                    </div>
                                </div>
                                {/* {error && (
                                    <div className="text-xs text-red-600 mt-2">{error}</div>
                                )} */}
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Description</label>
                                <textarea className="form-input" value={employeeInfo.description} onChange={(e) => setEmployeeInfo({ ...employeeInfo, description: e.target.value })}></textarea>
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Employee Code</label>
                                <input type="text" className="form-input" value={employeeInfo.employee_code} onChange={(e) => setEmployeeInfo({ ...employeeInfo, employee_code: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">First Name</label>
                                <input type="text" className="form-input" value={employeeInfo.first_name} onChange={(e) => setEmployeeInfo({ ...employeeInfo, first_name: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Last Name</label>
                                <input type="text" className="form-input" value={employeeInfo.last_name} onChange={(e) => setEmployeeInfo({ ...employeeInfo, last_name: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text" className="form-input" value={employeeInfo.email} onChange={(e) => setEmployeeInfo({ ...employeeInfo, email: e.target.value })}
                                />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-input" value={employeeInfo.phone} onChange={(e) => setEmployeeInfo({ ...employeeInfo, phone: e.target.value })}
                                />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label">Position</label>
                                <input type="text" className="form-input" value={employeeInfo.position} onChange={(e) => setEmployeeInfo({ ...employeeInfo, position: e.target.value })}
                                />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label">Approver</label>
                                <SearchSelect
                                    optionList={[{ value: "1", label: "Mr. A" }, { value: "2", label: "Mr. B" }, { value: "3", label: "Mr. C" }]}
                                    onChange={(value) => setEmployeeInfo({ ...employeeInfo, approver: value })}
                                    placeholder={'select!! Approver'}
                                />

                            </div>

                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label">Organizational Unit</label>
                                <select className="form-select" value={employeeInfo.organizational_unit} onChange={(e) => setEmployeeInfo({ ...employeeInfo, organizational_unit: e.target.value })}  >
                                    <option>Sales</option>
                                    <option>Marketing</option>
                                </select>
                            </div>
                            <div className="col-span-12 mt-10 px-3">
                                <p className="font-bold">Special Role</p>
                            </div>
                            <div className="col-span-2 mt-3 px-3">
                                <ToggleSwitch checked={employeeInfo.is_project_leader} onChange={() => setEmployeeInfo({ ...employeeInfo, is_project_leader: !employeeInfo.is_project_leader })} checked_label="Project Leader" unchecked_label="Project Leader" />
                            </div>
                            <div className="col-span-2 mt-3 px-3">
                                <ToggleSwitch checked={employeeInfo.is_project_approver} onChange={() => setEmployeeInfo({ ...employeeInfo, is_project_approver: !employeeInfo.is_project_approver })} checked_label="Project Approver" unchecked_label="Project Approver" />
                            </div>
                            <div className="col-span-2 mt-3 px-3">
                                <ToggleSwitch checked={employeeInfo.is_project_member} onChange={() => setEmployeeInfo({ ...employeeInfo, is_project_member: !employeeInfo.is_project_member })} checked_label="Project Member" unchecked_label="Project Member" />
                            </div>
                        </>
                    }
                    {tabOpen === 1 &&
                        <>
                            <div className="col-span-12 mt-3 px-3">
                                <p className="font-bold">Basic Menu Permission</p>
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th className="w-[24rem]">Menu</th>
                                                <th>View</th>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* MD Policy */}
                                            <tr>
                                                <td>MD Policy</td>
                                                <td>
                                                    <ToggleSwitch checked={employeeInfo.md_policy_view}
                                                        onChange={() => setEmployeeInfo({
                                                            ...employeeInfo, md_policy_view: !employeeInfo.md_policy_view,
                                                        })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                            </tr>
                                            {/* KPI Alignment */}
                                            <tr>
                                                <td>KPI Alignment</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.kpi_alignment_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                kpi_alignment_view: !employeeInfo.kpi_alignment_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                            </tr>
                                            {/* Project */}
                                            <tr>
                                                <td>Project</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.project_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                project_view: !employeeInfo.project_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.project_create}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                project_create: !employeeInfo.project_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.project_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                project_update: !employeeInfo.project_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.project_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                project_delete: !employeeInfo.project_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {/* Report */}
                                            <tr>
                                                <td>Report</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.report_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                report_view: !employeeInfo.report_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.report_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                report_update: !employeeInfo.report_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.report_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                report_delete: !employeeInfo.report_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {/* Dashboard - Executive */}
                                            <tr>
                                                <td>Dashboard (Executive)</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.dashboard_executive_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                dashboard_executive_view: !employeeInfo.dashboard_executive_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                            </tr>
                                            {/* Dashboard - Manager */}
                                            <tr>
                                                <td>Dashboard (Manager)</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.dashboard_manager_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                dashboard_manager_view: !employeeInfo.dashboard_manager_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                            </tr>
                                            {/* Dashboard - User */}
                                            <tr>
                                                <td>Dashboard (User)</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.dashboard_user_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                dashboard_user_view: !employeeInfo.dashboard_user_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-span-12 mt-10 px-3">
                                <p className="font-bold">Admin Menu Permission</p>
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th className="w-[24rem]">Menu</th>
                                                <th>View</th>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Admin */}
                                            <tr>
                                                <td>Admin</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.admin_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                admin_view: !employeeInfo.admin_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                                <td className="text-gray-400">-</td>
                                            </tr>
                                            {/* Cost Saving Type */}
                                            <tr>
                                                <td>Cost Saving Type</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.cost_saving_type_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                cost_saving_type_view: !employeeInfo.cost_saving_type_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.cost_saving_type_create}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                cost_saving_type_create: !employeeInfo.cost_saving_type_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.cost_saving_type_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                cost_saving_type_update: !employeeInfo.cost_saving_type_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.cost_saving_type_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                cost_saving_type_delete: !employeeInfo.cost_saving_type_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {/* Policy */}
                                            <tr>
                                                <td>Policy</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.policy_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                policy_view: !employeeInfo.policy_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.policy_create}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                policy_create: !employeeInfo.policy_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.policy_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                policy_update: !employeeInfo.policy_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.policy_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                policy_delete: !employeeInfo.policy_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {/* KPI */}
                                            <tr>
                                                <td>KPI</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.kpi_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                kpi_view: !employeeInfo.kpi_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.kpi_create}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                kpi_create: !employeeInfo.kpi_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.kpi_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                kpi_update: !employeeInfo.kpi_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.kpi_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                kpi_delete: !employeeInfo.kpi_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {/* Organizational Unit */}
                                            <tr>
                                                <td>Organizational Unit</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.organizational_unit_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                organizational_unit_view: !employeeInfo.organizational_unit_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.organizational_unit_create}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                organizational_unit_create:
                                                                    !employeeInfo.organizational_unit_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.organizational_unit_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                organizational_unit_update:
                                                                    !employeeInfo.organizational_unit_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.organizational_unit_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                organizational_unit_delete:
                                                                    !employeeInfo.organizational_unit_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            {/* Employee */}
                                            <tr>
                                                <td>Employee</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.employee_view}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                employee_view: !employeeInfo.employee_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.employee_create}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                employee_create: !employeeInfo.employee_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.employee_update}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                employee_update: !employeeInfo.employee_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={employeeInfo.employee_delete}
                                                        onChange={() =>
                                                            setEmployeeInfo({
                                                                ...employeeInfo,
                                                                employee_delete: !employeeInfo.employee_delete,
                                                            })
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="flex justify-between rounded bg-white mt-2 p-2">
                <div>
                    <button className="secondary-button">Back</button>
                </div>
                <div>
                    <button className="primary-button">Save</button>
                </div>
            </div>
        </>
    )
}