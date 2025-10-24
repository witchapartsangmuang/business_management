"use client";
export default function ProjectWorkList() {
    return (
        <>
            <div>
                <ul className="flex">
                    <li className="p-3">Project Leader</li>
                    <li className="p-3">Project Approver</li>
                    <li className="p-3">Team Member</li>
                    <li className="p-3">Project Sponsor</li>
                </ul>
            </div>
            <div className="border w-full">
                <div>
                    <input type="text" />
                    <button>columns</button>
                </div>
                <table className="border w-full">
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