import { useEffect, useState } from "react"

export default function SearchSelect({ optionList, placeholder, onChange }: { optionList: { value: string | number, label: string }[], placeholder: string, onChange: (value: string) => void }) {
    const [query, setQuery] = useState("")
    const [openDropdownList, setOpenDropdownList] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState(optionList)
    const [selected, setSelected] = useState<{ value: string | number, label: string } | null>(null)
    const handleBlur = () => {
        if (!selected) setQuery("")
        const timeoutId = setTimeout(() => {
            setOpenDropdownList(false)
        }, 200)
        console.log("blur")
        return () => clearTimeout(timeoutId)
    }

    const clickSelect = (value: string | number, label: string) => {
        setSelected({ value, label })
        setQuery(label)
        onChange(value as string)
        handleBlur()
    }

    useEffect(() => {
        if (optionList.length !== 0) {
            const filtered = optionList.filter((o) =>
                o.label.toLowerCase().includes(query.toLowerCase())
            )
            setFilteredOptions(filtered)
        }
    }, [query, optionList])
    useEffect(() => {
        console.log("query : ", query);
        console.log("selected : ", selected);

    }, [query, selected])
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
                <div className="absolute z-10 p-1  my-1 w-full rounded-lg border border-gray-200 bg-white shadow">
                    <ul className="max-h-48 overflow-auto">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
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