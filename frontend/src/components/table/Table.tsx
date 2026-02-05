
export function TableWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`${className || ''}`}>
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
export function Tr({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <table className={`${className || ''}`}>
            {children}
        </table>
    )
}
export function Thead({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <table className={`${className || ''}`}>
            {children}
        </table>
    )
}
export function Th({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <table className={`${className || 'px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap'}`}>
            {children}
        </table>
    )
}
export function Tbody({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <table className={`${className || ''}`}>
            {children}
        </table>
    )
}
export function Td({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <table className={`${className || 'px-4 py-2 text-sm text-gray-800 border-b border-gray-100'}`}>
            {children}
        </table>
    )
}