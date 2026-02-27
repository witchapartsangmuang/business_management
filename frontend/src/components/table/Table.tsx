type TableWrapperProps = React.ComponentProps<"div">
type TableProps = React.ComponentProps<"table">
type TheadProps = React.ComponentProps<"thead">
type TbodyProps = React.ComponentProps<"tbody">
type TrProps = React.ComponentProps<"tr">
type ThProps = React.ComponentProps<"th">
type TdProps = React.ComponentProps<"td">

export function TableWrapper({ className, overflow, ...prop }: TableWrapperProps & { overflow?: boolean }) {
    return (
        <div className={`${className || 'w-full'} ${(overflow && 'overflow-auto') || ""}`.trim()}>
            {prop.children}
        </div>
    )
}
export function Table({ className, ...prop }: TableProps) {
    return (
        <table className={`w-full border-collapse ${className ?? ""}`} {...prop}>
            {prop.children}
        </table>
    );
}
export function Thead({ className, ...prop }: TheadProps) {
    return (
        <thead className={`${className || 'bg-gray-50'}`} {...prop}>
            {prop.children}
        </thead>

    )
}
export function TrHead({ className, ...prop }: TrProps) {
    return (
        <tr className={`${className || ''}`} {...prop}>
            {prop.children}
        </tr>
    )
}
export function Th({ className, sticky, ...prop }: { className?: string, sticky?: 'left' | 'right' } & ThProps) {
    return (
        <th className={`${className || 'p-3 text-sm font-semibold text-gray-700 border-b bg-white border-gray-200 whitespace-nowrap'} ${sticky != undefined && sticky === 'left' && 'sticky left-0'} ${sticky != undefined && sticky === 'right' && 'sticky right-0'}`} {...prop}>
            {prop.children}
        </th>
    )
}
export function Tbody({ className, ...prop }: TbodyProps) {
    return (
        <tbody className={`${className || ''}`} {...prop} >
            {prop.children}
        </tbody>
    )
}
export function TrBody({ className, ...prop }: TrProps) {
    return (
        <tr className={`${className || 'px-4 py-2 text-sm text-gray-800 border-b border-gray-100 hover:bg-gray-100'}`} {...prop}>
            {prop.children}
        </tr>
    )
}
export function Td({ className, sticky, ...prop }: { className?: string, sticky?: 'left' | 'right' } & TdProps) {
    return (
        <td className={`${className || 'p-3 text-sm border-b border-gray-200 whitespace-nowrap'} ${sticky != undefined && sticky === 'left' && 'sticky left-0'} ${sticky != undefined && sticky === 'right' && 'sticky right-0'}`} {...prop}>
            {prop.children}
        </td>
    )
}
