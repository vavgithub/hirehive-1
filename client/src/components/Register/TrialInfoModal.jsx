import React from 'react'
import { createPortal } from 'react-dom'
import StyledCard from '../Cards/StyledCard'
import { Button } from '../Buttons/Button'
import { Check, X } from 'lucide-react'
import IconWrapper from '../Cards/IconWrapper'

const FEATURES = [
  'Add as many users as you want for free',
  'Job Posting & management',
  'Access unlimited candidate applications',
  'Screen candidates based on your preferred budget',
  'Assess with custom Questionnaire',
  'Rate and Feedback candidates after each evaluation round',
  'Create your own Talent Pool',
]

function TrialInfoModal({ onClose }) {
  return createPortal(
    <div className='fixed z-[9999] inset-0 flex justify-center items-center bg-background-overlay'>
      <StyledCard
        padding={3}
        backgroundColor='bg-background-90'
        extraStyles='relative w-full max-w-2xl mx-4'
      >
        {/* Close button */}
        <div
          onClick={onClose}
          className='absolute top-4 right-4 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
        >
          <IconWrapper icon={X} size={0} />
        </div>

        {/* Header */}
        <div className='text-center mb-6 px-8 pt-4'>
          <h2>Try the Premium Geode Experience for 21 days!</h2>
          <p className='typography-large-p text-font-gray font-light mt-2'>
            Full access to all Geode features, free of cost. No credit card required.
          </p>
        </div>

        {/* Body */}
        <div className='flex flex-col md:flex-row gap-6 items-stretch'>
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
            extraStyles='w-full md:w-64 flex-shrink-0 flex flex-col items-center justify-center gap-4 h-auto'
          >
            <span className='font-bricolage font-bold text-5xl text-font-main'>$0</span>
            <div className='text-center -mt-2'>
              <p className='typography-body font-medium'>Free of cost!</p>
              <p className='typography-small-p text-font-gray mt-1'>No Credit card details required!</p>
            </div>
            <Button variant='primary' type='button' onClick={onClose} className='!w-full !px-0 mt-4'>
              Start my free trial
            </Button>
            <p onClick={onClose} className='typography-body text-font-gray hover:text-font-main cursor-pointer transition-colors'>
              Not now, use free version
            </p>
          </StyledCard>
        </div>
      </StyledCard>
    </div>,
    document.body
  )
}

export default TrialInfoModal