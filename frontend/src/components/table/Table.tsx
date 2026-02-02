export function Table({ children, }: { children: React.ReactNode }) {
    return (
        <div className="table-wrapper">
            <table className="tbl tbl-zebra tbl-sortable">
                {children}
            </table>
        </div>
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
