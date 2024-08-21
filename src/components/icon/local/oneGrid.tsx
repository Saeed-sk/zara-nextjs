const OneGrid = ({className}: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="inherit"
        stroke="inherit"
        className={className}
    >
        <path
            fillRule="evenodd"
            d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"
            clipRule="evenodd"
        />
    </svg>
)

export default OneGrid;
