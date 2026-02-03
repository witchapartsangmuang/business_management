export default function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={onClose} />

                <div className="relative z-10 w-[92%] max-w-md rounded-xl bg-white p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}