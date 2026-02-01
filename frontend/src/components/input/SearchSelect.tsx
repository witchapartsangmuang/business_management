import { useEffect, useState } from "react"

export default function SearchSelect({ optionList, placeholder, defaultValue, onChange }: { optionList: { value: string, label: string }[], placeholder: string, defaultValue: string | null, onChange: (value: string | null) => void }) {
    const [query, setQuery] = useState("")
    const [openDropdownList, setOpenDropdownList] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState(optionList)
    const [selected, setSelected] = useState<{ value: string, label: string } | null>(null)
    const handleBlur = () => {
        if (!selected) {
            setQuery("")
            onChange(null)
        }
        const timeoutId = setTimeout(() => {
            setOpenDropdownList(false)
        }, 200)
        return () => clearTimeout(timeoutId)
    }

    const clickSelect = (value: string, label: string) => {
        setSelected({ value, label })
        setQuery(label)
        onChange(value)
        const timeoutId = setTimeout(() => {
            setOpenDropdownList(false)
        }, 200)
        return () => clearTimeout(timeoutId)
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
        if (defaultValue !== undefined && defaultValue !== null) {

            const defaultOption = optionList.find(o => o.value === defaultValue)
            if (defaultOption) {
                setSelected(defaultOption)
                setQuery(defaultOption.label)
            }
        }
    }, [optionList])
    // useEffect(() => {
    //     console.log(`optionList ${placeholder} : `,optionList);
    // }, [optionList])
    return (
        <div className="relative">
            <input
                type="text"
                value={selected ? selected.label : query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setSelected(null)
                    setOpenDropdownList(true)
                }}
                onFocus={() => setOpenDropdownList(true)}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="form-input"
            />
            {openDropdownList && filteredOptions.length &&
                <div className="absolute z-1000 p-1  my-1 w-full rounded-lg border border-gray-200 bg-white shadow">
                    <ul className="max-h-48 overflow-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={`${index}-${option.label}-${option.value}`}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                onClick={() => clickSelect(option.value, option.label)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}