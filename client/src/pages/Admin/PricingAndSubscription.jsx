import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthProvider'
import { createCheckoutSession, cancelSubscription, getSubscription, startTrial, switchBillingInterval } from '../../services/billing.service'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import { Button } from '../../components/Buttons/Button'
import { BadgeCheck, Check, Info, Lock, X, Clock, CalendarDays, Circle } from 'lucide-react'
import IconWrapper from '../../components/Cards/IconWrapper'
import ToggleSwitch from '../../components/ui/ToggleSwitch'
import Modal from '../../components/Modals/Modal'
import TrialInfoModal from '../../components/Register/TrialInfoModal'
import EnterpriseContactModal from '../../components/Register/EnterpriseContactModal'
import AssessmentBanner from '../../components/ui/AssessmentBanner'
import StatsGrid from '../../components/ui/StatsGrid'
import FeatureComparisonTable from '../../components/ui/FeatureComparisonTable'
import useTrialStatus from '../../hooks/useTrialStatus'

const TRIAL_STAT_VALUE_CLASS = 'font-gilroy text-h3 font-h3'

const FREE_FEATURES = [
  { label: 'Up to 150 applications/month', included: true },
  { label: '2 team seats included',        included: true },
  { label: 'Google Calendar Invites',      included: true },
  { label: 'Rate candidates',              included: true },
  { label: 'Standard support',             included: true },
  { label: 'Geode Score evaluations',      included: true },
  { label: 'Auto assign portfolios',       included: false },
  { label: 'Budget screening',             included: false },
  { label: 'Talent pool / Future Gems',    included: false },
]

const PRO_FEATURES = [
  { label: 'Unlimited candidate applications', included: true },
  { label: 'Per-user pricing',                included: true },
  { label: 'Auto-assign portfolios',          included: true },
  { label: 'Geode Score evaluations',         included: true },
  { label: 'Budget screening',               included: true },
  { label: 'Talent pool / Future Gems',       included: true },
  { label: '5 Pre-built assessments',         included: true },
  { label: 'Feedback + ratings',             included: true },
  { label: 'Reports & exports',              included: true },
  { label: 'Standard support',              included: true },
]

const ENTERPRISE_FEATURES = [
  { label: 'Unlimited team seats',    included: true },
  { label: 'Custom assessments',      included: true },
  { label: 'Advanced analytics',      included: true },
  { label: 'Custom integrations',     included: true },
  { label: 'Dedicated support',       included: true },
]

const TRIAL_LOSS_FEATURES = [
  'Unlimited candidate applications',
  'Per-user pricing',
  'Geode Score evaluations',
  'Budget screening',
  'Talent pool / Future Gems',
  '5 Pre-built assessments',
  'Feedback + ratings',
  'Reports & exports',
]

const COMPARISON = [
  {
    category: 'Core Features',
    rows: [
      { feature: 'Candidate applications',  free: 'Up to 150 / month', pro: 'Unlimited',       enterprise: 'Unlimited' },
      { feature: 'User seats',              free: '2 seats only',    pro: 'Per user pricing', enterprise: 'Unlimited' },
      { feature: 'Google Calendar Invites', free: true,  pro: true,  enterprise: true },
      { feature: 'Auto assign portfolios',  free: false,  pro: true,  enterprise: true },
    ]
  },
  {
    category: 'Evaluation & Scoring',
    rows: [
      { feature: 'Geode Score',        free: false, pro: true,  enterprise: true },
      { feature: 'Budget screening',   free: false, pro: true,  enterprise: true },
      { feature: 'Reports / Export',   free: false, pro: true,  enterprise: true },
      { feature: 'Feedback & ratings', free: 'Rate only', pro: 'Feedback + Rate', enterprise: 'Feedback + Rate' },
    ]
  },
  {
    category: 'Talent Intelligence',
    rows: [
      { feature: 'Talent pool / Future Gems', free: false, pro: true,          enterprise: true },
      { feature: 'Assessment tests',          free: '5 Pre-built', pro: 'Custom', enterprise: 'Custom' },
    ]
  },
  {
    category: 'Support',
    rows: [
      { feature: 'Support level', free: 'Standard', pro: 'Standard', enterprise: 'Dedicated' },
    ]
  },
]

const FeatureItem = ({ label, included, className = '' }) => (
  <li className={`flex items-start gap-3 typography-body text-font-gray ${!included && 'opacity-40'} ${className}`}>
    <IconWrapper
      icon={included ? Check : Lock}
      inheritColor
      customIconSize={0}
      customStrokeWidth={included ? 11 : 4}
      size={0}
      className='flex-shrink-0 mt-[2px]'
    />
    <span>{label}</span>
  </li>
)

