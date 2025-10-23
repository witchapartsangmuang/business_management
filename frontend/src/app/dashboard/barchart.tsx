import { ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, CartesianGrid, Legend, Bar, Rectangle } from "recharts";
export default function Barchart() {
    const orgProjectCount = [
        { name: "Sale", inspiration: 20, idea: 14, project: 30 },
        { name: "Production", inspiration: 14, idea: 14, project: 35 },
        { name: "Purchase", inspiration: 5, idea: 7, project: 25 },
    ];
    return (
        <ResponsiveContainer width="100%" height="100%" className="bg-[#ffffff] rounded-lg">
            <BarChart
                data={orgProjectCount}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inspiration" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="idea" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                <Bar dataKey="project" fill="#62ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}