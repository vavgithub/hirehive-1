import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthProvider'
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
      { feature: 'Candidate applications',  free: 'Up to 150/month', pro: 'Unlimited',       enterprise: 'Unlimited' },
      { feature: 'User seats',              free: '2 seats only',    pro: 'Per user pricing', enterprise: 'Unlimited' },
      { feature: 'Google Calendar Invites', free: true,  pro: true,  enterprise: true },
      { feature: 'Auto assign portfolios',  free: false,  pro: true,  enterprise: true },
    ]
  },
  {
    category: 'Evaluation & Scoring',
    rows: [
      { feature: 'Geode Score',        free: true, pro: true,  enterprise: true },
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

const CellValue = ({ value }) => {
  if (value === true)  return <IconWrapper icon={Check} inheritColor customIconSize={0} customStrokeWidth={11} size={0} className='text-teal-100 mx-auto' />
  if (value === false) return <IconWrapper icon={X} inheritColor customIconSize={0} customStrokeWidth={4} size={0} className='text-font-gray opacity-30 mx-auto' />
  return <span className='typography-body text-font-gray'>{value}</span>
}

function PricingAndSubscription() {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const trialStatus = useTrialStatus()
  const currentPlan = searchParams.get('plan') || user?.plan || 'free'

  const [billing, setBilling] = useState('monthly')
  const [showEndTrialModal, setShowEndTrialModal] = useState(false)
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)

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
    if (currentPlan === 'pro') return 'Add license'
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
    if (currentPlan === 'free' || currentPlan === 'trial' || currentPlan === 'pro') return 'primary'
    return 'secondary'
  }

  const getEnterpriseVariant = () => (currentPlan === 'enterprise' ? 'primary' : 'secondary')

  const highlightedComparisonColumn =
    currentPlan === 'enterprise' ? 'enterprise' : currentPlan === 'pro' ? 'pro' : 'pro'

  const getComparisonHeaderClass = (column) =>
    column === highlightedComparisonColumn
      ? 'typography-body text-teal-100 text-center'
      : 'typography-body text-font-gray text-center'

  const isFreeCTADisabled = currentPlan === 'free'
  const isProCTADisabled = false
  const isEnterpriseCTADisabled = false

  const handleFreeCTA = () => {
    if (currentPlan === 'trial') setShowEndTrialModal(true)
  }

  const handleEndTrial = () => {
    // TODO: API call to end trial
    setShowEndTrialModal(false)
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
          {billing === 'yearly' && (
            <span className='typography-small-p text-teal-100 bg-teal-10 border border-teal-100 px-2 py-0.5 rounded-full'>
              Save 20%
            </span>
          )}
        </div>

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
          <StyledCard padding={2} extraStyles='w-full !my-0'>
            <div className='flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6'>
              <div className='flex flex-col'>
                <h3>{trialStatus.bannerTitle}</h3>
                <p className='typography-small-p text-font-gray mt-1'>
                  You&apos;re experiencing Geode Pro features. Upgrade before your trial ends to keep access.
                </p>
              </div>
              <Button
                variant='primary'
                type='button'
                className='!px-6 shrink-0'
                onClick={() => document.getElementById('pricing-pro-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
              >
                Upgrade Now
              </Button>
            </div>

            <StatsGrid stats={trialStats} equalWidth />
          </StyledCard>
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
            <div className={`flex flex-col w-full ${currentPlan === 'pro' ? 'gap-2 mb-6' : 'mb-6'}`}>
              <Button
                variant={getProVariant()}
                type='button'
                className='w-full !px-0'
                disabled={isProCTADisabled}
                // TODO: wire to billing API
                onClick={() => {}}
              >
                {getProCTA()}
              </Button>
              {currentPlan === 'pro' && (
                <Button
                  variant='tertiary'
                  type='button'
                  className='w-full !px-0'
                  // TODO: wire to billing API
                  onClick={() => {}}
                >
                  Cancel Subscription
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

        <div className='grid grid-cols-4 pb-3 border-b border-divider-100'>
          <span className='typography-body text-font-gray'>Feature</span>
          <span className={getComparisonHeaderClass('free')}>Free</span>
          <span className={getComparisonHeaderClass('pro')}>Pro</span>
          <span className={getComparisonHeaderClass('enterprise')}>Enterprise</span>
        </div>

        {COMPARISON.map(section => (
          <div key={section.category}>
            <div className='py-3 mt-2'>
              <span className='typography-small-p text-font-gray font-semibold tracking-wide uppercase'>
                {section.category}
              </span>
            </div>
            {section.rows.map((row, i) => (
              <div key={i} className='grid grid-cols-4 py-3 border-b border-divider-100 last:border-0 items-center'>
                <span className='typography-body text-font-gray'>{row.feature}</span>
                <div className='flex justify-center'><CellValue value={row.free} /></div>
                <div className='flex justify-center'><CellValue value={row.pro} /></div>
                <div className='flex justify-center'><CellValue value={row.enterprise} /></div>
              </div>
            ))}
          </div>
        ))}
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
        />
      )}

      {showEnterpriseModal && (
        <EnterpriseContactModal onClose={() => setShowEnterpriseModal(false)} />
      )}

    </Container>
  )
}

export default PricingAndSubscription