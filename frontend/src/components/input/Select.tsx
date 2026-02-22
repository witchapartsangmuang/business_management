

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "defaultValue"> & {
    optionList: { value: string, label: string }[];
    defaultSelectedValue: string | null;
    error?: boolean;
    onChange: (value: string | null) => void
}

export default function SearchSelect({ id, optionList, defaultSelectedValue, error, onChange, onFocus, ...props }: SelectProps) {
    return (
        <select>
            {
                optionList.map(()=>(
                    <option></option>
                ))
            }
        </select>
    )
}