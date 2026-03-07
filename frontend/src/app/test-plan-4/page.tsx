'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
    Table,
    Tbody,
    Thead,
    TableWrapper,
    TrHead,
    Th,
    TrBody,
    Td,
} from '@/components/table/Table';
import { ProjectInfo } from '@/types/types';
import Input from '@/components/input/Input';
import Label from '@/components/input/Label';

type YMD = `${number}-${number}-${number}`;
type MonthKey = `${number}-${number}`;

type MonthlyValue = Partial<Record<MonthKey, string>>;
type ActivityStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';

type ActivityRow = {
    rowId: string;
    id: number | null;
    sequence: number;
    name: string;
    pic: string | null;
    start_date: YMD | '';
    end_date: YMD | '';
    weight: number;
    progress: number;
    status: ActivityStatus;
    is_deleted: boolean;
    plan: MonthlyValue;
    actual: MonthlyValue;
    isNew?: boolean;
    isDirty?: boolean;
};

type ProjectInfoState = Pick<
    ProjectInfo,
    'plan_start_date' | 'plan_end_date' | 'end_date_rev'
> & {
    plan_start_date: YMD | '';
    plan_end_date: YMD | '';
    end_date_rev: YMD | '';
};

type SavePayload = {
    project: {
        plan_start_date: string;
        plan_end_date: string;
        end_date_rev: string;
    };
    activities: {
        create: Array<Omit<ActivityRow, 'rowId' | 'isDirty'>>;
        update: Array<Omit<ActivityRow, 'rowId' | 'isNew' | 'isDirty'>>;
        delete: number[];
    };
};

const monthShortMap: Record<string, string> = {
    '01': 'JAN',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'APR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AUG',
    '09': 'SEP',
    '10': 'OCT',
    '11': 'NOV',
    '12': 'DEC',
};

function makeRowId() {
    return crypto.randomUUID();
}

function resequenceRows<T extends { sequence: number }>(rows: T[]): T[] {
    return rows.map((row, index) => ({
        ...row,
        sequence: index + 1,
    }));
}

function moveArrayItem<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const cloned = [...array];
    const [moved] = cloned.splice(fromIndex, 1);
    cloned.splice(toIndex, 0, moved);
    return cloned;
}

function calculateStatus(progress: number, startDate?: string, endDate?: string): ActivityStatus {
    if (progress >= 100) return 'Completed';
    if (progress <= 0) return 'Not Started';

    if (endDate) {
        const today = new Date();
        const end = new Date(endDate);
        if (!Number.isNaN(end.getTime()) && today > end && progress < 100) {
            return 'Delayed';
        }
    }

    return 'In Progress';
}

function createEmptyActivity(sequence: number): ActivityRow {
    return {
        rowId: makeRowId(),
        id: null,
        sequence,
        name: `Activity ${sequence}`,
        pic: '',
        start_date: '',
        end_date: '',
        weight: 0,
        progress: 0,
        status: 'Not Started',
        is_deleted: false,
        plan: {},
        actual: {},
        isNew: true,
        isDirty: false,
    };
}

function parseDateToYearMonth(ymd: string) {
    const [yyyy, mm] = ymd.split('-').map(Number);
    if (!yyyy || !mm) {
        throw new Error('Invalid date format. Use YYYY-MM-DD');
    }
    return { y: yyyy, m: mm - 1 };
}

function formatMonthKey(y: number, m: number): MonthKey {
    const mm = String(m + 1).padStart(2, '0');
    return `${y}-${mm}`;
}

function buildMonthRange(startDate: string, endDate: string): MonthKey[] {
    const s = parseDateToYearMonth(startDate);
    const e = parseDateToYearMonth(endDate);

    const cur = new Date(Date.UTC(s.y, s.m, 1));
    const end = new Date(Date.UTC(e.y, e.m, 1));
    const result: MonthKey[] = [];

    while (cur <= end) {
        const y = cur.getUTCFullYear();
        const m = cur.getUTCMonth();
        result.push(formatMonthKey(y, m));
        cur.setUTCMonth(cur.getUTCMonth() + 1);
    }

    return result;
}

function monthLabel(monthKey: MonthKey) {
    const [year, month] = monthKey.split('-');
    return `${monthShortMap[month] ?? month}/${year}`;
}

function monthEnabledForRow(row: ActivityRow, month: MonthKey) {
    if (!row.start_date || !row.end_date) return false;
    const rowStart = row.start_date.slice(0, 7);
    const rowEnd = row.end_date.slice(0, 7);
    return month >= rowStart && month <= rowEnd;
}

