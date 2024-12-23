import React from 'react'
import { useNavigate } from 'react-router-dom'
import ThreeDots from '../ThreeDots'

export const BackButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 12L2 12M2 12L12 22M2 12L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const Header = ({ 
    HeaderText, 
    withKebab, 
    withBack, 
    job, 
    handleAction, 
    page,
    children,
    rightContent // New prop for content that should appear on the right side
}) => {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                {/* Left section with back button and title */}
                <div className="flex items-center gap-4 w-full lg:w-[65%]">
                    {withBack === "true" && (
                        <div className="cursor-pointer" onClick={() => navigate(-1)}>
                            <BackButton />
                        </div>
                    )}
                    <h1 className="typography-h2 md:typography-h1 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                        {HeaderText}
                    </h1>
                </div>

                {/* Right section with kebab menu and/or custom content */}
                <div className="flex items-center gap-4">
                    {rightContent}
                    {withKebab === "true" && (
                        <ThreeDots 
                            job={job} 
                            handleAction={handleAction} 
                            page={page}
                        />
                    )}
                </div>
            </div>

            {/* Additional content below the header */}
            {children && (
                <div className="w-full">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Header