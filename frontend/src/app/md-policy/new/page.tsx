'use client';
import React, { useMemo, useState } from "react";
export default function Page() {
    const [mdPolicy, setmdPolicy] = useState([
        {
            md_policy: "MD 1",
            kpi: [
                {

                }
            ]
        }, {
            md_policy: "MD 2",
            kpi: [
                {

                }
            ]
        }

    ])
    return (
        <>
            <button>Add MD Policy</button>
            {
                mdPolicy.map((md) => (
                    <div className="border p-2 rounded-md">
                        <input type="text" value={md.md_policy} />
                        <table className="w-full">
                            <thead>
                                <tr className="border">
                                    <th>KPI</th>
                                    <th>Target</th>
                                    <th>Unit</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border">
                                    <td><input type="text" /></td>
                                    <td><input type="number" /></td>
                                    <td><input type="text" /></td>
                                    <td><button>X</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end">
                            <button> add</button>
                        </div>
                    </div>
                ))
            }
            <div className="flex">
                <button> add</button>
            </div>
        </>
    )
}