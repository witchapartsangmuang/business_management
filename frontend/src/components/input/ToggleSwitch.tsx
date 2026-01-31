export default function ToggleSwitch({ checked, onChange, checked_label, unchecked_label }: { checked: boolean; onChange: () => void; checked_label?: string; unchecked_label?: string }) {
    return (
        <>
            <label className="inline-flex cursor-pointer items-center select-none">
                <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
                <div className={`relative h-7 w-12 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"} `} >
                    <span className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                {
                    checked_label && unchecked_label ? (
                        <span className="ml-2 text-sm font-medium text-gray-700">
                            {checked ? checked_label : unchecked_label}
                        </span>
                    ) : null
                }
            </label>
        </>
    );
}