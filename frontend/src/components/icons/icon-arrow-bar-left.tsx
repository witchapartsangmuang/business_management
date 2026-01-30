export default function IconArrowBarLeft({ className, size }: { className?: string, size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" strokeWidth="2"
            stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="12" x2="8" y2="16" />
            <line x1="4" y1="12" x2="8" y2="8" />
            <line x1="20" y1="4" x2="20" y2="20" />
        </svg>
    )
}