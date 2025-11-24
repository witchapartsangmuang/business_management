'use client'
import { useState } from "react";
export default function Page() {
    const [tabOpen, setTabOpen] = useState(0);
    const [projectInfo, setProjectInfo] = useState<{
        projectNo: string;
        ideaNo: string;
        projectName: string;
        mdPolicy: string;
        startDate: string;
        endDate: string
    }>({ projectNo: '', ideaNo: '', projectName: '', mdPolicy: '', startDate: '', endDate: '' });
    return (
        <>
            <div className="grid grid-cols-12">
                {tabOpen === 0 &&
                    <>
                        <div className="col-span-6 mt-3 px-3">
                            <label className="form-label" htmlFor="">Project No.</label>
                            <input type="text" className="form-input w-full" value={projectInfo.projectNo} readOnly />
                        </div>
                        <div className="col-span-6 mt-3 px-3">
                            <label className="form-label" htmlFor="">Idea No.</label>
                            <input type="text" className="form-input w-full" value={projectInfo.ideaNo} readOnly />
                        </div>
                        <div className="col-span-6 mt-3 px-3">
                            <label className="form-label" htmlFor="">Project Name</label>
                            <input type="text" className="form-input w-full" value={projectInfo.projectName} onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })} />
                        </div>
                        <div className="col-span-6 mt-3 px-3">
                            <label className="form-label" htmlFor="">MD Policy</label>
                            <select className="form-select w-full" value={projectInfo.mdPolicy} onChange={(e) => setProjectInfo({ ...projectInfo, mdPolicy: e.target.value })}>
                                <option value="test1">test1</option>
                                <option value="test2">test2</option>
                            </select>
                        </div>
                        <div className="col-span-6 mt-3 px-3">
                            <label className="form-label" htmlFor="">Start Date</label>
                            <input type="date" className="form-input w-full" value={projectInfo.startDate} onChange={(e) => setProjectInfo({ ...projectInfo, startDate: e.target.value })} />
                        </div>
                        <div className="col-span-6 mt-3 px-3">
                            <label className="form-label" htmlFor="">End Date</label>
                            <input type="date" className="form-input w-full" value={projectInfo.endDate} onChange={(e) => setProjectInfo({ ...projectInfo, endDate: e.target.value })} />
                        </div>
                        <div className="col-span-12 mt-3 px-3">
                            <div className="table-wrapper">
                                <table className="tbl tbl-zebra tbl-sortable">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Role</th>
                                            <th>Created</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>John Doe</td>
                                            <td><span className="tbl-badge tbl-badge-success">Active</span></td>
                                            <td>Manager</td>
                                            <td>2025-01-22</td>
                                        </tr>

                                        <tr className="tbl-row-selected">
                                            <td>Jane Smith</td>
                                            <td><span className="tbl-badge tbl-badge-warning">Pending</span></td>
                                            <td>Staff</td>
                                            <td>2025-01-21</td>
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
                {/* {tabOpen === 1 &&}
                {tabOpen === 2 &&}
                {tabOpen === 3 &&} */}


            </div>
        </>
    )
}