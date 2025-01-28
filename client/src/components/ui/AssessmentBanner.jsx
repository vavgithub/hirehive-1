import React from 'react'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

const AssessmentBanner = () => {
    const navigate = useNavigate();
    const handleAssessment = () => {
        navigate("/assessment");
    }
    return (
        <div className='container flex justify-between rounded-xl gap-4 bg-assessment p-6  my-4 items-center bg-cover '>
            <div className='flex gap-4 items-center'>

                <div className='hidden w-16 h-16 rounded-full md:rounded-full bg-primary-300 border  border-primary-100 items-center md:flex justify-center '>

                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons" clipPath="url(#clip0_1744_417898)">
                            <path id="Icon" d="M23.5 6L14 15.5L9 10.5L1.5 18M23.5 6H17.5M23.5 6V12" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1744_417898">
                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>


                <div className='flex-col'>

                    <h2 className='hidden md:flex typography-h2 '>
                        Accelerate
                    </h2>
                    <p className='md:hidden typograhpy-body font-outfit'>Please Logged into Desktop Version to submit your assessment for high priority selection</p>
                    <p className='hidden md:flex typograhpy-body font-outfit'>Complete the assessment to be prioritized and improve your chances of moving forward quickly</p>
                </div>

            </div>
            <div className=' md:flex hidden'>
                <Button variant="primary" onClick={handleAssessment} >Take Assessment</Button>
            </div>
        </div>
    )
}

export default AssessmentBanner