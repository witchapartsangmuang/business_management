'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Tbody, Thead, TableWrapper, TrHead, Th, TrBody, Td, Tfoot, TrFoot } from "@/components/table/Table";
import { ProjectActivity, ProjectInfo } from '@/types/types';
import Input from '@/components/input/Input';
import Label from '@/components/input/Label';
import Select from '@/components/input/Select';
import TextArea from '@/components/input/Textarea';
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export default function ProjectPlan() {
    const [projectInfo, setProjectInfo] = useState<Pick<ProjectInfo, "plan_start_date" | "plan_end_date" | "end_date_rev">>({
        plan_start_date: '',
        plan_end_date: '',
        end_date_rev: '',
    });

    const [monthList, setmonthList] = useState<string[]>([])
    const [activityList, setactivityList] = useState<ProjectActivity[]>([
        {
            id: crypto.randomUUID(),
            sequence: 1,
            activity_name: "Activity 1",
            responsible_person: null,
            start_date: "",
            end_date: "",
            weight: 0,
            progress: 0,
            status: "Not Started",
            is_deleted: false,
            project_id: null,
            plan: {},
            actual: {},
        }
    ])
    const [deleteActivityList, setdeleteActivityList] = useState<string[]>([])
    function addActivity() {
        setactivityList(prev => [...prev, {
            id: crypto.randomUUID(),
            sequence: 1,
            activity_name: "Activity 1",
            responsible_person: null,
            start_date: "",
            end_date: "",
            weight: 0,
            progress: 0,
            status: "Not Started",
            is_deleted: false,
            project_id: null,
            plan: {},
            actual: {},
        }]);
    }

    function updateActivity(id: string, field: string, value: any) {
        setactivityList(prev => prev.map(act => {
            if (act.id === id) {
                return {
                    ...act,
                    [field]: value,
                }
            }
            return act;
        }));
    }

    function deleteActivity(id: string) {
        setactivityList(prev => {
            const filtered = prev.filter(act => act.id !== id);
            return filtered.map((act, index) => ({
                ...act,
                sequence: index + 1,
            }));
        });
        setdeleteActivityList(prev => [...prev, id]);
    }


    function updateWeight(act_id: ProjectActivity['id'], type: 'plan' | 'actual', month_key: string, value: number) {
        setactivityList(prev => prev.map(a => {
            if (a.id !== act_id) return a;
            const updatedActivity: ProjectActivity = {
                ...a,
                [type]: {
                    ...a[type],
                    [month_key]: value,
                }
            };
            return {
                ...updatedActivity,
                progress: calculateActivityProgress(updatedActivity),
            };
        }));
    }
    function calculateActivityProgress(act: ProjectActivity) {
        var totalPlan = 0
        var totalActual = 0
        monthList.forEach((m) => {
            totalPlan += Number(act.plan?.[m] ?? 0);
            totalActual += Number(act.actual?.[m] ?? 0);

        })
        if (totalPlan <= 0) return 0;
        return Math.min(Math.round((totalActual / totalPlan) * 100), 100);
    }

    function parseUSDateToYearMonth(mmddyyyy: string) {
        const [yyyy, mm, dd] = mmddyyyy.split("-").map(Number);
        if (!mm || !dd || !yyyy) throw new Error("Invalid date format. Use MM-DD-YYYY");
        return { y: yyyy, m: mm - 1 };
    }

    // Key for sorting: "YYYY-MM"
    function formatKey(y: number, m: number) {
        const mm = String(m + 1).padStart(2, "0");
        return `${y}-${mm}`;
    }
    function buildMonthRange(startDate: string, endDate: string) {
        const s = parseUSDateToYearMonth(startDate);
        const e = parseUSDateToYearMonth(endDate);
        const cur = new Date(Date.UTC(s.y, s.m, 1));
        const end = new Date(Date.UTC(e.y, e.m, 1));
        const result = [];
        while (cur <= end) {
            const y = cur.getUTCFullYear();
            const m = cur.getUTCMonth();
            result.push({
                month: formatKey(y, m),   // "2025-02"
                project_no: null
            });
            // Move to next month
            cur.setUTCMonth(cur.getUTCMonth() + 1);
        }
        return { result };
    }

    const tableSummary = useMemo(() => {
        const planList: number[] = []
        const actualList: number[] = []
        monthList.map((m) => {
            var monthPlan = 0
            var monthActual = 0
            activityList.forEach((act) => {
                monthPlan += act.plan[m] ?? 0
                monthActual += act.actual[m] ?? 0
            })
            planList.push(monthPlan)
            actualList.push(monthActual)
        })
        const startDates = activityList.map(act => act.start_date).filter((date) => Boolean(date));
        const endDates = activityList.map(act => act.end_date).filter((date) => Boolean(date));
        return {
            minStartDate: startDates.length > 0 ? startDates.reduce((min, curr) => curr < min ? curr : min) : '',
            maxEndDate: endDates.length > 0 ? endDates.reduce((max, curr) => curr > max ? curr : max) : '',
            totalWeight: activityList.reduce((sum, act) => sum + Number(act.weight), 0),
            totalProgress: activityList.reduce((sum, act) => sum + Number(Math.round((act.progress * act.weight) / 100)), 0),
            planList,
            actualList,
        };
    }, [activityList, monthList]);

    useEffect(() => {
        if (projectInfo.plan_start_date && projectInfo.plan_end_date) {
            const { result } = buildMonthRange(projectInfo.plan_start_date, projectInfo.plan_end_date);
            setmonthList(result.map(r => r.month));
        }
    }, [projectInfo.plan_start_date, projectInfo.plan_end_date]);

    return (
        <div className="bg-white rounded min-h-[calc(100vh-16rem)]">
            <div className="grid grid-cols-12">
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Plan Start Date" htmlFor="plan_start_date" require />
                    <Input
                        type="date"
                        id="plan_start_date"
                        value={projectInfo.plan_start_date}
                        max={projectInfo.plan_end_date}
                        onChange={(e) => setProjectInfo({ ...projectInfo, plan_start_date: e.target.value })}
                    />
                </div>
                <div className="col-span-6 mt-3 px-3">
                    <Label title="Plan End Date" htmlFor="plan_end_date" require />
                    <Input
                        type="date"
                        id="plan_end_date"
                        value={projectInfo.plan_end_date}
                        min={projectInfo.plan_start_date}
                        readOnly={!projectInfo.plan_start_date}
                        onChange={(e) => setProjectInfo({ ...projectInfo, plan_end_date: e.target.value })}
                    />
                </div>
                <div className="col-span-6 mt-3 px-3">
                    <button onClick={addActivity}>Add Activity</button>
                </div>
                <div className="col-span-12 mt-3 px-3">
                    <TableWrapper overflow>
                        <Table>
                            <Thead>
                                <TrHead>
                                    <Th style={{ width: "2rem", minWidth: "2rem" }}>#</Th>
                                    <Th style={{ width: "3rem", minWidth: "3rem" }}>No.</Th>
                                    <Th style={{ width: "22rem", minWidth: "22rem" }}>Activity Name</Th>
                                    <Th style={{ width: "14rem", minWidth: "14rem" }}>PIC</Th>
                                    <Th style={{ width: "10rem", minWidth: "10rem" }}>Start Date</Th>
                                    <Th style={{ width: "10rem", minWidth: "10rem" }}>End Date</Th>
                                    <Th style={{ width: "6rem", minWidth: "6rem" }}>% Weight</Th>
                                    <Th style={{ width: "6rem", minWidth: "6rem" }}>% Progress</Th>
                                    <Th style={{ width: "8rem", minWidth: "8rem" }}>Status</Th>
                                    <Th style={{ width: "3rem", minWidth: "3rem" }}></Th>
                                    <Th>
                                        <div className='flex gap-2'>
                                            {
                                                monthList.map((m, i) => (
                                                    <div key={i} className='w-20 min-w-20'>{m}</div>
                                                ))
                                            }
                                        </div>
                                    </Th>
                                    <Th style={{ width: "5rem", minWidth: "5rem", position: "sticky", right: "0" }}>Action</Th>
                                </TrHead>
                            </Thead>
                            <Tbody>
                                {activityList.map((act, index) => (
                                    <TrBody key={act.id}>
                                        <Td>-</Td>
                                        <Td>{act.sequence}</Td>
                                        <Td><TextArea value={act.activity_name} rows={3} onChange={(e) => updateActivity(act.id, 'activity_name', e.target.value)} /></Td>
                                        <Td><Select optionList={[{ label: "A", value: "1" }, { label: "B", value: "2" }]} rowKey={`pic-${index}-${act.id}`} defaultSelectedValue={act.pic ?? ''} onChange={(value) => updateActivity(act.id, 'pic', value)} /></Td>
                                        <Td><Input type='date' value={act.start_date} onChange={(e) => updateActivity(act.id, 'start_date', e.target.value)} /></Td>
                                        <Td><Input type='date' value={act.end_date} onChange={(e) => updateActivity(act.id, 'end_date', e.target.value)} /></Td>
                                        <Td><Input type='number' value={act.weight} onChange={(e) => updateActivity(act.id, 'weight', e.target.value)} /></Td>
                                        <Td><span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{act.progress}</span></Td>
                                        <Td><span className='block px-3 py-2 text-center'>{act.status}</span></Td>
                                        <Td>
                                            <span className='block px-3 py-2 text-center'>P</span>
                                            <span className='block px-3 py-2 text-center mt-1'>A</span>
                                        </Td>
                                        <Td>
                                            <div className='flex gap-2'>
                                                {
                                                    monthList.map((m, i) => (
                                                        <div className='w-20 min-w-20' key={`${act.id}-plan-${i}`}>
                                                            <Input type='number' value={act.plan[m] || ''} onChange={(e) => updateWeight(act.id, 'plan', m, Number(e.target.value))} />
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                            <div className='flex gap-2 mt-1'>
                                                {
                                                    monthList.map((m, i) => (
                                                        <div className='w-20 min-w-20' key={`${act.id}-actual-${i}`}>
                                                            <Input type='number' value={act.actual[m] || ''} onChange={(e) => updateWeight(act.id, 'actual', m, Number(e.target.value))} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </Td>
                                        <Td style={{ position: "sticky", right: "0" }}>
                                            <button onClick={() => deleteActivity(act.id)}>Delete</button>
                                        </Td>
                                    </TrBody>
                                ))}
                                <TrBody>
                                    <Td colSpan={12}></Td>
                                </TrBody>
                            </Tbody>
                            <Tfoot>
                                <TrFoot>
                                    <Td colSpan={4}></Td>
                                    <Td><span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{tableSummary.minStartDate}</span></Td>
                                    <Td><span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{tableSummary.maxEndDate}</span></Td>
                                    <Td><span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{tableSummary.totalWeight}</span></Td>
                                    <Td><span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{tableSummary.totalProgress}</span></Td>
                                    <Td></Td>
                                    <Td>
                                        <span className='block px-3 py-2 text-center'>P</span>
                                        <span className='block px-3 py-2 text-center mt-1'>A</span>
                                    </Td>
                                    <Td>
                                        <div className='flex gap-2'>
                                            {
                                                tableSummary.planList.map((m, i) => (
                                                    <div className='w-20 min-w-20' key={`summary-plan-${i}`}>
                                                        <span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{m > 0 ? m : ""}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='flex gap-2 mt-1'>
                                            {
                                                tableSummary.actualList.map((m, i) => (
                                                    <div className='w-20 min-w-20' key={`summary-plan-${i}`}>
                                                        <span className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm h-[38px] text-center'>{m > 0 ? m : ""}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Td>
                                    <Td style={{ position: "sticky", right: "0" }}></Td>
                                </TrFoot>
                            </Tfoot>
                        </Table>
                    </TableWrapper>
                </div>
            </div>
        </div>
    )
}