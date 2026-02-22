"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
export default function Piechart({ pieList }: { pieList: { name: string, value: number, color: string }[] }) {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (object: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } = object
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${payload.name} ${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };
    const style = {
        bottom: '0%',
        right: '0%',
        transform: 'translate(0, -50%)',
        lineHeight: '24px'
    };
    return (
        <ResponsiveContainer width="100%" height="100%" className="bg-[#ffffff] rounded-lg">
            <PieChart>
                <Pie
                    data={pieList}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {pieList.map((entry, index) => (
                        <Cell key={`cell-${index}${entry.name}`} fill={entry.color} />
                    ))}
                </Pie>
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
            </PieChart>
        </ResponsiveContainer>
    )
}