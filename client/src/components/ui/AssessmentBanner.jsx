import React from 'react'
import { Button } from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'
import IconWrapper from '../Cards/IconWrapper';
import { TrendingUp } from 'lucide-react';

const AssessmentBanner = () => {
    const navigate = useNavigate();
    const handleAssessment = () => {
        navigate("/assessment");
    }
    return (
        <div className='container flex justify-between rounded-xl gap-4 bg-assessment p-6  my-4 items-center bg-cover '>
            <div className='flex gap-4 items-center'>

                <div className='hidden w-16 h-16 rounded-full md:rounded-full bg-primary-300 border  border-primary-100 items-center md:flex justify-center '>
                    <IconWrapper icon={TrendingUp} customStrokeWidth={7} />
                </div>


                <div className='flex-col'>

                    <h2 className='hidden md:flex typography-h2 '>
                        Accelerate
                    </h2>
                    <p className='md:hidden typograhpy-body '>Please Logged into Desktop Version to submit your assessment for high priority selection</p>
                    <p className='hidden md:flex typograhpy-body '>Complete the assessment to be prioritized and improve your chances of moving forward quickly</p>
                </div>

            </div>
            <div className=' md:flex hidden'>
                <Button variant="primary" onClick={handleAssessment} >Take Assessment</Button>
            </div>
        </div>
    )
}

export default AssessmentBanner