'use client'
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Customized,
} from "recharts";

// แปลงค่ามุมสำหรับครึ่งวงกลม (180° → 0°)
const valueToAngle = (v, max) => {
  const ratio = Math.max(0, Math.min(v / max, 1)); // 0..1
  return 180 - ratio * 180; // 180 = ซ้าย, 0 = ขวา
};

const COLORS = {
  plan: "#16a5a3",      // ฟ้า (Plan)
  over: "#f5a623",      // ส้ม (Over plan)
  danger: "#ff3b30",    // แดง (Max)
  needle: "#9aa0a6",    // เทา (เข็ม)
};

export default function GaugePlanActual({
  planTarget = 14.4,  // ค่าเป้าหมาย (Plan)
  actual = 10.6,      // ค่าจริง (Actual)
  max = 25,           // ค่าสูงสุดสเกล
  dangerFrom = 0.9,   // โซนอันตรายตั้งแต่ 90% ของ max
}) {
  const data = useMemo(() => {
    // โครงสร้างโซน: [Plan, OverPlan, Danger]
    const plan = Math.min(planTarget, max);
    const overPlan = Math.max(0, Math.min(max, max * dangerFrom) - plan);
    const danger = Math.max(0, max - (plan + overPlan));
    return [
      { name: "Plan", value: plan, color: COLORS.plan },
      { name: "Over Plan", value: overPlan, color: COLORS.over },
      { name: "Danger", value: danger, color: COLORS.danger },
    ];
  }, [planTarget, max, dangerFrom]);

  // เข็ม
  const Needle = ({ cx, cy, innerRadius, outerRadius }) => {
    const r = (innerRadius + outerRadius) / 2;
    const angle = valueToAngle(actual, max) * (Math.PI / 180);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const base = 8; // ความกว้างโคนเข็ม
    // จุดฐานเข็ม (เล็กน้อยต่ำจากจุดศูนย์กลาง)
    const bx1 = cx + base * Math.cos(angle + Math.PI / 2);
    const by1 = cy + base * Math.sin(angle + Math.PI / 2);
    const bx2 = cx + base * Math.cos(angle - Math.PI / 2);
    const by2 = cy + base * Math.sin(angle - Math.PI / 2);

    return (
      <>
        {/* เข็ม */}
        <path d={`M ${bx1} ${by1} L ${x} ${y} L ${bx2} ${by2} Z`} fill={COLORS.needle} />
        {/* ปุ่มกลาง */}
        <circle cx={cx} cy={cy} r={base} fill={COLORS.needle} />
        {/* ป้ายค่า Actual (ขวาบน) */}
        <text x={cx + outerRadius + 20} y={cy - 5} textAnchor="start" fill="#333" fontSize={12}>
          {actual.toFixed(3)}
        </text>
      </>
    );
  };

  return (
    <div className="w-full h-64 bg-white rounded-2xl shadow p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">
        Plan vs Actual (Gauge)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* วงเกจครึ่งวงกลม */}
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="90%"
            innerRadius="60%"
            outerRadius="90%"
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>

          {/* แสดงค่า Plan เป็น bubble ด้านบนซ้าย */}
          <Customized
            component={({ width, height }) => {
              const cx = width * 0.5;
              const cy = height * 0.9;
              const bubbleX = cx - 60;
              const bubbleY = cy - 120;
              return (
                <>
                  <rect
                    x={bubbleX - 18}
                    y={bubbleY - 18}
                    rx={6}
                    ry={6}
                    width={54}
                    height={28}
                    fill="#4da3ff"
                    opacity={0.95}
                  />
                  <text x={bubbleX + 9} y={bubbleY} fill="#fff" fontWeight="bold">
                    {planTarget}
                  </text>
                </>
              );
            }}
          />

          {/* เข็ม Actual */}
          <Customized
            component={({ width, height, chartBBox }) => {
              // ค่าตำแหน่งต้องสอดคล้องกับ Pie
              const cx = chartBBox.width / 2 + chartBBox.x;
              const cy = chartBBox.y + chartBBox.height * 0.9;
              const inner = chartBBox.height * 0.6 * 0.6; // match innerRadius
              const outer = chartBBox.height * 0.9 * 0.9; // match outerRadius
              return <Needle cx={cx} cy={cy} innerRadius={inner} outerRadius={outer} />;
            }}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(v) =>
              v === "Plan"
                ? "Plan"
                : v === "Over Plan"
                ? "Over Plan"
                : v === "Danger"
                ? "Actual (Needle)"
                : v
            }
          />
          <Tooltip formatter={(v, n) => [`${Number(v).toFixed(2)}`, n]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
