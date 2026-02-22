import { InputHTMLAttributes } from "react"
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean
}
export default function Input({ id, error, className, placeholder, value, onChange, onFocus, ...props }: InputProps) {
    return (
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            className={`
                block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm
                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 
                focus:ring-blue-500 sm:text-sm appearance-none disabled disabled disabled:bg-[#f3f3f3]
                disabled:opacity-75 disabled:cursor-not-allowed ${error
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
        />
    )
}