function PricingAndSubscription() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const trialStatus = useTrialStatus()

  const { data: subscriptionData, refetch: refetchSubscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    staleTime: 0,
  })

  const currentPlan = searchParams.get('plan') ||
    subscriptionData?.data?.plan ||
    user?.companyDetails?.subscription?.plan ||
    'free'

  const currentBillingInterval = subscriptionData?.data?.billingInterval || 'monthly'

  const [billing, setBilling] = useState('monthly')
  const [showEndTrialModal, setShowEndTrialModal] = useState(false)
  const [showCancelProModal, setShowCancelProModal] = useState(false)
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)

  const checkoutMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      refetchSubscription()
      if (data?.url) {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      showErrorToast('Error', error?.response?.data?.message ||
        'Failed to start checkout. Please try again.')
    }
  })

  const switchIntervalMutation = useMutation({
    mutationFn: switchBillingInterval,
    onSuccess: async (data) => {
      await Promise.all([
        refetchSubscription(),
        queryClient.invalidateQueries({ queryKey: ['invoices'] }),
      ])
      if (data?.billingInterval) {
        setBilling(data.billingInterval)
      }
      showSuccessToast('Success', data?.message || 'Billing interval updated.')
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to switch billing interval.')
    },
  })

  const cancelMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: async (data) => {
      await Promise.all([
        refetchSubscription(),
        queryClient.refetchQueries({ queryKey: ['auth'] }),
      ])
      if (searchParams.has('plan')) {
        const next = new URLSearchParams(searchParams)
        next.delete('plan')
        setSearchParams(next, { replace: true })
      }
      showSuccessToast('Success', data?.message ||
        'Subscription cancelled.')
      setShowEndTrialModal(false)
      setShowCancelProModal(false)
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to cancel.')
    }
  })

  const startTrialMutation = useMutation({
    mutationFn: startTrial,
    onSuccess: () => {
      refetchSubscription()
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      showSuccessToast('Success', 'Your 21-day trial has started!')
      setShowTrialModal(false)
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to start trial.')
    }
  })

  useEffect(() => {
    if (currentPlan === 'pro' && currentBillingInterval) {
      setBilling(currentBillingInterval)
    }
  }, [currentPlan, currentBillingInterval])

  const handleUpgradeToPro = () => {
    if (currentPlan === 'pro') {
      if (billing === 'yearly' && currentBillingInterval === 'monthly') {
        switchIntervalMutation.mutate({ interval: 'yearly' })
        return
      }
      navigate('/admin/manage-plan')
      return
    }

    checkoutMutation.mutate({
      interval: billing,
      seatCount: 1
    })
  }

  const handleCancelSubscription = () => {
    setShowCancelProModal(true)
  }

  const handleConfirmCancelPro = () => {
    cancelMutation.mutate({ immediate: true })
  }

  const trialStats = useMemo(() => [
    {
      title: 'Days remaining',
      value: trialStatus.daysRemainingLabel,
      valueClassName: TRIAL_STAT_VALUE_CLASS,
      icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Clock} />,
    },
    {
      title: 'Trial progress',
      value: trialStatus.progressLabel,
      valueClassName: TRIAL_STAT_VALUE_CLASS,
      icon: () => <IconWrapper size={10} isTeritiaryIcon icon={CalendarDays} />,
    },
    {
      title: 'Status',
      value: trialStatus.statusLabel,
      valueClassName: TRIAL_STAT_VALUE_CLASS,
      icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Circle} />,
    },
  ], [trialStatus])

  const proPrice = billing === 'yearly' ? 15 : 19

  const getFreeCTA = () => {
    if (currentPlan === 'trial') return 'Upgrade Now'
    return 'Get Started'
  }

  const getProCTA = () => {
    if (currentPlan === 'free') return 'Upgrade to Pro'
    if (currentPlan === 'pro') {
      if (billing === 'yearly' && currentBillingInterval === 'monthly') {
        return 'Switch to yearly billing'
      }
      return 'Add license'
    }
    return 'Get Started'
  }

  const getEnterpriseCTA = () => {
    if (currentPlan === 'enterprise') return 'Add License'
    if (currentPlan === 'free' || currentPlan === 'trial' || currentPlan === 'pro') return 'Contact Us'
    return 'Get Started'
  }

  const getFreeVariant = () => {
    if (currentPlan === 'trial') return 'primary'
    return 'secondary'
  }

  const getProVariant = () => {
    if (currentPlan === 'trial') return 'secondary'
    if (currentPlan === 'free' || currentPlan === 'pro') return 'primary'
    return 'secondary'
  }

  const getEnterpriseVariant = () => (currentPlan === 'enterprise' ? 'primary' : 'secondary')

  const highlightedComparisonColumn =
    currentPlan === 'enterprise' ? 'enterprise' : 'pro'

  const isFreeCTADisabled = currentPlan === 'free'
  const isProCTAPending = checkoutMutation.isPending || switchIntervalMutation.isPending
  const isProCTADisabled = false
  const isEnterpriseCTADisabled = false

  const handleFreeCTA = () => {
    if (currentPlan === 'trial') setShowEndTrialModal(true)
  }

  const handleEndTrial = () => {
    cancelMutation.mutate()
  }

  return (
    <Container>
      <Header HeaderText="Pricing & Subscription" />

      <div className='text-center mb-8'>
        <h2>Built around evaluation, not just applications</h2>
        <p className='typography-large-p text-font-gray font-light mt-1 max-w-xl mx-auto'>
          Most hiring tools help you manage candidates. Geode helps you understand them. Discover the right plan for your hiring process.
        </p>
      </div>

      <div className='flex flex-col gap-6 mb-10'>
        <div className='flex items-center justify-center gap-3'>
          <span className={`typography-body ${billing === 'monthly' ? 'text-font-main' : 'text-font-gray'}`}>Monthly</span>
          <ToggleSwitch
            checkValue={billing === 'yearly'}
            setCheckValue={(val) => setBilling(val ? 'yearly' : 'monthly')}
          />
          <span className={`typography-body ${billing === 'yearly' ? 'text-font-main' : 'text-font-gray'}`}>Yearly</span>
          {billing === 'yearly' && currentPlan !== 'pro' && (
            <span className='typography-small-p text-teal-100 bg-teal-10 border border-teal-100 px-2 py-0.5 rounded-full'>
              Save 20%
            </span>
          )}
        </div>

        {currentPlan === 'pro' && (
          <p className='text-center typography-small-p text-font-gray -mt-2'>
            Your plan is billed{' '}
            <span className='text-font-main font-medium'>
              {currentBillingInterval === 'yearly' ? 'yearly ($180/user/year)' : 'monthly ($19/user/month)'}
            </span>
            . Toggle above to preview or switch billing.
          </p>
        )}

        {currentPlan === 'free' && (
          <AssessmentBanner
            title='First time here?'
            description='New users get a guided trial experience during onboarding.'
            buttonText='Experience Trial'
            onButtonClick={() => setShowTrialModal(true)}
            className='!my-0'
          />
        )}

        {currentPlan === 'trial' && (
          trialStatus.isActive ? (
            <StyledCard padding={2} extraStyles='w-full !my-0'>
              <div className='flex flex-col mb-6'>
                <h3>{trialStatus.bannerTitle}</h3>
                <p className='typography-small-p text-font-gray mt-1'>
                  You&apos;re experiencing Geode Pro features. Upgrade before your trial ends to keep access.
                </p>
              </div>
              <StatsGrid stats={trialStats} />
            </StyledCard>
          ) : (
            <StyledCard padding={2} extraStyles='w-full !my-0'>
              <div className='flex flex-col'>
                <h3>{trialStatus.bannerTitle}</h3>
                <p className='typography-small-p text-font-gray mt-1'>
                  Your trial has ended. Choose a plan below to continue using Geode.
                </p>
              </div>
            </StyledCard>
          )
        )}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch'>

        {/* FREE */}
        <div className='flex h-full flex-col'>
          <StyledCard
            padding={3}
            backgroundColor='bg-background-90'
            borderRadius='rounded-[18px]'
            extraStyles='relative flex flex-col overflow-hidden cursor-pointer hover-outline'
          >
            <div className='flex items-center justify-between gap-2 mb-1'>
              <p className='typography-small-p text-font-gray'>Free</p>
              {currentPlan === 'free' && (
                <span className='w-fit shrink-0 -mt-3 font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
                  Current Plan
                </span>
              )}
            </div>
            <h3 className='mb-3'>
              Getting used to Geode
              <br />
              (2 seats only)
            </h3>
            <p className='font-bricolage font-bold text-4xl text-font-main mt-3 mb-3'>$0</p>
            <Button
              variant={getFreeVariant()}
              type='button'
              className='w-full !px-0 mb-6'
              disabled={isFreeCTADisabled}
              onClick={handleFreeCTA}
            >
              {getFreeCTA()}
            </Button>
            <p className='typography-small-p text-font-gray font-semibold mb-2'>What's included</p>
            <ul className='flex flex-col gap-1.5'>
              {FREE_FEATURES.map(f => <FeatureItem key={f.label} label={f.label} included={f.included} />)}
            </ul>
          </StyledCard>
        </div>

        {/* PRO */}
        <div id='pricing-pro-card' className='flex h-full flex-col'>
          {currentPlan !== 'pro' && (
            <div className='bg-accent-300 rounded-t-xl shrink-0'>
              <div className='flex h-12 items-center justify-center gap-2'>
                <IconWrapper icon={BadgeCheck} inheritColor size={0} customIconSize={1} className='text-teal-100' />
                <span className='typography-small-p font-medium text-teal-100'>Recommended</span>
              </div>
              <div className='h-3' aria-hidden='true' />
            </div>
          )}

          <StyledCard
            padding={currentPlan === 'pro' ? 3 : 2}
            backgroundColor='bg-background-90'
            borderRadius='rounded-[18px]'
            extraStyles={
              currentPlan === 'pro'
                ? 'relative flex flex-col overflow-hidden cursor-pointer hover-outline'
                : 'relative z-10 flex flex-1 flex-col min-h-0 cursor-pointer -mt-4 hover-outline pb-2 md:pb-4'
            }
          >
            <div className='flex items-center justify-between gap-2 mb-1'>
              <p className='typography-small-p text-font-gray'>Pro</p>
              {currentPlan === 'pro' && (
                <span className='w-fit shrink-0 -mt-3 font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
                  Current Plan
                </span>
              )}
            </div>
            <h3 className='mb-3'>
              Small teams & agencies
              <br />
              (50–1000 employees)
            </h3>
            <div className='mb-3 mt-3 flex items-end gap-1'>
              <span className='font-bricolage font-bold text-4xl text-font-main'>${proPrice}</span>
              <span className='typography-small-p text-font-gray mb-1'>/user/month</span>
            </div>
            {billing === 'yearly' && (
              <p className='typography-small-p text-font-gray -mt-2 mb-3'>
                ${proPrice * 12}/user/year, billed annually
              </p>
            )}
            <div className={`flex flex-col w-full ${currentPlan === 'pro' ? 'gap-2 mb-6' : 'mb-6'}`}>
              <Button
                variant={getProVariant()}
                type='button'
                className='w-full !px-0'
                disabled={isProCTADisabled || isProCTAPending}
                onClick={handleUpgradeToPro}
              >
                {isProCTAPending ? 'Processing...' : getProCTA()}
              </Button>
              {currentPlan === 'pro' && (
                <Button
                  variant='tertiary'
                  type='button'
                  className='w-full !px-0'
                  disabled={cancelMutation.isPending}
                  onClick={handleCancelSubscription}
                >
                  {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Subscription'}
                </Button>
              )}
            </div>
            <p className='typography-small-p text-font-gray font-semibold mb-2'>
              Builds on Free with higher limits and deeper evaluation tools
            </p>
            <ul className='flex flex-col gap-1.5'>
              {PRO_FEATURES.map(f => <FeatureItem key={f.label} label={f.label} included={f.included} />)}
            </ul>
            <div className='flex-1' aria-hidden='true' />
          </StyledCard>
        </div>

        {/* ENTERPRISE */}
        <div className='flex w-full flex-col self-start'>
          <StyledCard
            padding={3}
            backgroundColor='bg-background-90'
            borderRadius='rounded-[18px]'
            extraStyles='relative flex flex-col overflow-hidden cursor-pointer hover-outline'
          >
            <div className='flex items-center justify-between gap-2 mb-1'>
              <p className='typography-small-p text-font-gray'>Enterprise</p>
              {currentPlan === 'enterprise' && (
                <span className='w-fit shrink-0 -mt-3 font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
                  Current Plan
                </span>
              )}
            </div>
            <h3 className='mb-3'>
              Large teams & scale hiring
              <br />
              (1000+ employees)
            </h3>
            <p className='font-bricolage font-bold text-4xl text-font-main mt-3 mb-3'>Custom</p>
            {currentPlan === 'enterprise' ? (
              <div className='flex flex-col w-full gap-2 mb-6'>
                <Button
                  variant={getEnterpriseVariant()}
                  type='button'
                  className='w-full !px-0'
                  disabled={isEnterpriseCTADisabled}
                  onClick={() => setShowEnterpriseModal(true)}
                >
                  {getEnterpriseCTA()}
                </Button>
                <Button
                  variant='tertiary'
                  type='button'
                  className='w-full !px-0'
                  onClick={() => setShowEnterpriseModal(true)}
                >
                  Contact Us
                </Button>
              </div>
            ) : (
              <Button
                variant={getEnterpriseVariant()}
                type='button'
                className='w-full !px-0 mb-6'
                disabled={isEnterpriseCTADisabled}
                onClick={() => setShowEnterpriseModal(true)}
              >
                {getEnterpriseCTA()}
              </Button>
            )}
            <p className='typography-small-p text-font-gray font-semibold mb-2'>
              Builds on Pro for larger teams, custom workflows, and deeper control
            </p>
            <ul className='flex flex-col gap-1.5'>
              {ENTERPRISE_FEATURES.map((f) => (
                <FeatureItem key={f.label} label={f.label} included={f.included} />
              ))}
              {Array.from({
                length: currentPlan === 'enterprise'
                  ? 0
                  : FREE_FEATURES.length - ENTERPRISE_FEATURES.length - 2,
              }).map((_, i) => (
                <li key={`enterprise-spacer-${i}`} className='flex items-start gap-3 invisible pointer-events-none' aria-hidden='true'>
                  <span className='flex-shrink-0 w-4 h-4' />
                  <span>&nbsp;</span>
                </li>
              ))}
            </ul>
            <div className='mt-2 shrink-0'>
              <p className='typography-body font-semibold text-font-main'>Need something beyond this plan?</p>
              <p className='typography-small-p text-font-gray mt-1'>
                We&apos;ll discuss your team&apos;s hiring needs and build a custom setup.
              </p>
            </div>
            <div className='h-px shrink-0' aria-hidden='true' />
          </StyledCard>
        </div>

        </div>
      </div>

      <StyledCard padding={2} extraStyles='w-full'>
        <h3 className='mb-6'>Compare all features</h3>
        <FeatureComparisonTable
          sections={COMPARISON}
          highlightedColumn={highlightedComparisonColumn}
        />
      </StyledCard>

      <p className='typography-body text-font-gray text-center mt-6'>
        Questions about Enterprise?{' '}
        <span onClick={() => setShowEnterpriseModal(true)} className='text-teal-100 cursor-pointer hover:underline'>
          Contact our Enterprise Team
        </span>
      </p>

      <Modal
        open={showEndTrialModal}
        onClose={() => setShowEndTrialModal(false)}
        onConfirm={handleEndTrial}
        customTitle='Leaving Us?'
        customMessage='Are you sure you want to cancel your current subscription?'
        customConfirmLabel='Cancel subscription'
        cancelLabel='Close'
        cancelVariant='tertiary'
        isReadyToClose={false}
        specifiedWidth='max-w-xl'
        showCloseIcon
      >
        <div className='mt-4 flex flex-col gap-4'>
          <p className='typography-body font-semibold text-font-main'>You would lose access to:</p>
          <ul className='flex flex-col gap-2'>
            {TRIAL_LOSS_FEATURES.map((item) => (
              <li key={item} className='flex items-center gap-3 typography-body text-font-gray'>
                <IconWrapper icon={X} inheritColor customIconSize={0} customStrokeWidth={4} size={0} className='text-font-gray opacity-60' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className='typography-body font-semibold text-font-main'>
            Your plan benefits will end in 24 hours.
          </p>
          <div className='flex gap-3 items-start'>
            <IconWrapper icon={Info} inheritColor customIconSize={0} customStrokeWidth={4} size={0} className='text-font-gray flex-shrink-0 mt-0.5' />
            <p className='typography-small-p text-font-gray'>
              You will be moved to a Free plan. Your existing data won&apos;t be removed. Your jobs, candidates, evaluations, and Talent Pool will remain available in view-only mode based on your plan limits.
            </p>
          </div>
        </div>
      </Modal>

      {showTrialModal && (
        <TrialInfoModal
          onClose={() => setShowTrialModal(false)}
          secondaryCTA="Continue using free version"
          onStartTrial={() => {
            startTrialMutation.mutate()
            setShowTrialModal(false)
          }}
        />
      )}

      {showEnterpriseModal && (
        <EnterpriseContactModal onClose={() => setShowEnterpriseModal(false)} />
      )}

      <Modal
        open={showCancelProModal}
        onClose={() => setShowCancelProModal(false)}
        onConfirm={handleConfirmCancelPro}
        customTitle='Cancel Pro subscription?'
        customMessage='You will return to the Free plan immediately. Any active Stripe subscriptions on your account will be cancelled.'
        customConfirmLabel='Cancel and go to Free'
        cancelLabel='Keep Pro'
        cancelVariant='tertiary'
        isReadyToClose={false}
        specifiedWidth='max-w-lg'
        showCloseIcon
      />

    </Container>
  )
}

export default PricingAndSubscription
