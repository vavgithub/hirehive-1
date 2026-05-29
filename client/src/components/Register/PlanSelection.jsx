import React from 'react'
import { Check } from 'lucide-react'
import { steps } from '../../pages/Admin/Register'
import { useOnboardingContext } from '../../context/OnboardingProvider'
import StyledCard from '../Cards/StyledCard'
import IconWrapper from '../Cards/IconWrapper'
import { Button } from '../Buttons/Button'

const FEATURES = [
  'Add as many users as you want for free',
  'Job Posting & management',
  'Access unlimited candidate applications',
  'Screen candidates based on your preferred budget',
  'Assess with custom Questionnaire',
  'Rate and Feedback candidates after each evaluation round',
  'Create your own Talent Pool',
]

function PlanSelection({ currentStep, setCurrentStep }) {
  const { setOnboardData } = useOnboardingContext()

  const advance = (plan) => {
    setOnboardData(prev => ({
      ...prev,
      plan,
      seatLimit: plan === 'free' ? 2 : null,
    }))
    steps.forEach((step, index, stepsArr) => {
      if (step.id === currentStep) {
        setCurrentStep(stepsArr[index + 1]?.id)
      }
    })
  }

  return (
    <>
      <div className='w-full px-8 pt-6 pb-8 flex flex-col justify-center items-center text-center'>
        <h1 className='typography-h2 text-center leading-tight'>
          Try the Premium Geode Experience<br className='hidden sm:block' /> for 21 days!
        </h1>
      </div>

      <div className='px-8 pb-8 flex flex-col md:flex-row gap-6 items-stretch'>

        <div className='flex-1'>
          <label className='font-bricolage font-semibold typography-body'>
            Full access to all Geode features:
          </label>
          <ul className='mt-4 flex flex-col gap-3'>
            {FEATURES.map(f => (
              <li key={f} className='flex items-start gap-3 typography-body text-font-gray'>
                <IconWrapper icon={Check} inheritColor customIconSize={0} customStrokeWidth={11} size={0} className="flex-shrink-0 mt-[2px] text-teal-300" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <StyledCard
          padding={4}
          backgroundColor='bg-background-80'
          extraStyles='w-full md:w-72 flex-shrink-0 flex flex-col items-center justify-center gap-4 h-auto'
        >
          <span className='font-bricolage font-bold text-5xl text-font-main'>$0</span>
          <div className='text-center -mt-2'>
            <p className='typography-body font-medium'>Free of cost!</p>
            <p className='typography-small-p text-font-gray mt-1'>No Credit card details required!</p>
          </div>

          <Button
            variant='primary'
            type='button'
            onClick={() => advance('trial')}
            className='!w-full !px-0 mt-4'
          >
            Start my free trial
          </Button>

          <p
            onClick={() => advance('free')}
            className='typography-body text-font-gray hover:text-white cursor-pointer transition-colors'
          >
            Not now, use free version
          </p>
        </StyledCard>

      </div>
    </>
  )
}

export default PlanSelection
