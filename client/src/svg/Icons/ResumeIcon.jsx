import React from 'react'

const ResumeIcon = ({sizeClasses}) => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`group ${sizeClasses ? sizeClasses : 'w-11 h-11'}`}>
            <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" className="fill-[#202122] group-hover:fill-accent-300 transition-colors duration-100" />
            <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="#202122" />
            <g clipPath="url(#clip0_1391_37668)">
                <path d="M12 30H26C26.5304 30 27.0391 29.7893 27.4142 29.4142C27.7893 29.0391 28 28.5304 28 28V15L23 10H14C13.4696 10 12.9609 10.2107 12.5858 10.5858C12.2107 10.9609 12 11.4696 12 12V14M22 10V14C22 14.5304 22.2107 15.0391 22.5858 15.4142C22.9609 15.7893 23.4696 16 24 16H28" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 27C17 25.9391 16.5786 24.9217 15.8284 24.1716C15.0783 23.4214 14.0609 23 13 23M13 23C11.9391 23 10.9217 23.4214 10.1716 24.1716C9.42143 24.9217 9 25.9391 9 27M13 23C14.6569 23 16 21.6569 16 20C16 18.3431 14.6569 17 13 17C11.3431 17 10 18.3431 10 20C10 21.6569 11.3431 23 13 23Z" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1391_37668">
                    <rect width="24" height="24" fill="#202122" transform="translate(8 8)" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default ResumeIcon