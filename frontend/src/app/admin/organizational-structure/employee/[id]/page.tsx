'use client';
import IconPencil from "@/components/icons/icon-pen";
import ToggleSwitch from "@/components/input/ToggleSwitch";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import { Employee, Permission } from "@/types/types";
import SearchSelect from "@/components/input/SearchSelect";
import { EmployeeService } from "@/features/services/employee";
export default function EmployeeDetailPage() {
    const params = useParams<{ id: string }>()
    const [tabOpen, setTabOpen] = useState(0);
    const [employeeInfo, setEmployeeInfo] = useState<Omit<Employee, "password">>({
        id: null,
        profile_picture: '',
        emp_code: 'EMP01',
        description: 'description',
        first_name: 'Witchapart',
        last_name: 'Sangmuang',
        email: 'witchapart.s@gmail.com',
        phone: '0837531397',
        position: 'Officer',
        organizational_unit: '',
        report_to: null,
        language: 'en',
        is_active: true,
        is_project_leader: true,
        is_project_approver: true,
        is_project_member: true,
        created_by: null,
        created_datetime: null,
        updated_by: null,
        updated_datetime: null
    });
    const [permission, setpermission] = useState<Permission>({
        id: null,
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
        employee_delete: true,
        permission_for: null
    })
    // useEffect(()=>{
    //     console.log(employeeInfo.approver, 'employeeInfo.approver');

    // },[employeeInfo.approver])
    function submitEmployeeInfo() {
        console.log('employeeInfo', employeeInfo);
        // Extact for correct type
        const { id, ...newObj } = employeeInfo
        if (employeeInfo.id !== null) {
            EmployeeService.update(employeeInfo.id, newObj)
        } else {
            EmployeeService.create(newObj)
        }
    }


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
                                    className="group relative w-32 h-32 cursor-pointer overflow-hidden rounded-full"
                                    // onClick={openPicker}
                                    title="คลิกเพื่อเปลี่ยนรูป"
                                >
                                    <img
                                        // src={displayUrl}
                                        src="/default-profile-avatar.webp"
                                        alt="Profile"
                                        className="w-32 h-32 object-cover rounded-full border border-gray-300 bg-gray-200"
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
                                <input type="text" className="form-input" value={employeeInfo.emp_code} onChange={(e) => setEmployeeInfo({ ...employeeInfo, emp_code: e.target.value })} />
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
                                    placeholder={'Select Approver'}
                                    defaultValue={String(employeeInfo.report_to)}
                                    onChange={(value) => setEmployeeInfo({ ...employeeInfo, report_to: value !== null ? Number(value) : null })}
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
                                                    <ToggleSwitch checked={permission.md_policy_view}
                                                        onChange={() => setpermission({
                                                            ...permission, md_policy_view: !permission.md_policy_view,
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
                                                        checked={permission.kpi_alignment_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                kpi_alignment_view: !permission.kpi_alignment_view,
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
                                                        checked={permission.project_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                project_view: !permission.project_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.project_create}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                project_create: !permission.project_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.project_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                project_update: !permission.project_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.project_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                project_delete: !permission.project_delete,
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
                                                        checked={permission.report_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                report_view: !permission.report_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td className="text-gray-400">-</td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.report_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                report_update: !permission.report_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.report_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                report_delete: !permission.report_delete,
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
                                                        checked={permission.dashboard_executive_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                dashboard_executive_view: !permission.dashboard_executive_view,
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
                                                        checked={permission.dashboard_manager_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                dashboard_manager_view: !permission.dashboard_manager_view,
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
                                                        checked={permission.dashboard_user_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                dashboard_user_view: !permission.dashboard_user_view,
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
                                                        checked={permission.admin_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                admin_view: !permission.admin_view,
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
                                                        checked={permission.cost_saving_type_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                cost_saving_type_view: !permission.cost_saving_type_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.cost_saving_type_create}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                cost_saving_type_create: !permission.cost_saving_type_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.cost_saving_type_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                cost_saving_type_update: !permission.cost_saving_type_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.cost_saving_type_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                cost_saving_type_delete: !permission.cost_saving_type_delete,
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
                                                        checked={permission.policy_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                policy_view: !permission.policy_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.policy_create}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                policy_create: !permission.policy_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.policy_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                policy_update: !permission.policy_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.policy_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                policy_delete: !permission.policy_delete,
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
                                                        checked={permission.kpi_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                kpi_view: !permission.kpi_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.kpi_create}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                kpi_create: !permission.kpi_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.kpi_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                kpi_update: !permission.kpi_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.kpi_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                kpi_delete: !permission.kpi_delete,
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
                                                        checked={permission.organizational_unit_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                organizational_unit_view: !permission.organizational_unit_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.organizational_unit_create}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                organizational_unit_create:
                                                                    !permission.organizational_unit_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.organizational_unit_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                organizational_unit_update:
                                                                    !permission.organizational_unit_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.organizational_unit_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                organizational_unit_delete:
                                                                    !permission.organizational_unit_delete,
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
                                                        checked={permission.employee_view}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                employee_view: !permission.employee_view,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.employee_create}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                employee_create: !permission.employee_create,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.employee_update}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                employee_update: !permission.employee_update,
                                                            })
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <ToggleSwitch
                                                        checked={permission.employee_delete}
                                                        onChange={() =>
                                                            setpermission({
                                                                ...permission,
                                                                employee_delete: !permission.employee_delete,
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
                    <button className="primary-button" onClick={submitEmployeeInfo}>Save</button>
                </div>
            </div>
        </>
    )
}