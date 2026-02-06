
export function TableWrapper({ children, className, overflow }: { children: React.ReactNode, className?: string, overflow?: boolean }) {
    return (
        <div className={`${className || 'w-full'} ${overflow && 'overflow-auto'}`}>
            {children}
        </div>
    )
}
export function Table({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <table className={`${className || ''}`}>
            {children}
        </table>
    )
}
export function Thead({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <thead className={`${className || ''}`}>
            {children}
        </thead>
    )
}
export function TrHead({ children, className }: { children: React.ReactNode, className?: string }) {

    return (
        <tr className={`${className || ''}`}>
            {children}
        </tr>
    )
}
export function Th({ children, className, sticky }: { children: React.ReactNode, className?: string, sticky?: 'left' | 'right' }) {
    return (
        <th className={`${className || 'p-3 text-sm font-semibold text-gray-700 border-b bg-white border-gray-200 whitespace-nowrap'} ${sticky != undefined && sticky === 'left' && 'sticky left-0'} ${sticky != undefined && sticky === 'right' && 'sticky right-0'}`}>
            {children}
        </th>
    )
}
export function Tbody({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <tbody className={`${className || ''}`}>
            {children}
        </tbody>
    )
}
export function TrBody({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <tr className={`${className || 'px-4 py-2 text-sm text-gray-800 border-b border-gray-100 hover:bg-gray-100'}`}>
            {children}
        </tr>
    )
}
export function Td({ children, className, sticky }: { children: React.ReactNode, className?: string, sticky?: 'left' | 'right' }) {
    return (
        <td className={`${className || 'p-3 text-sm border-b border-gray-200 whitespace-nowrap'} ${sticky != undefined && sticky === 'left' && 'stick left-0'} ${sticky != undefined && sticky === 'right' && 'stick right-0'}`}>
            {children}
        </td>
    )
}
