'use client';

import React, { useMemo, useState } from 'react';

type YMD = `${number}-${number}-${number}`;

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;

function isValidYMD(s: string): s is YMD {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

function fromYMD(s: YMD): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function monthsBetweenInclusive(projectStart: Date, projectEnd: Date): Date[] {
  const out: Date[] = [];
  let cur = startOfMonth(projectStart);
  const last = startOfMonth(projectEnd);
  while (cur <= last) {
    out.push(new Date(cur));
    cur = addMonths(cur, 1);
  }
  return out;
}
function monthKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}`; // e.g. 2025-10
}
function monthLabel(d: Date) {
  return `${MONTHS_SHORT[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`; // Oct 25
}

type ActivityRow = {
  id: string;
  no: number;
  activity: string;
  pic: string;
  start?: YMD;
  end?: YMD;
  wt?: number;
  // values per month: key= "YYYY-M", value= string/number
  plan: Record<string, string>;
  actual: Record<string, string>;
};

export default function Page() {
  // กำหนด Project ช่วงเวลารวม (ใช้สร้างคอลัมน์หัวเดือน)
  const [projectStart, setProjectStart] = useState<YMD>('2025-10-01');
  const [projectEnd, setProjectEnd] = useState<YMD>('2026-02-28');

  // ตารางตัวอย่างเริ่มต้น 2 แถว
  const [rows, setRows] = useState<ActivityRow[]>([
    {
      id: crypto.randomUUID(),
      no: 1,
      activity: '',
      pic: '',
      start: undefined,
      end: undefined,
      wt: undefined,
      plan: {},
      actual: {},
    },
    {
      id: crypto.randomUUID(),
      no: 2,
      activity: '',
      pic: '',
      start: '2025-10-01',
      end: '2026-02-28',
      wt: undefined,
      plan: {},
      actual: {},
    },
  ]);

  const monthCols = useMemo(() => {
    if (!isValidYMD(projectStart) || !isValidYMD(projectEnd)) return [];
    const s = fromYMD(projectStart);
    const e = fromYMD(projectEnd);
    if (e < s) return [];
    return monthsBetweenInclusive(s, e);
  }, [projectStart, projectEnd]);

  function addRow() {
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        no: prev.length + 1,
        activity: '',
        pic: '',
        start: undefined,
        end: undefined,
        wt: undefined,
        plan: {},
        actual: {},
      },
    ]);
  }

  function deleteRow(id: string) {
    setRows((prev) =>
      prev
        .filter((r) => r.id !== id)
        .map((r, i) => ({ ...r, no: i + 1 }))
    );
  }

  function setRow<K extends keyof ActivityRow>(id: string, key: K, value: ActivityRow[K]) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  function setCell(
    id: string,
    type: 'plan' | 'actual',
    mKey: string,
    value: string
  ) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [type]: { ...r[type], [mKey]: value } } : r
      )
    );
  }

  function monthEnabledForRow(r: ActivityRow, d: Date) {
    // เปิดใช้งานเฉพาะเมื่อ start/end ของแถวมาครบ และเดือน d อยู่ในช่วง (รวมขอบ)
    if (!r.start || !r.end || !isValidYMD(r.start) || !isValidYMD(r.end)) return false;
    const rs = startOfMonth(fromYMD(r.start));
    const re = startOfMonth(fromYMD(r.end));
    const md = startOfMonth(d);
    return md >= rs && md <= re;
  }

  return (
    <main className="p-6 max-w-[1200px] mx-auto">
      {/* Project date ช่วงรวม (กำหนดหัวคอลัมน์เดือน) */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Project Start Date</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={projectStart}
            onChange={(e) => setProjectStart(e.target.value as YMD)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Project End Date</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={projectEnd}
            onChange={(e) => setProjectEnd(e.target.value as YMD)}
          />
        </div>
        <button
          onClick={addRow}
          className="ml-auto rounded-lg bg-blue-600 text-white px-4 py-2 shadow hover:opacity-90"
        >
          + Add Activity
        </button>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-700">
              <th className="px-3 py-2 text-left w-10">No.</th>
              <th className="px-3 py-2 text-left w-64">Activity</th>
              <th className="px-3 py-2 text-left w-40">PIC</th>
              <th className="px-3 py-2 text-left w-40">Start Date</th>
              <th className="px-3 py-2 text-left w-40">End Date</th>
              <th className="px-3 py-2 text-left w-24">%Wt</th>

              {/* หัวคอลัมน์เดือน */}
              {monthCols.map((d) => (
                <th key={monthKey(d)} className="px-2 py-2 text-center">
                  {monthLabel(d)}
                </th>
              ))}
              <th className="px-2 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <React.Fragment key={r.id}>
                {/* แถว P */}
                <tr className="bg-gray-50/40">
                  <td className="px-3 py-2 align-top" rowSpan={2}>{r.no}.</td>

                  <td className="px-3 py-2 align-top" rowSpan={2}>
                    <textarea
                      className="w-full min-h-[38px] border rounded-lg px-2 py-1"
                      value={r.activity}
                      onChange={(e) => setRow(r.id, 'activity', e.target.value)}
                    />
                  </td>

                  <td className="px-3 py-2 align-top" rowSpan={2}>
                    <input
                      className="w-full border rounded-lg px-2 py-1"
                      value={r.pic}
                      onChange={(e) => setRow(r.id, 'pic', e.target.value)}
                    />
                  </td>

                  <td className="px-3 py-2 align-top" rowSpan={2}>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-2 py-1"
                      value={r.start ?? ''}
                      onChange={(e) => setRow(r.id, 'start', e.target.value as YMD)}
                    />
                  </td>

                  <td className="px-3 py-2 align-top" rowSpan={2}>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-2 py-1"
                      value={r.end ?? ''}
                      onChange={(e) => setRow(r.id, 'end', e.target.value as YMD)}
                    />
                  </td>

                  <td className="px-3 py-2 align-top" rowSpan={2}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-20 border rounded-lg px-2 py-1"
                      value={r.wt ?? ''}
                      onChange={(e) => setRow(r.id, 'wt', Number(e.target.value))}
                    />
                  </td>

                  {/* เซลล์รายเดือน (Plan) */}
                  {monthCols.map((d) => {
                    const key = monthKey(d);
                    const enabled = monthEnabledForRow(r, d);
                    return (
                      <td key={`P-${r.id}-${key}`} className="px-2 py-1 text-center">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-600 w-4">P</span>
                          <input
                            type="number"
                            className={`w-full border rounded-md px-2 py-1 ${enabled ? 'bg-white' : 'bg-gray-100 text-gray-400'}`}
                            disabled={!enabled}
                            value={r.plan[key] ?? ''}
                            onChange={(e) => setCell(r.id, 'plan', key, e.target.value)}
                          />
                        </div>
                      </td>
                    );
                  })}

                  <td className="px-2 py-1 align-top" rowSpan={2}>
                    <button
                      onClick={() => deleteRow(r.id)}
                      className="rounded-md bg-red-600 text-white px-3 py-2 hover:opacity-90"
                      title="Delete row"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>

                {/* แถว A */}
                <tr>
                  {monthCols.map((d) => {
                    const key = monthKey(d);
                    const enabled = monthEnabledForRow(r, d);
                    const disabledStyle = enabled ? 'bg-white' : 'bg-gray-100 text-gray-400';
                    return (
                      <td key={`A-${r.id}-${key}`} className="px-2 py-1 text-center">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-600 w-4">A</span>
                          <input
                            type="number"
                            className={`w-full border rounded-md px-2 py-1 ${disabledStyle}`}
                            disabled={!enabled}
                            value={r.actual[key] ?? ''}
                            onChange={(e) => setCell(r.id, 'actual', key, e.target.value)}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
