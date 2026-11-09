import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import StyledCard from '../Cards/StyledCard'
import { Button } from '../Buttons/Button'
import IconWrapper from '../Cards/IconWrapper'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthProvider'
import { getRoute, ROUTE_KEY } from '../../config/permissions.config'

// ── Conversion Modal ─────────────────────────────────────────────────────────
function TrialConversionModal({ daysLeft, onClose }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  return createPortal(
    <div className='fixed z-50 inset-0 flex justify-center items-center bg-background-overlay bg-black/20'>
      <StyledCard
        padding={3}
        backgroundColor='bg-background-90'
        extraStyles='relative w-full max-w-md mx-4'
      >
        <div
          onClick={onClose}
          className='absolute top-4 right-4 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
        >
          <IconWrapper icon={X} size={0} />
        </div>

        <div className='text-center px-4 py-4'>
          <h2 className='text-font-main mb-3'>
            {daysLeft === 0
              ? 'Your free trial has ended'
              : daysLeft === 1
                ? 'Your free trial ends in 1 day'
                : `Your free trial ends in ${daysLeft} days`}
          </h2>
          <p className='typography-body text-font-gray mb-6'>
            You would lose access to all the premium features. Upgrade now to continue enjoying the Geode Experience!
          </p>
          <Button
            variant='primary'
            type='button'
            className='!w-full !px-0'
            onClick={() => { onClose(); navigate(getRoute(user.role, ROUTE_KEY.PRICING)) }}
          >
            Upgrade Now
          </Button>
        </div>
      </StyledCard>
    </div>,
    document.body
  )
}

// ── Trial Banner (inline in dashboard) ───────────────────────────────────────
function TrialBanner({ daysLeft }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  return (
    <>
      <div className='w-full rounded-xl px-4 py-3 flex flex-col items-center gap-2'>
        <p className='typography-body text-font-main font-semibold text-center'>
          {daysLeft === 0
            ? 'Your trial has ended'
            : daysLeft === 1
              ? 'Your trial ends in 1 day!'
              : `Your trial ends in ${daysLeft} days!`}
        </p>
        <Button
          variant='primary'
          type='button'
          className='!w-full !px-0'
          onClick={() => navigate(getRoute(user.role, ROUTE_KEY.PRICING))}
        >
          Upgrade Now
        </Button>
      </div>

    </>
  )
}

export default TrialBanner
export { TrialConversionModal }
