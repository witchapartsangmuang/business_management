type TableWrapperProps = React.ComponentProps<"div">
type TableProps = React.ComponentProps<"table">
type TheadProps = React.ComponentProps<"thead">
type TbodyProps = React.ComponentProps<"tbody">
type TrProps = React.ComponentProps<"tr">
type ThProps = React.ComponentProps<"th">
type TdProps = React.ComponentProps<"td">
type TfootProps = React.ComponentProps<"tfoot">

export function TableWrapper({ className = "w-full", overflow, ...prop }: TableWrapperProps & { overflow?: boolean }) {
    return (
        <div className={`${className} ${(overflow && 'overflow-auto') || ""}`.trim()} {...prop}>
            {prop.children}
        </div>
    )
}
export function Table({ className = "w-full border-collapse", ...prop }: TableProps) {
    return (
        <table className={className} {...prop}>
            {prop.children}
        </table>
    );
}
export function Thead({ className = "bg-gray-50", ...prop }: TheadProps) {
    return (
        <thead className={className} {...prop}>
            {prop.children}
        </thead>

    )
}
export function TrHead({ className = "p-1 text-sm font-semibold text-gray-700 border-b bg-white border-gray-200 whitespace-nowrap", ...prop }: TrProps) {
    return (
        <tr className={className} {...prop}>
            {prop.children}
        </tr>
    )
}
export function Th({ className = "p-1 text-sm font-semibold text-gray-700 border-b bg-white border-gray-200 whitespace-nowrap", ...prop }: ThProps) {
    return (
        <th className={className} {...prop}>
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
export function TrBody({ className = "py-2 text-sm text-gray-800 border-b bg-white border-gray-100 hover:bg-gray-100", ...prop }: TrProps) {
    return (
        <tr className={className} {...prop}>
            {prop.children}
        </tr>
    )
}
export function Td({ className = "p-1 text-sm border-b bg-white border-gray-200 whitespace-nowrap", ...prop }: TdProps) {
    return (
        <td className={className} {...prop}>
            {prop.children}
        </td>
    )
}

export function Tfoot({ className, ...prop }: TfootProps) {
    return (
        <tbody className={className} {...prop} >
            {prop.children}
        </tbody>
    )
}
export function TrFoot({ className = "py-2 text-sm text-gray-800 border-b border-gray-100 hover:bg-gray-100", ...prop }: TrProps) {
    return (
        <tr className={className} {...prop}>
            {prop.children}
        </tr>
    )
}