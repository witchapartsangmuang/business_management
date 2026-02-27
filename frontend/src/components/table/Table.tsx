type TableProps = React.ComponentProps<"table">
type TheadProps = React.ComponentProps<"thead">
type TbodyProps = React.ComponentProps<"tbody">
type TrProps = React.ComponentProps<"tr">
type ThProps = React.ComponentProps<"th">
type TdProps = React.ComponentProps<"td">

export function TableWrapper({ children, className, overflow }: { children: React.ReactNode, className?: string, overflow?: boolean }) {
    return (
        <div className={`${className || 'w-full'} ${(overflow && 'overflow-auto') || ""}`.trim()}>
            {children}
        </div>
    )
}
export function Table({ className, ...prop }: TableProps) {
    return (
        <table
            className={`w-full border-collapse ${className ?? ""}`}
            {...prop}
        />
    );
}
export function Thead({ className, ...prop }: TheadProps) {
    return (
        <thead className={`${className || 'bg-gray-50'}`} {...prop} />

    )
}
export function TrHead({ className, ...prop }: TrProps) {
    return (
        <tr className={`${className || ''}`} {...prop} />
    )
}
export function Th({ children, className, sticky }: { children: React.ReactNode, className?: string, sticky?: 'left' | 'right' }) {
    return (
        <th className={`${className || 'p-3 text-sm font-semibold text-gray-700 border-b bg-white border-gray-200 whitespace-nowrap'} ${sticky != undefined && sticky === 'left' && 'sticky left-0'} ${sticky != undefined && sticky === 'right' && 'sticky right-0'}`}>
            {children}
        </th>
    )
}
export function Tbody({ children, className, ...prop }: TbodyProps) {
    return (
        <tbody className={`${className || ''}`} {...prop} />
    )
}
export function TrBody({ className, ...prop }: TrProps) {
    return (
        <tr className={`${className || 'px-4 py-2 text-sm text-gray-800 border-b border-gray-100 hover:bg-gray-100'}`} {...prop} />
    )
}
export function Td({ children, className, sticky }: { children: React.ReactNode, className?: string, sticky?: 'left' | 'right' }) {
    return (
        <td className={`${className || 'p-3 text-sm border-b border-gray-200 whitespace-nowrap'} ${sticky != undefined && sticky === 'left' && 'sticky left-0'} ${sticky != undefined && sticky === 'right' && 'sticky right-0'}`}>
            {children}
        </td>
    )
}
