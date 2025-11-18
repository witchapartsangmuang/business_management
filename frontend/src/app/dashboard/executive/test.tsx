'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type GaugeProps = {
  value: number;           // 0–100
  color?: string;
  trackColor?: string;
  thickness?: number;
  width?: number;
  height?: number;         // สูงน้อยกว่ากว้าง เพื่อเป็นครึ่งวงกลม
};

export default function Gauge({
  value,
  color = '#1677ff',
  trackColor = '#e9edf3',
  thickness = 28,
  width = 300,
  height = 180,
}: GaugeProps) {
  const pct = Math.max(0, Math.min(100, value));
  const data = [{ v: pct }, { v: 100 - pct }];

  return (
    <div style={{ position: 'relative', width, height }}>
      {/* 🔵 ตัวเลขทับตรงกลาง (ไม่บล็อกการคลิก) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, 140%)', // ขยับขึ้นให้อยู่กลางครึ่งวง
          fontSize: 18,
          fontWeight: 800,
          color,
          pointerEvents: 'none',
        }}
      >
        {pct.toFixed(2)}%
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* track */}
          <Pie
            data={[{ v: 100 }]}
            dataKey="v"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={70 + thickness}
            stroke="none"
            isAnimationActive={false}
            focusable={false}
          >
            <Cell fill={trackColor} />
          </Pie>

          {/* value */}
          <Pie
            data={data}
            dataKey="v"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={70 + thickness}
            stroke="none"
            cornerRadius={0}
            isAnimationActive
            focusable={false}
          >
            <Cell fill={color} />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
