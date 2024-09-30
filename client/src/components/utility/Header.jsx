import React from 'react'
import { useNavigate } from 'react-router-dom'
import ThreeDots from '../ThreeDots'

const BackButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 12L2 12M2 12L12 22M2 12L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const Header = ({ HeaderText, withKebab, withBack, job, handleAction, page }) => {
    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                {withBack === "true" && (
                    <div className='cursor-pointer' onClick={() => navigate(-1)}>
                        <BackButton />
                    </div>
                )}
                <h1 className='typography-h1'>
                    {HeaderText}
                </h1>
            </div>
            {withKebab === "true" && (
                <div className="absolute right-3">
                    <ThreeDots 
                        job={job} 
                        handleAction={handleAction} 
                        page={page}
                    />
                </div>
            )}
        </div>
    )
}

export default Header