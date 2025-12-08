export default function IconList({ className, size }: { className?: string, size?: number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" strokeWidth="2"
            stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <line x1="5" y1="6" x2="5" y2="6.01" />
            <line x1="5" y1="12" x2="5" y2="12.01" />
            <line x1="5" y1="18" x2="5" y2="18.01" />
        </svg>
    )
}