import { useEffect, useState } from "react"

export default function SearchSelect({ optionList, onChange }: { optionList: { value: string | number, label: string }[], onChange: (value: string) => void }) {
    const [query, setQuery] = useState("")
    const [openDropdownList, setOpenDropdownList] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState(optionList)
    const [selected, setSelected] = useState<{ value: string | number, label: string } | null>(null)
    const handleBlur = () => {
        if (!selected) setQuery("")
        const timeoutId = setTimeout(() => {
            setOpenDropdownList(false)
        }, 100)
        console.log("blur")
        return () => clearTimeout(timeoutId)
    }

    const clickSelect = (value: string | number, label: string) => {
        setSelected({ value, label })
        setQuery(label)
        setOpenDropdownList(false)
        onChange(value as string)
    }

    useEffect(() => {
        const filtered = optionList.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredOptions(filtered)
    }, [query, optionList])
    return (
        <div className="relative">
            <input
                type="text"
                value={selected ? selected.value : query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setSelected(null)
                    setOpenDropdownList(true)
                }}
                onFocus={() => setOpenDropdownList(true)}
                onBlur={handleBlur}
                placeholder="Select approver..."
                className="form-input"
            />
            {openDropdownList &&
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border bg-white shadow">
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
            }
        </div>
    )
}