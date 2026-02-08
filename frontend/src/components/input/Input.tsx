// type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
//   label?: string
//   error?: string
// }

// export const Input = ({error,className,...props}: InputProps) {}

type Input = {
    id?: string
    name?: string
    type: "text" | "number" | "date" | "time" | "datetime-local" | "month" | "week";
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onMouseDown: (value: React.MouseEvent<HTMLInputElement>) => void;
}
export default function Input({ id, name, type, onChange, onMouseDown }: Input) {
    return (
        <input className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm" id={id} name={name} type={type} onChange={onChange} onMouseDown={onMouseDown} />
    )
}