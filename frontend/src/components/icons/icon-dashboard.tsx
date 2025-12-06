export default function IconDashboard({ className,size }: { className?: string,size?:number }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" strokeWidth="2"
            stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="13" r="2" />
            <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
            <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
        </svg>
    )
}