import { useState } from "react";

export default function CompanyInformation() {
    const [tabOpen, setTabOpen] = useState(3);
    const [companyInfo, setCompanyInfo] = useState({
        companyNo: '',
        companyName: '',
        licenseType: '',
        totalUser: 0
    });
    return (
        <>
            <div className="flex mt-3">
                <ul className="flex px-2">
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 0 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(0) }}>Company Information</button>
                    <button className={`py-1.5 px-4 rounded-t ${tabOpen === 1 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(1) }}>Accounts</button>
                </ul>
            </div>
            <div className="bg-white rounded min-h-[calc(100vh-12rem)]">
                <div className="grid grid-cols-12">
                    {
                        tabOpen === 0 &&
                        <>

                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Company No.</label>
                                <input type="text" className="form-input" name="companyNo" value={companyInfo.companyNo} onChange={(e) => { setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value }) }} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Company Name</label>
                                <input type="text" className="form-input" name="companyName" value={companyInfo.companyName} onChange={(e) => { setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value }) }} />
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="licenseType">Lisense Type</label>
                                <select className="form-select" name="licenseType" value={companyInfo.licenseType} onChange={(e) => { setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value }) }}>
                                    <option value="">S</option>
                                    <option value="">M</option>
                                    <option value="">L</option>
                                </select>
                            </div>
                            <div className="col-span-6 mt-3 px-3">
                                <label className="form-label" htmlFor="">Total User</label>
                                <input type="number" className="form-input" name="totalUser" value={companyInfo.totalUser} onChange={(e) => { setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value }) }} />
                            </div>
                            <div className="col-span-12 mt-3 px-3">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </>
                    }
                    {
                        tabOpen === 1 &&
                        <>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

