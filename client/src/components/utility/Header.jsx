import React from 'react'
import { useNavigate } from 'react-router-dom'
import ThreeDots from '../ui/ThreeDots'
import IconWrapper from '../Cards/IconWrapper'
import { ArrowLeft } from 'lucide-react'

export const BackButton = () => {
    return (
            <IconWrapper size={0} customIconSize={6} customStrokeWidth={6} inheritColor icon={ArrowLeft}/>
    )
}

const Header = ({ 
    HeaderText, 
    withKebab = false, 
    withBack, 
    job, 
    handleAction, 
    page,
    children,
    rightContent,
    onBack,
    orgId // New prop for organization ID
}) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (onBack) {
            // Use custom back handler if provided
            onBack();
        } else {
            // Default back behavior
            navigate(-1);
        }
    };

    return (
        <div className={"w-full mb-4"}>
            <div className="flex items-start justify-between gap-4">
                {/* Left section with back button and title */}
                <div className={'flex items-start gap-4 min-w-0 flex-1 ' + (rightContent && 'lg:w-[65%]')}>
                    {withBack === "true" && (
                        <div className="cursor-pointer text-font-main shrink-0 mt-1" onClick={handleBackClick}>
                            {/* <BackButton /> */}
                            <IconWrapper inheritColor icon={ArrowLeft}/>
                        </div>
                    )}
                    <h1
                      className="min-w-0 flex-1 whitespace-normal break-words pb-0 md:overflow-hidden md:whitespace-nowrap md:text-ellipsis"
                    >
                        {HeaderText}
                    </h1>
                </div>

                {/* Right section with kebab menu and/or custom content */}
                <div className="flex items-center gap-4 shrink-0">
                    {rightContent}
                    {withKebab && (
                        <ThreeDots 
                            job={job} 
                            handleAction={handleAction} 
                            page={page}
                            orgId={orgId} // Pass the organization ID to ThreeDots
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