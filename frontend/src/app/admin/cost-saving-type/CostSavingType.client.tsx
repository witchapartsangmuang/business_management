"use client"
export default function CostSavingTypePage() {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Cost Saving Type No.</th>
                        <th>Cost Saving Type Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input className="form-input" type="text" /></td>
                        <td><input className="form-input" type="text" /></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}