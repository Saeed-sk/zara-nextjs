import React from 'react';

const ThreeGrid = ({className}: { className?: string }) => (
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
            d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"
            clipRule="evenodd"
        />
    </svg>
)

export default ThreeGrid;
