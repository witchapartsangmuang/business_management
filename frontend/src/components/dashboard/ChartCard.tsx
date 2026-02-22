export default function ChartCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="border border-[#D2D2D2] rounded p-3 bg-white shadow-lg">
            {children}
        </div>
    )
}