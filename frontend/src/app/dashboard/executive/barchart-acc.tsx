'use client'
import React, { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ✅ ตัวอย่างข้อมูล (ใส่ค่าเฉพาะช่วง Oct–Dec เหมือนภาพ ที่เหลือเป็น 0)
const raw = [
  { month: "Jan-2025", plan: 0,   actual: 0 },
  { month: "Feb-2025", plan: 0,   actual: 0 },
  { month: "Mar-2025", plan: 0,   actual: 0 },
  { month: "Apr-2025", plan: 0,   actual: 0 },
  { month: "May-2025", plan: 0,   actual: 0 },
  { month: "Jun-2025", plan: 0,   actual: 0 },
  { month: "Jul-2025", plan: 0,   actual: 0 },
  { month: "Aug-2025", plan: 0,   actual: 0 },
  { month: "Sep-2025", plan: 0,   actual: 0 },
  { month: "Oct-2025", plan: 0.45, actual: 0.00 },
  { month: "Nov-2025", plan: 0.75, actual: 0.55 },
  { month: "Dec-2025", plan: 1.00, actual: 0.60 },
];

// ฟังก์ชันคำนวณค่า Accumulate
function addCumulative(data, planKey = "plan", actualKey = "actual") {
  let accPlan = 0;
  let accActual = 0;
  return data.map((d) => {
    accPlan += Number(d[planKey] || 0);
    accActual += Number(d[actualKey] || 0);
    return {
      ...d,
      accPlan,
      accActual,
    };
  });
}

export default function CostSavingComboChart() {
  const data = useMemo(() => addCumulative(raw), []);

  return (
    <div className="w-full h-[420px] bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Cost Saving (Plan vs Actual) & Accumulated
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            angle={-30}
            textAnchor="end"
            interval={0}
            height={50}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: "MB", angle: -90, position: "insideLeft", offset: 10 }}
            domain={[0, "auto"]}
            allowDecimals
          />
          <Tooltip
            formatter={(value, name) => [`${Number(value).toFixed(2)} MB`, name]}
          />
          <Legend />

          {/* Bars: Plan & Actual */}
          <Bar dataKey="plan"   name="Cost Saving Plan"   fill="#1f77b4" radius={[4,4,0,0]} />
          <Bar dataKey="actual" name="Cost Saving Actual" fill="#ff7f0e" radius={[4,4,0,0]} />

          {/* Lines: Accumulated Plan & Actual */}
          <Line
            type="monotone"
            dataKey="accPlan"
            name="Cost Saving Accumulated (Plan)"
            stroke="#2ca02c"
            dot={{ r: 3 }}
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="accActual"
            name="Cost Saving Accumulated (Actual)"
            stroke="#d62728"
            dot={{ r: 3 }}
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
