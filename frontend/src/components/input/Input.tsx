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
            className={`form-input appearance-none ${error
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
        />
    )
}
