'use client'
import { useEffect, useState } from "react";
type Kpi = {
    kpiNo: string;
    kpiName: string;
    unit: string;
}
type ProjectInfo = Kpi & {
    sequence: number;
    target: number;
    plan: number[];
    actual: number[];
};
export default function Page() {
    const [tabOpen, setTabOpen] = useState(3);
    const [kpiList, setkpiList] = useState<Kpi[]>([
        {
            kpiNo: "01",
            kpiName: "Sales Revenue",
            unit: "MB"
        }, {
            kpiNo: "02",
            kpiName: "Production Volume",
            unit: "tons"
        }, {
            kpiNo: "03",
            kpiName: "Cost Saving",
            unit: "MB"
        }
    ])
    const [projectInfo, setProjectInfo] = useState<{
        projectNo: string;
        ideaNo: string;
        projectName: string;
        mdPolicy: string;
        startDate: string;
        endDate: string
    }>({ projectNo: '', ideaNo: '', projectName: '', mdPolicy: '', startDate: '', endDate: '' });
    const [projectKpiList, setprojectKpiList] = useState<ProjectInfo[]>([
        {
            sequence: 1,
            kpiNo: "01",
            kpiName: "Sales Revenue",
            unit: "MB",
            target: 100,
            plan: [],
            actual: []
        }, {
            sequence: 2,
            kpiNo: "02",
            kpiName: "Production Volume",
            unit: "tons",
            target: 2000,
            plan: [],
            actual: []
        }, {
            sequence: 3,
            kpiNo: "03",
            kpiName: "Cost Saving",
            unit: "MB",
            target: 50,
            plan: [],
            actual: []
        }
    ])

    const [teamMember, setteamMember] = useState([
        { sequence: 1, empNo: "", empName: "", weight: 0, startDate: "", endDate: "", }
    ])

    function onClickInsertProjectKpi(row: number) {
        setprojectKpiList([...projectKpiList, {
            sequence: row,
            kpiNo: "",
            kpiName: "",
            unit: "",
            target: 0,
            plan: [],
            actual: []
        }])
    }
    function onChangeProjectKpi(row: number, selectedKpi: string, target?: number) {
        const { kpiNo, kpiName, unit } = kpiList.filter((kpi) => kpi.kpiNo === selectedKpi)[0]
        const updateKpi = projectKpiList.map((projectKpi, index) => {
            if (row === index) {
                return { ...projectKpi, kpiNo, kpiName, unit, target }
            } else {
                return projectKpi
            }
        })
        setprojectKpiList(updateKpi)
    }

    function onClickRemoveProjectKpi(row: number) {
        var updateKpi = projectKpiList.filter((kpi) => kpi.sequence !== row)
        var number = 1
        updateKpi = updateKpi.map((projectKpi) => {
            const kpiItem = { ...projectKpi, sequence: number }
            number += 1
            return kpiItem
        })
        setprojectKpiList(updateKpi)
    }

    useEffect(() => {
        console.log(projectKpiList)
    }, [projectKpiList])
    return (
        <>
            <ul className="flex px-2 py-1 justify-center">
                <li className="text-center">Registered</li>
                <li className="px-2">{`>`}</li>
                <li className="text-gray-400">Submitted for Approval</li>
                <li className="px-2 text-gray-400">{`>`}</li>
                <li className="text-gray-400">On Going</li>
                <li className="px-2 text-gray-400">{`>`}</li>
                <li className="text-gray-400">Submitted for Closure</li>
                <li className="px-2 text-gray-400">{`>`}</li>
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
            <div className="bg-white rounded min-h-[calc(100vh-12rem)]">
                <div className="grid grid-cols-12">
                    {tabOpen === 0 &&
                        <>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Project No.</label>
                                <input type="text" className="form-input" value={projectInfo.projectNo} readOnly />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Idea No.</label>
                                <input type="text" className="form-input" value={projectInfo.ideaNo} readOnly />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Project Name</label>
                                <input type="text" className="form-input" value={projectInfo.projectName} onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">MD Policy</label>
                                <select className="form-select" value={projectInfo.mdPolicy} onChange={(e) => setProjectInfo({ ...projectInfo, mdPolicy: e.target.value })}>
                                    <option value="test1">test1</option>
                                    <option value="test2">test2</option>
                                </select>
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Start Date</label>
                                <input type="date" className="form-input" value={projectInfo.startDate} onChange={(e) => setProjectInfo({ ...projectInfo, startDate: e.target.value })} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">End Date</label>
                                <input type="date" className="form-input" value={projectInfo.endDate} onChange={(e) => setProjectInfo({ ...projectInfo, endDate: e.target.value })} />
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th>KPI</th>
                                                <th>Target</th>
                                                <th>Unit</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projectKpiList.map((projectKpi, index) => (
                                                <tr key={`projectKpiList-${index}`}>
                                                    <td>{projectKpi.sequence}</td>
                                                    <td>
                                                        <select className="form-select" value={projectKpi.kpiNo} onChange={(e) => { onChangeProjectKpi(index, e.target.value, projectKpi.target) }}>
                                                            {projectKpi.kpiNo === "" && <option value=""></option>}
                                                            {kpiList.map((kpi, index) => (
                                                                <option key={`kpiList-${index}`} value={kpi.kpiNo}>{kpi.kpiName}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td><input type="number" className="form-input" value={projectKpi.target} onChange={(e) => { onChangeProjectKpi(index, projectKpi.kpiNo, Number(e.target.value)) }} disabled={projectKpi.kpiNo === ""} /></td>
                                                    <td><input type="text" className="form-input" value={projectKpi.unit} readOnly /></td>
                                                    <td>
                                                        <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => { onClickRemoveProjectKpi(projectKpi.sequence) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={4}>Total: 2 users</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className="tbl-pagination">
                                        <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => { onClickInsertProjectKpi(projectKpiList.length + 1) }}>
                                            Add
                                        </button>
                                        <button className="tbl-page-btn">Prev</button>
                                        <button className="tbl-page-btn tbl-page-btn-active">1</button>
                                        <button className="tbl-page-btn">2</button>
                                        <button className="tbl-page-btn">Next</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {tabOpen === 1 &&
                        <>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Est. Income</label>
                                <input type="text" className="form-input" />
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Est. Investment</label>
                                <input type="text" className="form-input" />
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Est. Cost Saving</label>
                                <input type="text" className="form-input" />
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Cost Saving Type</label>
                                <select className="form-select">
                                    <option value="test1">test1</option>
                                    <option value="test2">test2</option>
                                </select>
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th>Other Benefit</th>
                                                <th>Target</th>
                                                <th>Unit</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table></div></div>
                        </>
                    }
                    {tabOpen === 2 &&
                        <>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Approver</label>
                                <select className="form-select">
                                    <option value="test1">test1</option>
                                    <option value="test2">test2</option>
                                </select>
                            </div>
                            <div className="col-span-3 mt-3 px-3">
                                <label className="form-label" htmlFor="">Project Sponsor</label>
                                <select className="form-select">
                                    <option value="test1">test1</option>
                                    <option value="test2">test2</option>
                                </select>
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <div className="table-wrapper">
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th>Name</th>
                                                <th>% Weigth</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select className="form-select">
                                                        <option value="test1">test1</option>
                                                        <option value="test2">test2</option>
                                                    </select>
                                                </td>
                                                <td><input type="number" className="form-input" /></td>
                                                <td><input type="date" className="form-input" /></td>
                                                <td><input type="date" className="form-input" /></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select className="form-select">
                                                        <option value="test1">test1</option>
                                                        <option value="test2">test2</option>
                                                    </select>
                                                </td>
                                                <td><input type="number" className="form-input" /></td>
                                                <td><input type="date" className="form-input" /></td>
                                                <td><input type="date" className="form-input" /></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={4}>Total: 2 users</td>
                                            </tr>
                                        </tfoot>
                                    </table>

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
                                    <table className="tbl tbl-zebra tbl-sortable">
                                        <thead className="">
                                            <tr>
                                                <th className="min-w-[3rem]"></th>
                                                <th className="min-w-[3rem]">No.</th>
                                                <th className="min-w-[32rem]">Activity</th>
                                                <th className="min-w-[12rem]">PIC</th>
                                                <th className="min-w-[12rem]">Start Date</th>
                                                <th className="min-w-[12rem]">End Date</th>
                                                <th className="min-w-[8rem]">% Weigth</th>
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
                                <div className="rounded bg-white my-2">
                                    <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="flex justify-between rounded bg-white mt-2 p-2">
                <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Back</button>
                <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
            </div>
        </>
    )
}