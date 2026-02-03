
export function TableWrapper({ children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`table-wrapper ${className || ''}`}>
            {children}
        </div>
    )
}
export function Table({ children, }: { children: React.ReactNode }) {
    return (
        <table className="tbl tbl-zebra tbl-sortable">
            {children}
        </table>
    )
}

export function TableHeader({ children, }: { children: React.ReactNode }) {
    return (
        <thead className="bg-gray-100">
            {children}
        </thead>
    )
}
export function TableBody({ children, }: { children: React.ReactNode }) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}
export function TableFooter({ children, }: { children: React.ReactNode }) {
    return (
        <tfoot className="bg-gray-100">
            {children}
        </tfoot>
    )
}
