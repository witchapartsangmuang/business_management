import { useState, InputHTMLAttributes } from "react";
import IconEyeOpen from "../icons/icon-eye-open";
import IconEyeClose from "../icons/icon-eye-close";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean
}
export default function InputPassword({ id, error, className, placeholder, value, onChange, onFocus, ...props }: InputProps) {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="relative">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    className={`form-input appearance-none ${error
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                    {show ? <IconEyeOpen size={18} /> : <IconEyeClose size={18} />}
                </button>
            </div>
        </>
    );
}
