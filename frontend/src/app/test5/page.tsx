"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { id: string; name: string };

const options: Option[] = [
    { id: "1", name: "Somchai Rattanakorn" },
    { id: "2", name: "Somsri Chaiyawan" },
    { id: "3", name: "Anan Wongpaisarn" },
    { id: "4", name: "Nattapong Wisutthikul" },
];

export default function SearchableSelect() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<Option | null>(null);
    const [open, setOpen] = useState(false);

    const filtered = useMemo(() => {
        return options.filter((o) =>
            o.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    // ปิดเมื่อคลิกนอก component
    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            const el = wrapperRef.current;
            if (!el) return;
            if (!el.contains(e.target as Node)) {
                setOpen(false);

                // ✅ ถ้าไม่มี selected ให้เคลียร์ค่า
                if (!selected) setQuery("");
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [selected]);

    // ถ้า blur แล้วพิมพ์ไม่ตรง option ใด → ล้างค่า
    const handleBlur = () => {
        if (!selected) setQuery("");
    };

    return (
        <div ref={wrapperRef} className="relative w-72">
            <input
                type="text"
                value={selected ? selected.name : query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(null);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={handleBlur}
                placeholder="Select approver..."
                className="form-input"
            />

            {open && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border bg-white shadow">
                    {filtered.length === 0 && (
                        <li className="px-3 py-2 text-sm text-gray-400">
                            No result
                        </li>
                    )}

                    {filtered.map((opt) => (
                        <li
                            key={opt.id}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setSelected(opt);
                                setQuery("");
                                setOpen(false);
                            }}
                            className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50"
                        >
                            {opt.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
