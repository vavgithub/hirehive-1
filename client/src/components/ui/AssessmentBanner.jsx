import React from 'react'
import { Button } from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'
import IconWrapper from '../Cards/IconWrapper'
import { TrendingUp } from 'lucide-react'
import { useAssessmentBannerBg } from '../../context/ThemeContext'

function AssessmentBanner({
  title = 'Accelerate',
  description = 'Complete the assessment to be prioritized and improve your chances of moving forward quickly',
  buttonText = 'Take Assessment',
  onButtonClick,
  className = '',
}) {
  const navigate = useNavigate()
  const bannerImg = useAssessmentBannerBg()
  const handleClick = onButtonClick ?? (() => navigate('/assessment'))

  return (
    <div
      style={{ backgroundImage: `url(${bannerImg})` }}
      className={`container flex justify-between rounded-xl gap-4 p-6 my-4 items-center bg-cover ${className}`}
    >
      <div className='flex gap-4 items-center'>
        <div className='hidden w-16 h-16 rounded-full md:rounded-full bg-primary-300 border border-primary-100 items-center md:flex justify-center'>
          <IconWrapper icon={TrendingUp} customStrokeWidth={7} />
        </div>

        <div className='flex-col'>
          <h2 className='hidden md:flex pb-2'>{title}</h2>
          <p className='md:hidden typograhpy-body'>{description}</p>
          <p className='hidden md:flex typograhpy-body'>{description}</p>
        </div>
      </div>
      <div className='md:flex hidden'>
        <Button variant='primary' onClick={handleClick}>{buttonText}</Button>
      </div>
    </div>
  )
}

export default AssessmentBanner
