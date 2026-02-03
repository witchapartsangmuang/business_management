'use client'
import SearchSelect from "@/components/input/SearchSelect";
import { useEffect, useState } from "react";

import { Md_Policy, Kpi, Employee_Project, ProjectInfo, } from "@/types/project";
import { Table, TableBody, TableFooter, TableHeader, TableWrapper } from "@/components/table/Table";
// Start Data List For Select
const md_policy_list: Md_Policy[] = [
    { id: 1, policy_code: 'SD&SG', policy_name: 'Strategic Direction & Sustainable Growth Policy', year_target: 2026 },
    { id: 2, policy_code: 'PRM', policy_name: 'Performance & Result-Oriented Management Policy', year_target: 2026 },
    { id: 3, policy_code: 'PLS', policy_name: 'People, Leadership & Successor Development Policy', year_target: 2026 },
    { id: 4, policy_code: 'PE&CE', policy_name: 'Process Excellence & Cost Efficiency Policy', year_target: 2026 },
]
const kpi_list: Kpi[] = [
    { id: 1, kpi_code: 'SOAR', kpi_name: 'Strategic Objective Achievement Rate', unit: '%', md_number: 1 },
    { id: 4, kpi_code: 'CRPI', kpi_name: 'Cost Reduction from Process Improvement', unit: 'MB', md_number: 4 },
    { id: 6, kpi_code: 'MCRI', kpi_name: 'Major Compliance & Risk Incident', unit: 'Case', md_number: 6 },
    { id: 7, kpi_code: 'CSI', kpi_name: 'Customer Satisfaction Index (CSI)', unit: 'Score', md_number: 7 },
]

