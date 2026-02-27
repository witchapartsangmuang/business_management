

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue"> & {
    rowKey?: string;
    optionList: { value: string, label: string }[];
    defaultSelectedValue?: string;
    error?: boolean;
    // onChange: (value: string | null) => void
}

export default function Select({ rowKey, id, optionList, defaultSelectedValue, error, onChange, onFocus, ...props }: SelectProps) {

    const hasEmptyOption = optionList.some(opt => opt.value === "");
    const shouldShowPlaceholder = !defaultSelectedValue && !hasEmptyOption;

    return (
        <select
            id={id}
            defaultValue={defaultSelectedValue ?? ""}
            onChange={onChange}
            onFocus={onFocus}
            className={`
                block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm
                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 
                focus:ring-blue-500 sm:text-sm appearance-none disabled disabled disabled:bg-[#f3f3f3]
                disabled:opacity-75 disabled:cursor-not-allowed ${error
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
            {...props}
        >
            {shouldShowPlaceholder && <option value="">--</option>}
            {optionList.map((option, index) => (
                <option key={`${rowKey}-${index}-${option.label}-${option.value}`} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}