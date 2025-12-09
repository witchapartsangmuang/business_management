import { useState } from "react";

export default function CompanyInformationPage() {
    const [companyInfo, setCompanyInfo] = useState({
        companyNo: '',
        companyName: '',
        licenseType: '',
        totalUser: 0
    });

    async function handleSubmit() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyInfo)
        }).then((res) => {
            const data = res.json()
        }).catch((err) => {
            console.error('Error:', err)
        });
    }
    return (
        <>
            <div className="grid grid-cols-12">
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
            </div>
        </>
    )
}