const employee_list: Employee_Project[] = [
    { id: 1, employee_code: 'EMP001', first_name: 'Witchapart', last_name: 'Sangmuang', is_project_leader: true, is_project_approver: false, is_project_member: true, },
    { id: 2, employee_code: 'EMP002', first_name: 'Aphiwit', last_name: 'Muangsang', is_project_leader: false, is_project_approver: true, is_project_member: true, },
    { id: 3, employee_code: 'EMP003', first_name: 'Sangya', last_name: 'Kanya', is_project_leader: true, is_project_approver: false, is_project_member: true, },
]
export default function ProjectPage() {
    const [select_md_policy_list, setselect_md_policy_list] = useState<{ value: string, label: string }[]>([])

    const [kpi_select_list, setkpi_select_list] = useState<{ value: string, label: string }[]>([])
    const [other_benefit_select_list, setother_benefit_select_list] = useState<{ value: string, label: string }[]>(kpi_list.map(kpi => ({ value: String(kpi.id), label: `${kpi.kpi_code} - ${kpi.kpi_name} (${kpi.unit})` })))

    const [select_project_leader_list, setselect_project_leader_list] = useState<{ value: string, label: string }[]>([])
    const [select_project_approver_list, setselect_project_approver_list] = useState<{ value: string, label: string }[]>([])
    const [select_project_member_list, setselect_project_member_list] = useState<{ value: string, label: string }[]>([])


    useEffect(() => {
        const filter_kpi_list: { value: string, label: string }[] = []
        const kpi_output = kpi_list.filter(kpi => md_policy_list.some(md => md.id === kpi.md_number))
            .map(kpi => ({ value: String(kpi.id), label: `${kpi.kpi_code} - ${kpi.kpi_name} (${kpi.unit})` }))
        filter_kpi_list.push(...kpi_output)
        setkpi_select_list(filter_kpi_list)
    }, [kpi_list])

    useEffect(() => {
        const filter_select_md_policy_list: { value: string, label: string }[] = []
        md_policy_list.map((md) => {
            filter_select_md_policy_list.push({ value: String(md.id), label: `${md.policy_code} - ${md.policy_name} (${md.year_target})` })
        })
        setselect_md_policy_list(select_md_policy_list => [...select_md_policy_list, ...filter_select_md_policy_list])
    }, [md_policy_list])

    useEffect(() => {
        const filter_select_project_leader_list: { value: string, label: string }[] = []
        const filter_select_project_approver_list: { value: string, label: string }[] = []
        const filter_select_project_member_list: { value: string, label: string }[] = []
        employee_list.map((emp) => {
            if (emp.is_project_leader) {
                filter_select_project_leader_list.push({ value: String(emp.id), label: `${emp.first_name} ${emp.last_name} (${emp.employee_code})` })
            }
            if (emp.is_project_approver) {
                filter_select_project_approver_list.push({ value: String(emp.id), label: `${emp.first_name} ${emp.last_name} (${emp.employee_code})` })
            }
            if (emp.is_project_member) {
                filter_select_project_member_list.push({ value: String(emp.id), label: `${emp.first_name} ${emp.last_name} (${emp.employee_code})` })
            }
        })
        setselect_project_leader_list(select_project_leader_list => [...select_project_leader_list, ...filter_select_project_leader_list])
        setselect_project_approver_list(select_project_approver_list => [...select_project_approver_list, ...filter_select_project_approver_list])
        setselect_project_member_list(select_project_member_list => [...select_project_member_list, ...filter_select_project_member_list])
    }, [employee_list])


    const [tabOpen, setTabOpen] = useState(0);

    const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
        project_id: '',
        project_name: '',
        md_policy: 1,
        project_leader: '',
        project_org: '',
        start_date: '',
        end_date: '',
        step: 'Registed',
        status: null,
        // For Revise
        end_date_rev: '',
        opportunity_statement: '',
        est_investment: 0,
        // For Revise
        est_investment_rev: 0,
        est_gross_earnings: 0,
        payback_period_year: 0,
        return_on_investment: 0,
        project_approver: '',
        grade_quality: '',
        grade_reason: ''
    });
    const [project_kpi_list, setproject_kpi_list] = useState<{ id: number | null, sequence: number, kpi_id: number | null, target: number | null, plan: any[], actual: any[] }[]>([
        {
            id: null,
            sequence: 1,
            kpi_id: null,
            target: null,
            plan: [],
            actual: []
        }
    ])


    function onClickInsertProjectKpi(row: number) {
        setproject_kpi_list([...project_kpi_list, {
            id: null,
            sequence: row,
            kpi_id: null,
            target: 0,
            plan: [],
            actual: []
        }])
    }
    function onChangeProjectKpi(row: number, selectedKpi: number | null, target?: number) {
        const kpi_id = kpi_list.find((kpi) => kpi.id === selectedKpi)?.id || null
        const updateKpi = project_kpi_list.map((projectKpi, index) => {
            if (row === index) {
                return { ...projectKpi, kpi_id, target: target !== undefined ? target : projectKpi.target }
            } else {
                return projectKpi
            }
        })
        setproject_kpi_list(updateKpi)
    }

    function onClickRemoveProjectKpi(row: number) {
        var updateKpi = project_kpi_list.filter((kpi) => kpi.sequence !== row)
        var number = 1
        updateKpi = updateKpi.map((projectKpi) => {
            const kpiItem = { ...projectKpi, sequence: number }
            number += 1
            return kpiItem
        })
        setproject_kpi_list(updateKpi)
    }



    const [project_other_benefit_list, setproject_other_benefit_list] = useState<{ id: number | null, sequence: number, kpi_id: number | null, target: number | null, plan: any[], actual: any[] }[]>([
        {
            id: null,
            sequence: 1,
            kpi_id: null,
            target: null,
            plan: [],
            actual: []
        }
    ])

    function onClickInsertProjectOtherBenefit(row: number) {
        setproject_other_benefit_list([...project_other_benefit_list, {
            id: null,
            sequence: row,
            kpi_id: null,
            target: 0,
            plan: [],
            actual: []
        }])
    }
    function onChangeProjectOtherBenefit(row: number, selectedKpi: number | null, target?: number) {
        const kpi_id = kpi_list.find((kpi) => kpi.id === selectedKpi)?.id || null
        const updateKpi = project_other_benefit_list.map((projectKpi, index) => {
            if (row === index) {
                return { ...projectKpi, kpi_id, target: target !== undefined ? target : projectKpi.target }
            } else {
                return projectKpi
            }
        })
        setproject_other_benefit_list(updateKpi)
    }

    function onClickRemoveProjectOtherBenefit(row: number) {
        var updateKpi = project_other_benefit_list.filter((kpi) => kpi.sequence !== row)
        var number = 1
        updateKpi = updateKpi.map((projectKpi) => {
            const kpiItem = { ...projectKpi, sequence: number }
            number += 1
            return kpiItem
        })
        setproject_other_benefit_list(updateKpi)
    }



    const [teamMember, setteamMember] = useState([
        { sequence: 1, emp_no: "", empName: "", weight: 0, start_date: "", end_date: "", }
    ])

    function onClickInsertTeamMember(row: number) {
        setteamMember([...teamMember, {
            sequence: row,
            emp_no: "",
            empName: "",
            weight: 0,
            start_date: "",
            end_date: ""
        }])
    }

    // useEffect(() => {
    //     console.log(`project_kpi_list : `, project_kpi_list);
    // }, [project_kpi_list])
    return (
        <>
            <ul className="flex bg-white rounded p-5 justify-center">
                <li className="text-center text-blue-700">Registered<span className="px-2">{'>'}</span></li>
                <li className="text-gray-400">Submitted for Approval<span className="px-2">{'>'}</span></li>
                <li className="text-gray-400">On Going<span className="px-2">{'>'}</span></li>
                <li className="text-gray-400">Submitted for Closure<span className="px-2">{'>'}</span></li>
                <li className="text-gray-400">Completed</li>
            </ul>
            <div className="flex mt-3">
                <ul className="flex px-2">
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 0 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(0) }}>Information</button>
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 1 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(1) }}>Benefits/Investment</button>
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 2 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(2) }}>Team Member</button>
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 3 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(3) }}>Project Plan</button>
                </ul>
            </div>


            <div className="bg-white rounded min-h-[calc(100vh-16rem)]">
                <div className="grid grid-cols-12">
                    {tabOpen === 0 &&
                        <>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Project No.</label>
                                <input type="text" className="form-input" value={projectInfo.project_id} readOnly />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Project Name</label>
                                <input type="text" className="form-input" value={projectInfo.project_name} onChange={(e) => setProjectInfo({ ...projectInfo, project_name: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">MD Policy</label>
                                <SearchSelect optionList={select_md_policy_list} placeholder={'Select MD Policy'} defaultValue={String(projectInfo.md_policy)} onChange={(value) => setProjectInfo({ ...projectInfo, md_policy: Number(value) })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Project Leader</label>
                                <SearchSelect optionList={select_project_leader_list} placeholder={'Select Project Leader'} defaultValue={projectInfo.project_leader} onChange={(value) => setProjectInfo({ ...projectInfo, project_leader: value !== null ? value : '' })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Start Date</label>
                                <input type="date" className="form-input" value={projectInfo.start_date} onChange={(e) => setProjectInfo({ ...projectInfo, start_date: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">End Date</label>
                                <input type="date" className="form-input" value={projectInfo.end_date} onChange={(e) => setProjectInfo({ ...projectInfo, end_date: e.target.value })} />
                            </div>
                            <div className="col-span-12 mt-10 px-3">
                                <p className="font-bold">KPI (Key Peroformance Indicator)</p>
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <TableWrapper>
                                    <Table>
                                        <TableHeader>
                                            <tr>
                                                <th>#</th>
                                                <th>KPI</th>
                                                <th>Target</th>
                                                <th>Unit</th>
                                                <th>Action</th>
                                            </tr>
                                        </TableHeader>
                                        <TableBody>
                                            {project_kpi_list.map((projectKpi, index) => (
                                                <tr key={`project_kpi_list-${index}`}>
                                                    <td>{projectKpi.sequence}</td>
                                                    <td>
                                                        <SearchSelect optionList={kpi_select_list} placeholder={'Select KPI'} defaultValue={String(projectKpi.kpi_id)} onChange={(value) => { onChangeProjectKpi(index, Number(value)) }} />
                                                    </td>
                                                    <td><input type="number" className="form-input" value={projectKpi.target !== null ? projectKpi.target : ''} onChange={(e) => { onChangeProjectKpi(index, projectKpi.kpi_id, Number(e.target.value)) }} /></td>
                                                    <td><input type="text" className="form-input" value={projectKpi.kpi_id ? kpi_list.find(k => k.id === projectKpi.kpi_id)?.unit : ""} readOnly /></td>
                                                    <td>
                                                        <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => { onClickRemoveProjectKpi(projectKpi.sequence) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <tr>
                                                <td colSpan={5}>Total: {project_kpi_list.length} kpi(s)</td>
                                            </tr>
                                        </TableFooter>
                                    </Table>
                                    <div className="flex justify-between">
                                        <div className="px-4 py-3">
                                            <button className="primary-button" onClick={() => { onClickInsertProjectKpi(project_kpi_list.length + 1) }}>
                                                Add
                                            </button>
                                        </div>
                                        <div className="tbl-pagination">
                                            <button className="tbl-page-btn">Prev</button>
                                            <button className="tbl-page-btn tbl-page-btn-active">1</button>
                                            <button className="tbl-page-btn">2</button>
                                            <button className="tbl-page-btn">Next</button>
                                        </div>
                                    </div>
                                </TableWrapper>
                            </div>
                        </>
                    }
                    {tabOpen === 1 &&
                        <>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Est. Investment</label>
                                <input type="number" className="form-input" value={projectInfo.est_investment} onChange={(e) => setProjectInfo({ ...projectInfo, est_investment: Number(e.target.value) })} />
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Est. Gross Earnings</label>
                                <input type="number" className="form-input" value={projectInfo.est_gross_earnings} onChange={(e) => setProjectInfo({ ...projectInfo, est_gross_earnings: Number(e.target.value) })} />
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Payback Period (Year)</label>
                                <input type="number" className="form-input" readOnly value={projectInfo.payback_period_year} onChange={(e) => setProjectInfo({ ...projectInfo, payback_period_year: Number(e.target.value) })} />
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Return on Investment - ROI (%)</label>
                                <input type="number" className="form-input" readOnly value={projectInfo.return_on_investment} onChange={(e) => setProjectInfo({ ...projectInfo, return_on_investment: Number(e.target.value) })} />
                            </div>
                            <div className="col-span-12 mt-10 px-3">
                                <p className="font-bold">Other Benefit</p>
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <div className="table-scroll-x">
                                        <div className="table-inner">
                                            <table className="tbl tbl-zebra tbl-sortable">
                                                <thead className="">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Other Benefit</th>
                                                        <th>Target</th>
                                                        <th>Unit</th>
                                                        <th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th><th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {project_other_benefit_list.map((projectKpi, index) => (
                                                        <tr key={`project_other_benefit_list-${index}`}>
                                                            <td>{projectKpi.sequence}</td>
                                                            <td>
                                                                <SearchSelect optionList={other_benefit_select_list} placeholder={'Select Other Benefit'} defaultValue={String(projectKpi.kpi_id)} onChange={(value) => { onChangeProjectOtherBenefit(index, Number(value)) }} />
                                                            </td>
                                                            <td><input type="number" className="form-input" value={projectKpi.target !== null ? projectKpi.target : ''} onChange={(e) => { onChangeProjectOtherBenefit(index, projectKpi.kpi_id, Number(e.target.value)) }} /></td>
                                                            <td><input type="text" className="form-input" value={projectKpi.kpi_id ? kpi_list.find(k => k.id === projectKpi.kpi_id)?.unit : ""} readOnly /></td>
                                                            <td>
                                                                <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => { onClickRemoveProjectOtherBenefit(projectKpi.sequence) }}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan={5}>Total: {project_other_benefit_list.length} Other Benefit(s)</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="px-4 py-3">
                                        <button className="primary-button" onClick={() => { onClickInsertProjectOtherBenefit(project_other_benefit_list.length + 1) }}>
                                            Add
                                        </button>
                                    </div>
                                    <div className="tbl-pagination">
                                        <button className="tbl-page-btn">Prev</button>
                                        <button className="tbl-page-btn tbl-page-btn-active">1</button>
                                        <button className="tbl-page-btn">2</button>
                                        <button className="tbl-page-btn">Next</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {tabOpen === 2 &&
                        <>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Approver</label>
                                <SearchSelect optionList={select_project_approver_list} placeholder={'Select Project Approver'} defaultValue={projectInfo.project_approver} onChange={(value) => setProjectInfo({ ...projectInfo, project_approver: value !== null ? value : '' })} />
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th>No.</th>
                                                <th>Name</th>
                                                <th>% Weight</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                teamMember.map((member, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><SearchSelect optionList={select_project_member_list} placeholder={'Select Team Member'} defaultValue={member.empName} onChange={(value) => {
                                                            const newTeamMember = [...teamMember];
                                                            newTeamMember[index].empName = value !== null ? value : '';
                                                            setteamMember(newTeamMember);
                                                        }} /></td>
                                                        <td><input type="number" className="form-input" value={member.weight} onChange={(e) => {
                                                            const newTeamMember = [...teamMember];
                                                            newTeamMember[index].weight = Number(e.target.value);
                                                            setteamMember(newTeamMember);
                                                        }} /></td>
                                                        <td>
                                                            <input type="date" className="form-input" value={member.start_date} onChange={(e) => {
                                                                const newTeamMember = [...teamMember];
                                                                newTeamMember[index].start_date = e.target.value;
                                                                setteamMember(newTeamMember);
                                                            }} /></td>
                                                        <td>
                                                            <input type="date" className="form-input" value={member.end_date} onChange={(e) => {
                                                                const newTeamMember = [...teamMember];
                                                                newTeamMember[index].end_date = e.target.value;
                                                                setteamMember(newTeamMember);
                                                            }} />
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={6}>Total: {teamMember.length} member(s)</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className="flex justify-between">
                                        <div className="px-4 py-3">
                                            <button className="primary-button" onClick={() => { onClickInsertTeamMember(teamMember.length + 1) }}>
                                                Add
                                            </button>
                                        </div>
                                        <div className="tbl-pagination">
                                            <button className="tbl-page-btn">Prev</button>
                                            <button className="tbl-page-btn tbl-page-btn-active">1</button>
                                            <button className="tbl-page-btn">2</button>
                                            <button className="tbl-page-btn">Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    }
                    {tabOpen === 3 &&
                        <>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th className="w-[8rem]"></th>
                                                <th className="w-[3rem]"></th>
                                                <th>
                                                    <div className="flex">
                                                        <div className="w-[5rem] text-center p-1">Jan 25</div>
                                                        <div className="w-[5rem] text-center p-1">Jan 25</div>
                                                        <div className="w-[5rem] text-center p-1">Jan 25</div>

                                                    </div>
                                                </th>
                                                <th className="w-[5rem] text-center">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-nowrap">Income</td>
                                                <td>
                                                    <div className="flex h-[3rem] items-center">P</div>
                                                    <div className="flex h-[3rem] items-center">A</div>
                                                </td>
                                                <td>
                                                    <div className="flex h-[3rem]">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex h-[3rem]">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex h-[3rem] items-center">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex h-[3rem] items-center">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Cost Saving</td>
                                                <td>
                                                    <div className="flex h-[3rem] items-center">P</div>
                                                    <div className="flex h-[3rem] items-center">A</div>
                                                </td>
                                                <td>
                                                    <div className="flex h-[3rem]">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex h-[3rem]">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex h-[3rem] items-center">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex h-[3rem] items-center">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Investment</td>
                                                <td>
                                                    <div className="flex h-[3rem] items-center">P</div>
                                                    <div className="flex h-[3rem] items-center">A</div>
                                                </td>
                                                <td>
                                                    <div className="flex h-[3rem]">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex h-[3rem]">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex h-[3rem] items-center">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex h-[3rem] items-center">
                                                        <div className="w-[5rem] p-1">
                                                            <input type="number" className="form-input" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <div className="">
                                        <table className="tbl tbl-zebra tbl-sortable">
                                            <thead className="">
                                                <tr>
                                                    <th className="min-w-[3rem]"></th>
                                                    <th className="min-w-[3rem]">No.</th>
                                                    <th className="min-w-[32rem]">Activity</th>
                                                    <th className="min-w-[12rem]">PIC</th>
                                                    <th className="min-w-[12rem]">Start Date</th>
                                                    <th className="min-w-[12rem]">End Date</th>
                                                    <th className="min-w-[8rem]">% Weight</th>
                                                    <th className="min-w-[3rem]"></th>
                                                    <th>
                                                        <div className="flex">
                                                            <div className="w-[5rem] text-center p-1">Jan 25</div>
                                                            <div className="w-[5rem] text-center p-1">Jan 25</div>
                                                            <div className="w-[5rem] text-center p-1">Jan 25</div>
                                                        </div>
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>1</td>
                                                    <td>
                                                        <textarea className="form-input"></textarea>
                                                    </td>
                                                    <td>
                                                        <select className="form-select truncate">
                                                            <option value="test1">Witchapart Sangmuang 1</option>
                                                            <option value="test2">Witchapart Sangmuang 2</option>
                                                        </select>
                                                        {/* <SearchSelect
                                                        optionList={[{ value: "1", label: "Mr. A" }, { value: "2", label: "Mr. B" }]}
                                                        onChange={(value) => setteamMember({ ...employeeInfo, approver: value })}
                                                        placeholder={'select!! Approver'}
                                                    /> */}
                                                    </td>
                                                    <td><input type="date" className="form-input" /></td>
                                                    <td><input type="date" className="form-input" /></td>
                                                    <td><input type="number" className="form-input" /></td>
                                                    <td>
                                                        <div className="flex h-[3rem] items-center">P</div>
                                                        <div className="flex h-[3rem] items-center">A</div>
                                                    </td>
                                                    <td>
                                                        <div className="flex h-[3rem]">
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                        </div>
                                                        <div className="flex h-[3rem]">
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button>DEL</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td>1</td>
                                                    <td>
                                                        <textarea className="form-input"></textarea>
                                                    </td>
                                                    <td>
                                                        <select className="form-select">
                                                            <option value="test1">test1</option>
                                                            <option value="test2">test2</option>
                                                        </select>
                                                    </td>
                                                    <td><input type="date" className="form-input" /></td>
                                                    <td><input type="date" className="form-input" /></td>
                                                    <td><input type="number" className="form-input" /></td>
                                                    <td>
                                                        <div className="flex h-[3rem] items-center">P</div>
                                                        <div className="flex h-[3rem] items-center">A</div>
                                                    </td>
                                                    <td>
                                                        <div className="flex h-[3rem]">
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                        </div>
                                                        <div className="flex h-[3rem]">
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                            <div className="w-[5rem] p-1">
                                                                <input type="number" className="form-input" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button>DEL</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="rounded bg-white my-2">
                                    <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add</button>
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