import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthProvider'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import { Button } from '../../components/Buttons/Button'
import { Check, Lock, X } from 'lucide-react'
import IconWrapper from '../../components/Cards/IconWrapper'
import ToggleSwitch from '../../components/ui/ToggleSwitch'
import Modal from '../../components/Modals/Modal'
import { ACTION_TYPES } from '../../utility/ActionTypes'
import TrialInfoModal from '../../components/Register/TrialInfoModal'
import EnterpriseContactModal from '../../components/Register/EnterpriseContactModal'
import AssessmentBanner from '../../components/ui/AssessmentBanner'

const FREE_FEATURES = [
  { label: 'Up to 150 applications/month', included: true },
  { label: '2 team seats included',        included: true },
  { label: 'Google Calendar Invites',      included: true },
  { label: 'Rate candidates',              included: true },
  { label: 'Standard support',             included: true },
  { label: 'Auto assign portfolios',       included: false },
  { label: 'Geode Score evaluations',      included: false },
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
      { feature: 'Geode Score',        free: true,  pro: true,  enterprise: true },
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
  const currentPlan = searchParams.get('plan') || user?.plan || 'free'

  const [billing, setBilling] = useState('monthly')
  const [showEndTrialModal, setShowEndTrialModal] = useState(false)
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)

  const proPrice = billing === 'yearly' ? 15 : 19

  const getFreeCTA = () => {
    if (currentPlan === 'trial') return 'Upgrade Now'
    return 'Get Started'
  }

  const getProCTA = () => {
    if (currentPlan === 'free') return 'Upgrade to Pro'
    if (currentPlan === 'pro') return 'Add License'
    return 'Get Started'
  }

  const getEnterpriseCTA = () => {
    if (currentPlan === 'enterprise') return 'Add License'
    if (currentPlan === 'free' || currentPlan === 'trial' || currentPlan === 'pro') return 'Contact Us'
    return 'Get Started'
  }

  const getFreeVariant = () => (currentPlan === 'trial' ? 'primary' : 'outline')

  const getProVariant = () => {
    if (currentPlan === 'free' || currentPlan === 'trial' || currentPlan === 'pro') return 'primary'
    return 'outline'
  }

  const getEnterpriseVariant = () => (currentPlan === 'enterprise' ? 'primary' : 'outline')

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

      <div className='flex items-center justify-center gap-3 mb-6'>
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

      {(currentPlan === 'free' || currentPlan === 'trial') && (
        <AssessmentBanner
          title='First time here?'
          description='New users get a guided trial experience during onboarding.'
          buttonText='Experience Trial'
          onButtonClick={() => setShowTrialModal(true)}
        />
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-10'>

        {/* FREE */}
        <StyledCard padding={3} backgroundColor='bg-background-90' extraStyles='relative flex flex-col'>
          {(currentPlan === 'free' || currentPlan === 'trial') && (
            <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
              <span className='typography-small-p text-font-gray bg-background-90 border border-divider-100 px-2 py-0.5 rounded-full'>
                Current Plan
              </span>
            </div>
          )}
          <p className='typography-small-p text-font-gray mb-1'>Free</p>
          <h3 className='mb-4'>
            Getting used to Geode
            <br />
            (2 seats only)
          </h3>
          <p className='font-bricolage font-bold text-4xl text-font-main mt-4 mb-4'>$0</p>
          <Button
            variant={getFreeVariant()}
            type='button'
            className='w-full !px-0 mb-8'
            disabled={isFreeCTADisabled}
            onClick={handleFreeCTA}
          >
            {getFreeCTA()}
          </Button>
          <p className='typography-small-p text-font-gray font-semibold mb-3'>What's included</p>
          <ul className='flex flex-col gap-2'>
            {FREE_FEATURES.map(f => <FeatureItem key={f.label} label={f.label} included={f.included} />)}
          </ul>
        </StyledCard>

        {/* PRO */}
        <StyledCard padding={3} backgroundColor='bg-background-90' extraStyles='relative flex flex-col border border-teal-100'>
          <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
            {currentPlan === 'pro' ? (
              <span className='typography-small-p text-font-gray bg-background-90 border border-divider-100 px-2 py-0.5 rounded-full whitespace-nowrap'>
                Current Plan
              </span>
            ) : (
              <span className='typography-small-p font-medium text-background-90 bg-teal-100 px-3 py-0.5 rounded-full whitespace-nowrap'>
                Recommended
              </span>
            )}
          </div>
          <p className='typography-small-p text-font-gray mb-1'>Pro</p>
          <h3 className='mb-4'>
            Small teams & agencies
            <br />
            (50–1000 employees)
          </h3>
          <div className='flex items-end gap-1 mt-4 mb-4'>
            <span className='font-bricolage font-bold text-4xl text-font-main'>${proPrice}</span>
            <span className='typography-small-p text-font-gray mb-1'>/user/month</span>
          </div>
          <Button
            variant={getProVariant()}
            type='button'
            className='w-full !px-0 mb-8'
            disabled={isProCTADisabled}
            // TODO: wire to billing API
            onClick={() => {}}
          >
            {getProCTA()}
          </Button>
          <p className='typography-small-p text-font-gray font-semibold mb-3'>
            Builds on Free with higher limits and deeper evaluation tools
          </p>
          <ul className='flex flex-col gap-2'>
            {PRO_FEATURES.map(f => <FeatureItem key={f.label} label={f.label} included={f.included} />)}
          </ul>
        </StyledCard>

        {/* ENTERPRISE */}
        <StyledCard padding={3} backgroundColor='bg-background-90' extraStyles='relative flex flex-col'>
          {currentPlan === 'enterprise' && (
            <div className='absolute -top-3 left-4'>
              <span className='typography-small-p text-font-gray bg-background-90 border border-divider-100 px-2 py-0.5 rounded-full'>
                Current Plan
              </span>
            </div>
          )}
          <p className='typography-small-p text-font-gray mb-1'>Enterprise</p>
          <h3 className='mb-4'>Large teams & scale hiring (1000+ employees)</h3>
          <p className='font-bricolage font-bold text-3xl text-font-main mt-4 mb-4'>Custom</p>
          <div className={`flex flex-col w-full ${currentPlan === 'enterprise' ? 'gap-3 mb-8' : 'mb-8'}`}>
            <Button
              variant={getEnterpriseVariant()}
              type='button'
              className='w-full !px-0'
              disabled={isEnterpriseCTADisabled}
              onClick={() => setShowEnterpriseModal(true)}
            >
              {getEnterpriseCTA()}
            </Button>
            {currentPlan === 'enterprise' && (
              <Button
                variant='outline'
                type='button'
                className='w-full !px-0'
                onClick={() => setShowEnterpriseModal(true)}
              >
                Contact Us
              </Button>
            )}
          </div>
          <p className='typography-small-p text-font-gray font-semibold mb-3'>
            Builds on Pro for larger teams, custom workflows, and deeper control
          </p>
          <ul className='flex flex-col gap-2'>
            {ENTERPRISE_FEATURES.map((f) => (
              <FeatureItem key={f.label} label={f.label} included={f.included} />
            ))}
          </ul>
          <div className='mt-6'>
            <p className='typography-body text-font-main'>Need something beyond this plan?</p>
            <p className='typography-small-p text-font-gray mt-1'>
              We&apos;ll discuss your team&apos;s hiring needs and build a custom setup.
            </p>
          </div>
        </StyledCard>

      </div>

      <StyledCard padding={2} extraStyles='w-full'>
        <h3 className='mb-6'>Compare all features</h3>

        <div className='grid grid-cols-4 pb-3 border-b border-divider-100'>
          <span className='typography-body text-font-gray'>Feature</span>
          <span className='typography-body text-font-gray text-center'>Free</span>
          <span className='typography-body text-teal-100 text-center'>Pro</span>
          <span className='typography-body text-font-gray text-center'>Enterprise</span>
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
        customTitle="Leave the full Geode experience behind?"
        customMessage="Your trial gives you access to the complete evaluation process. Moving to the Free Plan means some layers of discovery will be limited."
        customConfirmLabel="End my trial"
        isReadyToClose={false}
      >
        <div className='mt-4 flex flex-col gap-4'>
          <p className='typography-body text-font-gray'>You would lose access to:</p>
          <ul className='flex flex-col gap-2'>
            {[
              'Unlimited users',
              'Unlimited candidate applications',
              'Budget-based candidate screening',
              'Custom evaluation questionnaires',
              'Structured reviewer feedback',
              'Creating reusable Talent Pool of future gems',
            ].map(item => (
              <li key={item} className='flex items-center gap-3 typography-body text-font-gray'>
                <IconWrapper icon={X} inheritColor customIconSize={0} customStrokeWidth={4} size={0} className='text-red-100' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className='typography-small-p text-font-gray'>
            Moving to the Free Plan won't remove your existing data. Your jobs, candidates, evaluations, and Talent Pool will remain available in view-only mode based on your plan limits.
          </p>
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