export default function StaticCard({ label, value, unit }: { label: string, value: number, unit: string }) {
    return (
        <>
            <p className="text-lg">{label}</p>
            <p><span className="text-3xl me-1">{value}</span><span className="text-xl">{unit}</span></p>
        </>
    )
}