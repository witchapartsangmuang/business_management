'use client';
import IconPencil from "@/components/icons/icon-pen";
import ToggleSwitch from "@/components/input/ToggleSwitch";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import { Employee, Permission } from "@/types/types";
import SearchSelect from "@/components/input/SearchSelect";
import { EmployeeService } from "@/features/services/employee";
import PasswordInput from "@/components/input/InputPassword";
import { ValidateEmployeeError } from "@/types/validate-types";
import Modal from "@/components/Modal";
import Label from "@/components/input/Label";
export default function EmployeeDetailPage() {
    const params = useParams<{ id: string }>()
    const [tabOpen, setTabOpen] = useState(0);
    const [confirmPassword, setconfirmPassword] = useState('')
    const [employeeInfo, setEmployeeInfo] = useState<Employee>({
        id: null,
        profile_picture: '',
        emp_code: 'EMP01',
        description: 'description',
        first_name: 'Witchapart',
        last_name: 'Sangmuang',
        email: 'witchapart.s@gmail.com',
        phone: '0837531397',
        password: '',
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

    const [validateErrorModalOpen, setvalidateErrorModalOpen] = useState(false);
    const [validateFieldError, setvalidateFieldError] = useState<ValidateEmployeeError>({
        emp_code: {
            valid_status: true,
            errorText: ''
        },
        first_name: {
            valid_status: true,
            errorText: ''
        },
        last_name: {
            valid_status: true,
            errorText: ''
        },
        email: {
            valid_status: true,
            errorText: ''
        },
        password: {
            valid_status: true,
            errorText: ''
        },
        confirmPassword: {
            valid_status: true,
            errorText: ''
        }
    })

    useEffect(() => {
        console.log(validateFieldError, "validateFieldError");
    }, [validateFieldError])

    function validateData() {
        let validateStatus = true;
        const errorList: ValidateEmployeeError = { ...validateFieldError };
        // emp_code
        if (employeeInfo.emp_code.trim() === "") {
            errorList.emp_code = { valid_status: false, errorText: "Please define employee code." };
            validateStatus = false;
        } else {
            errorList.emp_code = { valid_status: true, errorText: "" };
        }
        // first_name
        if (employeeInfo.first_name.trim() === "") {
            errorList.first_name = { valid_status: false, errorText: "Please define first name." };
            validateStatus = false;
        } else {
            errorList.first_name = { valid_status: true, errorText: "" };
        }
        // last_name
        if (employeeInfo.last_name.trim() === "") {
            errorList.last_name = { valid_status: false, errorText: "Please define last name." };
            validateStatus = false;
        } else {
            errorList.last_name = { valid_status: true, errorText: "" };
        }
        // email
        if (employeeInfo.email.trim() === "") {
            errorList.email = { valid_status: false, errorText: "Please define email." };
            validateStatus = false;
        } else {
            errorList.email = { valid_status: true, errorText: "" };
        }
        // password
        if (employeeInfo.password === "") {
            errorList.password = { valid_status: false, errorText: "Please define password." };
            validateStatus = false;
        } else {
            errorList.password = { valid_status: true, errorText: "" };
        }
        // confirmPassword
        if (confirmPassword === "") {
            errorList.confirmPassword = { valid_status: false, errorText: "Please confirm password." };
            validateStatus = false;
        } else if (employeeInfo.password !== confirmPassword) {
            errorList.confirmPassword = {
                valid_status: false,
                errorText: "Password and Confirm Password do not match.",
            };
            validateStatus = false;
        } else {
            errorList.confirmPassword = { valid_status: true, errorText: "" };
        }

        setvalidateFieldError(errorList);

        return validateStatus;
    }

    const closeValidateModal = () => {
        setvalidateErrorModalOpen(false)
    }


    function submitEmployeeInfo() {
        console.log('employeeInfo', employeeInfo);
        // Extact for correct type
        const { id, ...newObj } = employeeInfo
        if (employeeInfo.id !== null) {
            EmployeeService.update(employeeInfo.id, newObj)
        } else {
            if (validateData()) {
                // EmployeeService.create({ employee: newObj, permission: permission })
            } else {
                setvalidateErrorModalOpen(true)
            }
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
                                <Label title="Description" />
                                <textarea className="form-input" value={employeeInfo.description} onChange={(e) => setEmployeeInfo({ ...employeeInfo, description: e.target.value })}></textarea>
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Employee Code" require />
                                <input type="text" className={`form-input ${!validateFieldError.emp_code.valid_status && 'border-red-500'}`}
                                    value={employeeInfo.emp_code}
                                    onMouseDown={() => { setvalidateFieldError({ ...validateFieldError, emp_code: { valid_status: true, errorText: '' } }) }}
                                    onChange={(e) => { setEmployeeInfo({ ...employeeInfo, emp_code: e.target.value }) }} />
                                {validateFieldError.emp_code.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.emp_code.errorText}.</p>}
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="First Name" require />
                                <input type="text" className="form-input"
                                    value={employeeInfo.first_name}
                                    onMouseDown={() => { setvalidateFieldError({ ...validateFieldError, first_name: { valid_status: true, errorText: '' } }) }}
                                    onChange={(e) => { setEmployeeInfo({ ...employeeInfo, first_name: e.target.value }) }} />
                                {validateFieldError.first_name.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.first_name.errorText}.</p>}
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Last Name" require />
                                <input type="text" className="form-input"
                                    value={employeeInfo.last_name}
                                    onMouseDown={() => { setvalidateFieldError({ ...validateFieldError, last_name: { valid_status: true, errorText: '' } }) }}
                                    onChange={(e) => { setEmployeeInfo({ ...employeeInfo, last_name: e.target.value }) }} />
                                {validateFieldError.last_name.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.last_name.errorText}.</p>}
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Email" require />
                                <input type="text" className="form-input"
                                    value={employeeInfo.email}
                                    onMouseDown={() => { setvalidateFieldError({ ...validateFieldError, email: { valid_status: true, errorText: '' } }) }}
                                    onChange={(e) => { setEmployeeInfo({ ...employeeInfo, email: e.target.value }) }} />
                                {validateFieldError.last_name.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.last_name.errorText}.</p>}
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Password" require />
                                <PasswordInput value={employeeInfo.password} onChange={(e) => {
                                    setEmployeeInfo({ ...employeeInfo, password: e.target.value })
                                    setvalidateFieldError({ ...validateFieldError, password: { valid_status: true, errorText: '' } })
                                }} />
                                {validateFieldError.password.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.last_name.errorText}.</p>}
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Confirm Password" require />
                                <PasswordInput value={confirmPassword} onChange={(e) => {
                                    setconfirmPassword(e.target.value)
                                    setvalidateFieldError({ ...validateFieldError, confirmPassword: { valid_status: true, errorText: '' } })
                                }} />
                                {validateFieldError.confirmPassword.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.last_name.errorText}.</p>}
                            </div>

                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Phone" />
                                <input type="text" className="form-input" value={employeeInfo.phone} onChange={(e) => setEmployeeInfo({ ...employeeInfo, phone: e.target.value })}
                                />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Position" />
                                <input type="text" className="form-input" value={employeeInfo.position} onChange={(e) => setEmployeeInfo({ ...employeeInfo, position: e.target.value })}
                                />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Report To" />
                                <SearchSelect
                                    optionList={[{ value: "1", label: "Mr. A" }, { value: "2", label: "Mr. B" }, { value: "3", label: "Mr. C" }]}
                                    placeholder={'Select Approver'}
                                    defaultValue={String(employeeInfo.report_to)}
                                    onChange={(value) => setEmployeeInfo({ ...employeeInfo, report_to: value !== null ? Number(value) : null })}
                                />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <Label title="Organizational Unit" />
                                <select className="form-select" value={employeeInfo.organizational_unit} onChange={(e) => setEmployeeInfo({ ...employeeInfo, organizational_unit: e.target.value })}  >
                                    <option>Sales</option>
                                    <option>Marketing</option>
                                </select>
                            </div>
                            {
                                employeeInfo.id !== null &&
                                <div className="col-span-12 mt-3 px-3">
                                    <div className="flex justify-end">
                                        <div className="pt-2">
                                            <button className="primary-button">
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }


                            <div className="col-span-12 mt-10 px-3">
                                <p className="font-bold">Special Role</p>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 mt-3 px-3">
                                <ToggleSwitch checked={employeeInfo.is_project_leader} onChange={() => setEmployeeInfo({ ...employeeInfo, is_project_leader: !employeeInfo.is_project_leader })} checked_label="Project Leader" unchecked_label="Project Leader" />
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 mt-3 px-3">
                                <ToggleSwitch checked={employeeInfo.is_project_approver} onChange={() => setEmployeeInfo({ ...employeeInfo, is_project_approver: !employeeInfo.is_project_approver })} checked_label="Project Approver" unchecked_label="Project Approver" />
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 mt-3 px-3">
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
            <Modal isOpen={validateErrorModalOpen} onClose={closeValidateModal} title="Validate Data Failed!">
                {validateFieldError.emp_code.errorText !== '' && <p>{validateFieldError.emp_code.errorText}</p>}
                {validateFieldError.first_name.errorText !== '' && <p>{validateFieldError.first_name.errorText}</p>}
                {validateFieldError.last_name.errorText !== '' && <p>{validateFieldError.last_name.errorText}</p>}
                {validateFieldError.email.errorText !== '' && <p>{validateFieldError.email.errorText}</p>}
                {validateFieldError.password.errorText !== '' && <p>{validateFieldError.password.errorText}</p>}
                {validateFieldError.confirmPassword.errorText !== '' && <p>{validateFieldError.confirmPassword.errorText}</p>}
            </Modal>
        </>
    )
}