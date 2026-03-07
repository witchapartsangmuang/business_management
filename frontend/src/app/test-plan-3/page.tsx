'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Tbody, Thead, TableWrapper, TrHead, Th, TrBody, Td } from "@/components/table/Table";
import { ProjectActivity, ProjectInfo } from '@/types/types';
import Input from '@/components/input/Input';
import Label from '@/components/input/Label';
import Select from '@/components/input/Select';
import TextArea from '@/components/input/Textarea';
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export default function Page() {
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


    function updateWeight(id: string | number, key: string, type: string, value: any) {

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
                type: "Plan",                    // "Plan" (or "Actual")
                project_no: null
            });
            // Move to next month
            cur.setUTCMonth(cur.getUTCMonth() + 1);
        }
        return { result };
    }


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
                                    <Th>#</Th>
                                    <Th>No.</Th>
                                    <Th>Activity Name</Th>
                                    <Th>PIC</Th>
                                    <Th>Start Date</Th>
                                    <Th>End Date</Th>
                                    <Th>% Weight</Th>
                                    <Th>% Progress</Th>
                                    <Th>Status</Th>
                                    <Th></Th>
                                    <Th>
                                        <div className='flex gap-2'>
                                            {
                                                monthList.map((m, i) => (
                                                    <div key={i} className='w-[5rem] min-w-[5rem]'>{m}</div>
                                                ))
                                            }
                                        </div>
                                    </Th>
                                </TrHead>
                            </Thead>
                            <Tbody>
                                {activityList.map((act, index) => (
                                    <>
                                        <TrBody key={act.id}>
                                            <Th rowSpan={2}>-</Th>
                                            <Td rowSpan={2}>{act.sequence}</Td>
                                            <Td rowSpan={2}><TextArea value={act.activity_name} rows={3} onChange={(e) => updateActivity(act.id, 'activity_name', e.target.value)} /></Td>
                                            <Td rowSpan={2}><Select optionList={[{ label: "A", value: "1" }, { label: "B", value: "2" }]} rowKey={`pic-${index}-${act.id}`} defaultSelectedValue={act.pic ?? ''} onChange={(value) => updateActivity(act.id, 'pic', value)} /></Td>
                                            <Td rowSpan={2}><Input type='date' value={act.start_date} onChange={(e) => updateActivity(act.id, 'start_date', e.target.value)} /></Td>
                                            <Td rowSpan={2}><Input type='date' value={act.end_date} onChange={(e) => updateActivity(act.id, 'end_date', e.target.value)} /></Td>
                                            <Td rowSpan={2}><Input type='number' value={act.weight} onChange={(e) => updateActivity(act.id, 'weight', e.target.value)} /></Td>
                                            <Td rowSpan={2}><Input type='number' min={0} max={100} value={act.progress} onChange={(e) => updateActivity(act.id, 'progress', e.target.value)} /></Td>
                                            <Td rowSpan={2}><Select optionList={[{ label: "Completed", value: "1" }, { label: "Not Started", value: "Not Started" }, { label: "In Progress", value: "In Progress" }]} rowKey={`status-${index}-${act.id}`} defaultSelectedValue={act.status ?? ''} onChange={(value) => updateActivity(act.id, 'status', value)} /></Td>
                                            <Td>
                                                <span>P</span>
                                            </Td>
                                            <Td>
                                                <div className='flex gap-2'>
                                                    {
                                                        monthList.map((m, i) => (
                                                            <div className='w-[5rem] min-w-[5rem]' key={i}>
                                                                <Input className=' h-6 bg-green-500/50'></Input>
                                                            </div>

                                                        ))
                                                    }
                                                </div>

                                            </Td>
                                            <Td rowSpan={2}>
                                                <button onClick={() => deleteActivity(act.id)}>Delete</button>
                                            </Td>
                                        </TrBody>
                                        <TrBody>
                                            <Td>
                                                <span>A</span>
                                            </Td>
                                            <Td>
                                                <div className='flex gap-2'>
                                                    {
                                                        monthList.map((m, i) => (
                                                            <div className='w-[5rem] min-w-[5rem]' key={i}>
                                                                <Input className=' h-6 bg-green-500/50' />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </Td>
                                        </TrBody>
                                    </>
                                ))}
                            </Tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                    </TableWrapper>
                </div>
            </div>
        </div>
    )
}