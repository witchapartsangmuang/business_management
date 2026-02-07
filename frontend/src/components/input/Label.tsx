export default function Label({ title, htmlFor, require = false }: { title: string, htmlFor?: string, require?: boolean }) {
    return (
        <label htmlFor={htmlFor} className="block w-full text-sm font-medium text-gray-700 mb-1">{title}{require && <span className="pl-1 text-red-500">*</span>}</label>
    )
}