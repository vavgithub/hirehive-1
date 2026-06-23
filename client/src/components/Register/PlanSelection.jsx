import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { steps } from '../../pages/Admin/Register'
import { useOnboardingContext } from '../../context/OnboardingProvider'
import { savePlanSelection } from '../../services/auth.service'
import { showErrorToast } from '../ui/Toast'
import LoaderModal from '../Loaders/LoaderModal'
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
  const { onboardData, setOnboardData } = useOnboardingContext()

  const savePlanMutation = useMutation({
    mutationFn: savePlanSelection,
    onSuccess: (data) => {
      if (data?.userData) {
        setOnboardData(data.userData)
      }
      steps.forEach((step, index, stepsArr) => {
        if (step.id === currentStep) {
          setCurrentStep(stepsArr[index + 1]?.id)
        }
      })
    },
    onError: (error) => {
      showErrorToast('Error', error?.response?.data?.message ||
        'Failed to save plan. Please try again.')
    }
  })

  const advance = (plan) => {
    if (!onboardData?.email) {
      showErrorToast('Error', 'Unexpected error. Please try again.')
      return
    }
    savePlanMutation.mutate({
      plan,
      email: onboardData.email
    })
  }

  return (
    <>
      {savePlanMutation.isPending && <LoaderModal />}

      <div className='text-center mb-6 px-8 pt-6'>
        <h2>Try the Premium Geode Experience for 21 days!</h2>
        <p className='typography-large-p text-font-gray font-light mt-2'>
          Full access to all Geode features, free of cost. No credit card required.
        </p>
      </div>

      <div className='px-8 pb-8 flex flex-col md:flex-row gap-6 items-stretch'>
        <div className='flex-1'>
          <label className='font-bricolage font-semibold typography-body'>
            Full access to all Geode features:
          </label>
          <ul className='mt-4 flex flex-col gap-3'>
            {FEATURES.map(f => (
              <li key={f} className='flex items-start gap-3 typography-body text-font-gray'>
                <IconWrapper icon={Check} inheritColor customIconSize={0} customStrokeWidth={11} size={0} className='flex-shrink-0 mt-[2px]' />
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
          <Button variant='primary' type='button' onClick={() => advance('trial')} className='!w-full !px-0 mt-4'>
            Start my free trial
          </Button>
          <Button variant='tertiary' type='button' onClick={() => advance('free')} className='whitespace-nowrap'>
            Not now, use free version
          </Button>
        </StyledCard>
      </div>
    </>
  )
}

export default PlanSelection
