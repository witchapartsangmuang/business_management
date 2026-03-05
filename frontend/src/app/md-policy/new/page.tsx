'use client';
import Input from "@/components/input/Input";
import Label from "@/components/input/Label";
import SearchSelect from "@/components/input/SearchSelect";
import Select from "@/components/input/Select";
import ToggleSwitch from "@/components/input/ToggleSwitch";
import { Table, TableWrapper, Tbody, Td, Th, Thead, TrBody, TrHead } from "@/components/table/Table";
import { kpiMasterService } from "@/features/services/kpi-master";
import { mdPolicyService } from "@/features/services/md-policy";
import { StrategicMasterService } from "@/features/services/policy-master";
import { KpiMaster, MdPolicy, StrategicMaster } from "@/types/types";
import { useParams, notFound, useRouter, redirect } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react";
export default function Page() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const [policyList, setpolicyList] = useState<StrategicMaster[]>([])
    const [kpiList, setkpiList] = useState<KpiMaster[]>([])
    const selectPolicyList: { label: string, value: string }[] = useMemo(() => {
        return policyList.map((policy) => ({
            label: `${policy.policy_name} (${policy.policy_code})`,
            value: String(policy.id)
        }))
    }, [policyList])
    const selectKpiList: { label: string, value: string }[] = useMemo(() => {
        return kpiList.map((kpi) => ({
            label: `${kpi.kpi_name} (${kpi.kpi_code})`,
            value: String(kpi.id)
        }))
    }, [kpiList])

    const [mdPolicyInfo, setmdPolicyInfo] = useState<MdPolicy>({
        id: null,
        year_target: new Date().getFullYear(),
        policy_id: null,
        is_active: true,
        is_deleted: false,
        created_by: null,
        created_datetime: null,
        updated_by: null,
        updated_datetime: null
    })
    const [mdPolicyKpiList, setmdPolicyKpiList] = useState<{ id: number | null, kpi_id: number | null, kpi_target: number | null, policy_id: number | null, is_deleted: boolean }[]>([
        {
            id: null,
            kpi_id: null,
            kpi_target: null,
            policy_id: null,
            is_deleted: false
        }
    ])

    async function fetctMasterData() {
        await Promise.all([
            StrategicMasterService.readAll(),
            kpiMasterService.readAll()
        ]).then(([policyRes, kpiRes]) => {
            setpolicyList(policyRes.policy);
            setkpiList(kpiRes.kpi);
        }).catch((err) => {
            console.log(err);
        })
    }
    async function fetchMdPolicyData() {
        mdPolicyService.readDetail(Number(params.id)).then((res) => {
            const mdPolicyData = res.mdPolicyInfo
            if (!mdPolicyData) {
                notFound()
            } else {
                setmdPolicyInfo(mdPolicyData)
            }
        }).catch((err) => {
            console.log(err);
        })

    }
    useEffect(() => {
        fetctMasterData()
    }, [])
    useEffect(() => {
        if (params.id !== 'new') {
            fetchMdPolicyData()
        }
    }, [params.id]);
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Policy" htmlFor="policy_id" />
                    <Select
                        id="policy_id"
                        optionList={selectPolicyList}
                        defaultSelectedValue={String(mdPolicyInfo.policy_id)}
                        onChange={(value) => setmdPolicyInfo({ ...mdPolicyInfo, policy_id: Number(value) })}
                    />
                </div>
                <div className="col-span-3 mt-3 px-3">
                    <Label title="Year Target" htmlFor="year_target" />
                    <Input
                        id="year_target"
                        type="number"
                        value={mdPolicyInfo.year_target}
                        onChange={(e) => setmdPolicyInfo({ ...mdPolicyInfo, year_target: Number(e.target.value) })}
                    />
                </div>
                <div className="col-span-3 mt-3 px-3">
                    <div className="flex justify-end">
                        <ToggleSwitch
                            checked={mdPolicyInfo.is_active}
                            onChange={() => setmdPolicyInfo({ ...mdPolicyInfo, is_active: !mdPolicyInfo.is_active })}
                        />
                    </div>
                </div>
                <div className="col-span-12 mt-3 px-3">
                    <p className="font-bold">KPI</p>
                </div>
            </div>
            {/* เพิ่ม field show on dashboard ด้วย */}
            <button>Add MD Policy</button>
            <TableWrapper>
                <Table>
                    <Thead>
                        <TrHead>
                            <Th>#</Th>
                            <Th>KPI</Th>
                            <Th>Target</Th>
                            <Th>Unit</Th>
                            <Th>Action</Th>
                        </TrHead>
                    </Thead>
                    <Tbody>
                        {
                            mdPolicyKpiList.filter(kpi => !kpi.is_deleted).map((kpi, index) => (
                                <TrBody key={index}>
                                    <Td>
                                        {index + 1}
                                    </Td>
                                    <Td>
                                        <SearchSelect
                                            rowKey={`kpi-${index}`}
                                            defaultSelectedValue={mdPolicyKpiList[index].kpi_id ? String(mdPolicyKpiList[index].kpi_id) : null}
                                            optionList={selectKpiList}
                                            onChange={(value) => {
                                                const updatedKpiList = [...mdPolicyKpiList];
                                                updatedKpiList[index].kpi_id = value ? Number(value) : null;
                                                setmdPolicyKpiList(updatedKpiList);
                                            }} />
                                    </Td>
                                    <Td>
                                        <Input
                                            value={kpi?.kpi_target || ''}
                                            type="text"
                                            onChange={(e) => {
                                                const updatedKpiList = [...mdPolicyKpiList];
                                                updatedKpiList[index].kpi_target = Number(e.target.value);
                                                setmdPolicyKpiList(updatedKpiList);
                                            }} />
                                    </Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            value={kpiList.find((k) => k.id === kpi.kpi_id)?.kpi_unit || ''}
                                            readOnly
                                        />
                                    </Td>
                                    <Td><button onClick={() => {
                                        const updatedKpiList = [...mdPolicyKpiList];
                                        updatedKpiList.splice(index, 1);
                                        setmdPolicyKpiList(updatedKpiList);
                                    }}>X</button></Td>
                                </TrBody>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableWrapper>
            <div className="flex">
                <button onClick={() => {
                    setmdPolicyKpiList([...mdPolicyKpiList, { id: null, kpi_id: null, kpi_target: 0, policy_id: mdPolicyInfo.policy_id === null ? null : Number(mdPolicyInfo.policy_id), is_deleted: false }]);
                }}>add</button>
            </div>
        </>
    )
}