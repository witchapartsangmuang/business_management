import { useEffect, useState } from "react"

type Option = { value: string; label: string };
export type SearchSelectProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> & {
    optionList: Option[];
    defaultSelectedValue: string | null;
    error?: boolean;
    onChange: (value: string | null) => void
}

export default function SearchSelect({ id, placeholder, optionList, defaultSelectedValue, error, onChange, onFocus, ...props }: SearchSelectProps) {
    const [query, setQuery] = useState("")
    const [openDropdownList, setOpenDropdownList] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
    const [selected, setSelected] = useState<Option | null>(null)
    const handleBlur = () => {
        if (!selected) {
            setQuery("")
            onChange(null)
        }
        setOpenDropdownList(false)
    }

    const clickSelect = (value: string, label: string) => {
        setSelected({ value, label })
        setQuery(label)
        onChange(value)
        setOpenDropdownList(false)
    }

    useEffect(() => {
        if (optionList.length !== 0) {
            const filtered = optionList.filter((o) =>
                o.label.toLowerCase().includes(query.toLowerCase())
            )
            setFilteredOptions(filtered)
        }
    }, [query])
    useEffect(() => {
        if (defaultSelectedValue !== undefined && defaultSelectedValue !== null) {
            const defaultOption = optionList.find(o => o.value === defaultSelectedValue)
            if (defaultOption) {
                setSelected(defaultOption)
                setQuery(defaultOption.label)
            }
        }
        setFilteredOptions(optionList)
    }, [optionList])

    return (
        <div className="relative">
            <input
                type="text"
                id={id}
                value={selected ? selected.label : query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setSelected(null)
                    setOpenDropdownList(true)
                }}
                onMouseDown={() => {
                    setOpenDropdownList(true)
                }}
                onFocus={onFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`form-input ${error
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
            />
            {openDropdownList && filteredOptions.length > 0 && (
                <div className="absolute z-1000 p-1 my-1 w-full rounded-lg border border-gray-200 bg-white shadow">
                    <ul className="max-h-48 overflow-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={`${index}-${option.label}-${option.value}`}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer whitespace-normal wrap-break-word"
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    clickSelect(option.value, option.label)
                                }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

// export default function SearchSelect({ optionList, placeholder, defaultSelectedValue, onChange }: { optionList: Option[], placeholder: string, defaultSelectedValue: string | null, onChange: (value: string | null) => void }) {
//     const [query, setQuery] = useState("")
//     const [openDropdownList, setOpenDropdownList] = useState(false)
//     const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
//     const [selected, setSelected] = useState<Option | null>(null)
//     const handleBlur = () => {
//         if (!selected) {
//             setQuery("")
//             onChange(null)
//         }
//         setOpenDropdownList(false)
//     }

//     const clickSelect = (value: string, label: string) => {
//         setSelected({ value, label })
//         setQuery(label)
//         onChange(value)
//         setOpenDropdownList(false)
//     }

//     useEffect(() => {
//         if (optionList.length !== 0) {
//             const filtered = optionList.filter((o) =>
//                 o.label.toLowerCase().includes(query.toLowerCase())
//             )
//             setFilteredOptions(filtered)
//         }
//     }, [query])
//     useEffect(() => {
//         if (defaultSelectedValue !== undefined && defaultSelectedValue !== null) {
//             const defaultOption = optionList.find(o => o.value === defaultSelectedValue)
//             if (defaultOption) {
//                 setSelected(defaultOption)
//                 setQuery(defaultOption.label)
//             }
//         }
//         setFilteredOptions(optionList)
//     }, [optionList])

//     return (
//         <div className="relative">
//             <input
//                 type="text"
//                 value={selected ? selected.label : query}
//                 onChange={(e) => {
//                     setQuery(e.target.value)
//                     setSelected(null)
//                     setOpenDropdownList(true)
//                 }}
//                 onFocus={() => {
//                     setOpenDropdownList(true)
//                 }}
//                 onBlur={handleBlur}
//                 placeholder={placeholder}
//                 className="form-input"
//             />
//             {openDropdownList && filteredOptions.length > 0 && (
//                 <div className="absolute z-[1000] p-1 my-1 w-full rounded-lg border border-gray-200 bg-white shadow">
//                     <ul className="max-h-48 overflow-auto">
//                         {filteredOptions.map((option, index) => (
//                             <li
//                                 key={`${index}-${option.label}-${option.value}`}
//                                 className="px-4 py-2 hover:bg-blue-100 cursor-pointer whitespace-normal break-words"
//                                 onMouseDown={(e) => {
//                                     e.preventDefault()
//                                     clickSelect(option.value, option.label)
//                                 }}
//                             >
//                                 {option.label}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     )
// }

