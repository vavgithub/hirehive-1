import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import StyledCard from '../Cards/StyledCard'
import { Button } from '../Buttons/Button'
import { InputField } from '../Inputs/InputField'
import GlobalDropDown from '../Dropdowns/GlobalDropDown'
import IconWrapper from '../Cards/IconWrapper'
import { X } from 'lucide-react'
import { showSuccessToast, showErrorToast } from '../ui/Toast'

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_CONTACT_FORM_SCRIPT_URL

const TEAM_SIZE_OPTIONS = [
  { label: '1-10',      value: '1-10' },
  { label: '11-50',     value: '11-50' },
  { label: '51-200',    value: '51-200' },
  { label: '201-1000',  value: '201-1000' },
  { label: '1000+',     value: '1000+' },
]

function EnterpriseContactModal({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teamSize, setTeamSize] = useState('')
  const [teamSizeError, setTeamSizeError] = useState('')
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data) => {
    if (!teamSize) {
      setTeamSizeError('Please select a team size')
      return
    }
    setTeamSizeError('')
    setIsSubmitting(true)
    try {
      const url = `${GOOGLE_SCRIPT_URL}?firstName=${encodeURIComponent(data.firstName)}&lastName=${encodeURIComponent(data.lastName)}&email=${encodeURIComponent(data.email)}&company=${encodeURIComponent(data.company)}&teamSize=${encodeURIComponent(teamSize)}&message=${encodeURIComponent(message || '')}&timestamp=${encodeURIComponent(new Date().toISOString())}`
      await fetch(url, { method: 'GET', mode: 'no-cors' })
      showSuccessToast('Success', 'Your message has been sent! We\'ll get back to you within 24 hours.')
      reset()
      setTeamSize('')
      setMessage('')
      onClose()
    } catch (error) {
      showErrorToast('Error', 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return createPortal(
    <div className='fixed z-50 inset-0 flex justify-center items-center bg-background-overlay bg-black/20'>
      <StyledCard
        padding={3}
        backgroundColor='bg-background-90'
        extraStyles='relative w-full max-w-lg mx-4'
      >
        {/* Close */}
        <div
          onClick={onClose}
          className='absolute top-4 right-4 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
        >
          <IconWrapper icon={X} size={0} />
        </div>

        {/* Header */}
        <div className='mb-6'>
          <h3 className='mb-1'>Contact our Enterprise Team</h3>
          <p className='typography-body text-font-gray'>
            Let's discuss how Geode can scale with your hiring needs. Fill out the form and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

          {/* First + Last name row */}
          <div className='grid grid-cols-2 gap-4'>
            <InputField
              type='text'
              label='First name'
              labelStyles='font-bricolage font-medium'
              extraClass='mt-1'
              placeholder='Jane'
              error={errors.firstName?.message}
              errorMessage={errors.firstName?.message}
              {...register('firstName', { required: 'Please enter your first name' })}
            />
            <InputField
              type='text'
              label='Last name'
              labelStyles='font-bricolage font-medium'
              extraClass='mt-1'
              placeholder='Doe'
              error={errors.lastName?.message}
              errorMessage={errors.lastName?.message}
              {...register('lastName', { required: 'Please enter your last name' })}
            />
          </div>

          {/* Work email */}
          <InputField
            type='email'
            label='Work email'
            labelStyles='font-bricolage font-medium'
            extraClass='mt-1'
            placeholder='jane@company.com'
            error={errors.email?.message}
            errorMessage={errors.email?.message}
            {...register('email', {
              required: 'Please enter your work email',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
            })}
          />

          {/* Company name */}
          <InputField
            type='text'
            label='Company name'
            labelStyles='font-bricolage font-medium'
            extraClass='mt-1'
            placeholder='Acme Inc.'
            error={errors.company?.message}
            errorMessage={errors.company?.message}
            {...register('company', { required: 'Please enter your company name' })}
          />

          {/* Team size */}
          <GlobalDropDown
            label='Team size'
            required
            extraStylesForLabel='font-bricolage font-medium'
            value={teamSize}
            error={teamSizeError}
            errorMessage={teamSizeError}
            onChange={setTeamSize}
            options={TEAM_SIZE_OPTIONS}
            customPlaceholder='Select team size'
          />

          {/* Message */}
          <div className='flex flex-col gap-1'>
            <label className='font-bricolage font-medium typography-body'>
              Message <span className='text-font-gray'>(optional)</span>
            </label>
            <textarea
              placeholder='Tell us about your hiring needs...'
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full bg-background-80 border border-divider-100 rounded-xl px-4 py-3 typography-body text-font-main placeholder:text-font-gray focus:outline-none focus:border-teal-100 resize-none'
            />
          </div>

          {/* Submit */}
          <Button
            variant='primary'
            type='submit'
            className='w-full !px-0 mt-2'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </Button>

        </form>
      </StyledCard>
    </div>,
    document.body
  )
}

export default EnterpriseContactModal