function buildSavePayload(
    projectInfo: ProjectInfoState,
    activityList: ActivityRow[],
    deletedActivityIds: number[],
): SavePayload {
    const createRows = activityList
        .filter((row) => row.id === null)
        .map(({ rowId, isDirty, ...rest }) => rest);

    const updateRows = activityList
        .filter((row) => row.id !== null && row.isDirty)
        .map(({ rowId, isNew, isDirty, ...rest }) => rest);

    return {
        project: {
            plan_start_date: projectInfo.plan_start_date,
            plan_end_date: projectInfo.plan_end_date,
            end_date_rev: projectInfo.end_date_rev,
        },
        activities: {
            create: createRows,
            update: updateRows,
            delete: deletedActivityIds,
        },
    };
}

function SortableActivityGroup({
    act,
    monthList,
    onDelete,
    onUpdateField,
    onUpdateMonth,
}: {
    act: ActivityRow;
    monthList: MonthKey[];
    onDelete: (rowId: string) => void;
    onUpdateField: <K extends keyof ActivityRow>(
        rowId: string,
        field: K,
        value: ActivityRow[K]
    ) => void;
    onUpdateMonth: (
        rowId: string,
        type: 'plan' | 'actual',
        key: MonthKey,
        value: string
    ) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: act.rowId,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <>
            <TrBody ref={setNodeRef} style={style}>
                <Td rowSpan={2} className="align-top">
                    <button
                        type="button"
                        className="mr-2 cursor-grab rounded border px-2 py-1 text-xs"
                        {...attributes}
                        {...listeners}
                        title="Drag to reorder"
                    >
                        ☰
                    </button>
                    {act.sequence}
                </Td>

                <Td rowSpan={2} className="align-top min-w-[220px]">
                    <Input
                        value={act.name}
                        onChange={(e) => onUpdateField(act.rowId, 'name', e.target.value)}
                    />
                </Td>

                <Td rowSpan={2} className="align-top min-w-[160px]">
                    <Input
                        value={act.pic ?? ''}
                        onChange={(e) => onUpdateField(act.rowId, 'pic', e.target.value)}
                    />
                </Td>

                <Td rowSpan={2} className="align-top min-w-[160px]">
                    <Input
                        type="date"
                        value={act.start_date}
                        onChange={(e) => onUpdateField(act.rowId, 'start_date', e.target.value as YMD)}
                    />
                </Td>

                <Td rowSpan={2} className="align-top min-w-[160px]">
                    <Input
                        type="date"
                        value={act.end_date}
                        min={act.start_date || undefined}
                        onChange={(e) => onUpdateField(act.rowId, 'end_date', e.target.value as YMD)}
                    />
                </Td>

                <Td rowSpan={2} className="align-top min-w-[120px]">
                    <Input
                        type="number"
                        min={0}
                        max={100}
                        value={String(act.weight)}
                        onChange={(e) => onUpdateField(act.rowId, 'weight', Number(e.target.value || 0))}
                    />
                </Td>

                <Td rowSpan={2} className="align-top min-w-[120px]">
                    <Input
                        type="number"
                        min={0}
                        max={100}
                        value={String(act.progress)}
                        onChange={(e) => onUpdateField(act.rowId, 'progress', Number(e.target.value || 0))}
                    />
                </Td>

                <Td rowSpan={2} className="align-top min-w-[140px]">
                    <span
                        className={[
                            'inline-flex rounded px-2 py-1 text-xs font-medium',
                            act.status === 'Completed' && 'bg-green-100 text-green-700',
                            act.status === 'In Progress' && 'bg-blue-100 text-blue-700',
                            act.status === 'Delayed' && 'bg-red-100 text-red-700',
                            act.status === 'Not Started' && 'bg-gray-100 text-gray-700',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        {act.status}
                    </span>
                </Td>

                <Td className="align-top text-center font-semibold">P</Td>

                <Td className="align-top">
                    <div className="flex gap-2">
                        {monthList.map((m) => {
                            const enabled = monthEnabledForRow(act, m);
                            return (
                                <div className="w-[5rem] min-w-[5rem]" key={`plan-${act.rowId}-${m}`}>
                                    <Input
                                        className={`h-8 ${enabled ? 'bg-green-50' : 'bg-gray-100 opacity-60'}`}
                                        value={act.plan[m] ?? ''}
                                        disabled={!enabled}
                                        onChange={(e) => onUpdateMonth(act.rowId, 'plan', m, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </Td>

                <Td rowSpan={2} className="align-top">
                    <button
                        onClick={() => onDelete(act.rowId)}
                        className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                        type="button"
                    >
                        Delete
                    </button>
                </Td>
            </TrBody>

            <TrBody>
                <Td className="align-top text-center font-semibold">A</Td>
                <Td className="align-top">
                    <div className="flex gap-2">
                        {monthList.map((m) => {
                            const enabled = monthEnabledForRow(act, m);
                            return (
                                <div className="w-[5rem] min-w-[5rem]" key={`actual-${act.rowId}-${m}`}>
                                    <Input
                                        className={`h-8 ${enabled ? 'bg-blue-50' : 'bg-gray-100 opacity-60'}`}
                                        value={act.actual[m] ?? ''}
                                        disabled={!enabled}
                                        onChange={(e) => onUpdateMonth(act.rowId, 'actual', m, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </Td>
            </TrBody>
        </>
    );
}

export default function Page() {
    const [projectInfo, setProjectInfo] = useState<ProjectInfoState>({
        plan_start_date: '',
        plan_end_date: '',
        end_date_rev: '',
    });

    const [monthList, setMonthList] = useState<MonthKey[]>([]);
    const [activityList, setActivityList] = useState<ActivityRow[]>([
        {
            rowId: makeRowId(),
            id: 101,
            sequence: 1,
            name: 'Activity 1',
            pic: 'Aom',
            start_date: '2024-01-01',
            end_date: '2024-01-31',
            weight: 20,
            progress: 50,
            status: 'In Progress',
            is_deleted: false,
            plan: { '2024-01': '10' },
            actual: { '2024-01': '8' },
            isNew: false,
            isDirty: false,
        },
    ]);
    const [deleteActivityList, setDeleteActivityList] = useState<number[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    function addActivity() {
        setActivityList((prev) => resequenceRows([...prev, createEmptyActivity(prev.length + 1)]));
    }

    function updateActivity<K extends keyof ActivityRow>(
        rowId: string,
        field: K,
        value: ActivityRow[K]
    ) {
        setActivityList((prev) =>
            prev.map((row) => {
                if (row.rowId !== rowId) return row;

                const updated = {
                    ...row,
                    [field]: value,
                    isDirty: true,
                };

                const progress = field === 'progress' ? Number(value) : row.progress;
                const startDate = field === 'start_date' ? String(value) : row.start_date;
                const endDate = field === 'end_date' ? String(value) : row.end_date;

                return {
                    ...updated,
                    status: calculateStatus(progress, startDate, endDate),
                };
            })
        );
    }

    function updateMonthlyValue(
        rowId: string,
        type: 'plan' | 'actual',
        key: MonthKey,
        value: string
    ) {
        setActivityList((prev) =>
            prev.map((row) =>
                row.rowId !== rowId
                    ? row
                    : {
                        ...row,
                        [type]: {
                            ...row[type],
                            [key]: value,
                        },
                        isDirty: true,
                    }
            )
        );
    }

    function deleteRow(rowId: string) {
        setActivityList((prev) => {
            const target = prev.find((row) => row.rowId === rowId);
            if (!target) return prev;

            if (target.id !== null) {
                setDeleteActivityList((ids) =>
                    ids.includes(target.id as number) ? ids : [...ids, target.id as number]
                );
            }

            return resequenceRows(prev.filter((row) => row.rowId !== rowId));
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setActivityList((prev) => {
            const oldIndex = prev.findIndex((row) => row.rowId === String(active.id));
            const newIndex = prev.findIndex((row) => row.rowId === String(over.id));
            if (oldIndex < 0 || newIndex < 0) return prev;

            return resequenceRows(
                moveArrayItem(prev, oldIndex, newIndex).map((row) => ({
                    ...row,
                    isDirty: true,
                }))
            );
        });
    }

    async function saveAll() {
        try {
            setIsSaving(true);

            const payload = buildSavePayload(projectInfo, activityList, deleteActivityList);

            console.log('SAVE PAYLOAD:', payload);

            const res = await fetch('/api/project/save-activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error('Failed to save activities');
            }

            const result = await res.json();

            if (result?.activities && Array.isArray(result.activities)) {
                setActivityList(
                    resequenceRows(
                        result.activities.map((row: Omit<ActivityRow, 'rowId'>) => ({
                            ...row,
                            rowId: makeRowId(),
                            isNew: false,
                            isDirty: false,
                        }))
                    )
                );
            } else {
                setActivityList((prev) =>
                    prev.map((row) => ({
                        ...row,
                        isNew: false,
                        isDirty: false,
                    }))
                );
            }

            setDeleteActivityList([]);
            alert('Saved successfully');
        } catch (error) {
            console.error(error);
            alert('Save failed');
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        if (projectInfo.plan_start_date && projectInfo.plan_end_date) {
            setMonthList(buildMonthRange(projectInfo.plan_start_date, projectInfo.plan_end_date));
        } else {
            setMonthList([]);
        }
    }, [projectInfo.plan_start_date, projectInfo.plan_end_date]);

    const totalWeight = useMemo(
        () => activityList.reduce((sum, row) => sum + Number(row.weight || 0), 0),
        [activityList]
    );

    const avgProgress = useMemo(() => {
        if (activityList.length === 0) return 0;
        const total = activityList.reduce((sum, row) => sum + Number(row.progress || 0), 0);
        return Math.round(total / activityList.length);
    }, [activityList]);

    return (
        <div className="min-h-[calc(100vh-16rem)] rounded bg-white p-4">
            <div className="grid grid-cols-12 gap-y-3">
                <div className="col-span-6 px-3">
                    <Label title="Plan Start Date" htmlFor="plan_start_date" require />
                    <Input
                        type="date"
                        id="plan_start_date"
                        value={projectInfo.plan_start_date}
                        max={projectInfo.plan_end_date || undefined}
                        onChange={(e) =>
                            setProjectInfo((prev) => ({
                                ...prev,
                                plan_start_date: e.target.value as YMD,
                            }))
                        }
                    />
                </div>

                <div className="col-span-6 px-3">
                    <Label title="Plan End Date" htmlFor="plan_end_date" require />
                    <Input
                        type="date"
                        id="plan_end_date"
                        value={projectInfo.plan_end_date}
                        min={projectInfo.plan_start_date || undefined}
                        readOnly={!projectInfo.plan_start_date}
                        onChange={(e) =>
                            setProjectInfo((prev) => ({
                                ...prev,
                                plan_end_date: e.target.value as YMD,
                            }))
                        }
                    />
                </div>

                <div className="col-span-6 px-3">
                    <Label title="Revised End Date" htmlFor="end_date_rev" />
                    <Input
                        type="date"
                        id="end_date_rev"
                        value={projectInfo.end_date_rev}
                        min={projectInfo.plan_start_date || undefined}
                        onChange={(e) =>
                            setProjectInfo((prev) => ({
                                ...prev,
                                end_date_rev: e.target.value as YMD,
                            }))
                        }
                    />
                </div>

                <div className="col-span-6 flex items-end justify-end gap-2 px-3">
                    <button
                        onClick={addActivity}
                        type="button"
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Add Activity
                    </button>

                    <button
                        onClick={saveAll}
                        disabled={isSaving}
                        type="button"
                        className="rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 disabled:opacity-60"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>

                <div className="col-span-12 px-3">
                    <div className="mb-3 flex flex-wrap gap-3 text-sm">
                        <div className="rounded border bg-gray-50 px-3 py-2">
                            <span className="font-semibold">Activities:</span> {activityList.length}
                        </div>
                        <div className="rounded border bg-gray-50 px-3 py-2">
                            <span className="font-semibold">Total Weight:</span> {totalWeight}%
                        </div>
                        <div className="rounded border bg-gray-50 px-3 py-2">
                            <span className="font-semibold">Average Progress:</span> {avgProgress}%
                        </div>
                        <div className="rounded border bg-gray-50 px-3 py-2">
                            <span className="font-semibold">Deleted IDs:</span>{' '}
                            {deleteActivityList.length > 0 ? deleteActivityList.join(', ') : '-'}
                        </div>
                    </div>

                    <TableWrapper overflow>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <Table>
                                <Thead>
                                    <TrHead>
                                        <Th>Sequence</Th>
                                        <Th>Activity Name</Th>
                                        <Th>PIC</Th>
                                        <Th>Start Date</Th>
                                        <Th>End Date</Th>
                                        <Th>% Weight</Th>
                                        <Th>% Progress</Th>
                                        <Th>Status</Th>
                                        <Th></Th>
                                        <Th>
                                            <div className="flex gap-2">
                                                {monthList.map((m) => (
                                                    <div key={m} className="w-[5rem] min-w-[5rem] text-center">
                                                        {monthLabel(m)}
                                                    </div>
                                                ))}
                                            </div>
                                        </Th>
                                        <Th></Th>
                                    </TrHead>
                                </Thead>

                                <Tbody>
                                    <SortableContext
                                        items={activityList.map((row) => row.rowId)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {activityList.map((act) => (
                                            <SortableActivityGroup
                                                key={act.rowId}
                                                act={act}
                                                monthList={monthList}
                                                onDelete={deleteRow}
                                                onUpdateField={updateActivity}
                                                onUpdateMonth={updateMonthlyValue}
                                            />
                                        ))}
                                    </SortableContext>
                                </Tbody>
                            </Table>
                        </DndContext>
                    </TableWrapper>
                </div>
            </div>
        </div>
    );
}