import React from 'react'

const AssignmentIcon = ({sizeClasses}) => {
    return (
        <div className={`group ${sizeClasses ? sizeClasses : 'w-11 h-11'}`}>
            <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill="#202122" />
                <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="#202122" />
                <path
                    d="M24 12H26C26.5304 12 27.0391 12.2107 27.4142 12.5858C27.7893 12.9609 28 13.4696 28 14V28C28 28.5304 27.7893 29.0391 27.4142 29.4142C27.0391 29.7893 26.5304 30 26 30H14C13.4696 30 12.9609 29.7893 12.5858 29.4142C12.2107 29.0391 12 28.5304 12 28V14C12 13.4696 12.2107 12.9609 12.5858 12.5858C12.9609 12.2107 13.4696 12 14 12H16M17 22L19 24L23 20M17 10H23C23.5523 10 24 10.4477 24 11V13C24 13.5523 23.5523 14 23 14H17C16.4477 14 16 13.5523 16 13V11C16 10.4477 16.4477 10 17 10Z"
                    stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )

}

export default AssignmentIcon


export const AssignmentIconStroke = ({sizeClasses}) => {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5595_30546)">
                <path
                    d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M9 14L11 16L15 12M9 2H15C15.5523 2 16 2.44772 16 3V5C16 5.55229 15.5523 6 15 6H9C8.44772 6 8 5.55229 8 5V3C8 2.44772 8.44772 2 9 2Z"
                    stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_5595_30546">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )

}
