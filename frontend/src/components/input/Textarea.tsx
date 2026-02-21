import { TextareaHTMLAttributes } from "react"

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean
}
export default function TextArea({ id, rows = 2, error, className, placeholder, value, onChange, onFocus, ...props }: TextAreaProps) {
    return (
        <textarea
            id={id}
            rows={rows}
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
