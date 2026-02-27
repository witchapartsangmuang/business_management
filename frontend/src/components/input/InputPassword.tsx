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
                    {...props}
                    className={`
                        block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm
                        placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 
                        focus:ring-blue-500 sm:text-sm appearance-none disabled disabled disabled:bg-[#f3f3f3]
                        disabled:opacity-75 disabled:cursor-not-allowed ${error
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
