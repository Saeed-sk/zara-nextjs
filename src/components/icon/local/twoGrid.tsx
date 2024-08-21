
const TwoGrid = ({className}:{className?: string}) => (
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
            d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"
            clipRule="evenodd"
        />
    </svg>
)

export default TwoGrid;
