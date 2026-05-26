import React from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import { Button } from '../../components/Buttons/Button'
import { useAuthContext } from '../../context/AuthProvider'
import { Users, Mail, Circle, ArrowRight, Plus } from 'lucide-react'
import IconWrapper from '../../components/Cards/IconWrapper'
import { useNavigate } from 'react-router-dom'

const PLAN_CONFIG = {
  free: {
    label: 'Free Plan',
    description: "You're on the free tier with limited features",
    seatLimit: 2,
    appLimit: 150,
    statusLabel: 'Free forever',
    isPaid: false,
  },
  trial: {
    label: 'Pro Trial',
    description: "You're on a 21-day Pro trial — full access enabled",
    seatLimit: null,
    appLimit: null,
    statusLabel: '21-day trial',
    isPaid: false,
  },
  pro: {
    label: 'Pro Plan',
    description: "You have full access to all Geode features",
    seatLimit: null,
    appLimit: null,
    statusLabel: 'Active',
    isPaid: true,
  },
  enterprise: {
    label: 'Enterprise Plan',
    description: "Custom plan — dedicated support enabled",
    seatLimit: null,
    appLimit: null,
    statusLabel: 'Active',
    isPaid: true,
  },
}

function ManagePlan() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const currentPlan = 'free'
  const plan = PLAN_CONFIG[currentPlan]

  const usedSeats = 1
  const usedApps = 47
  const members = [
    { name: (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : 'Jane Doe', email: user?.email || 'jane@company.com', role: 'Admin', status: 'Active', isYou: true },
  ]

  return (
    <Container>
      <Header HeaderText="Manage Plan" />

      {/* Current Plan */}
      <StyledCard padding={2} extraStyles='w-full mb-4'>
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h3>Current Plan</h3>
            <p className='typography-small-p text-font-gray mt-1'>{plan.description}</p>
          </div>
          <span className='typography-body text-font-gray'>{plan.label}</span>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

          <StyledCard backgroundColor='bg-background-100' padding={3} extraStyles='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-font-gray'>
              <IconWrapper inheritColor icon={Users} size={0} customIconSize={1} />
              <span className='typography-small-p'>Team Seats</span>
            </div>
            <div>
              <span className='font-bricolage font-bold text-3xl text-font-main'>{usedSeats}</span>
              {plan.seatLimit && <span className='typography-body text-font-gray'>/{plan.seatLimit}</span>}
              {!plan.seatLimit && <span className='typography-body text-font-gray'> used</span>}
            </div>
            <p className='typography-small-p text-font-gray'>
              {plan.seatLimit ? `${plan.seatLimit - usedSeats} available` : 'Unlimited seats'}
            </p>
          </StyledCard>

          <StyledCard backgroundColor='bg-background-100' padding={3} extraStyles='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-font-gray'>
              <IconWrapper inheritColor icon={Mail} size={0} customIconSize={1} />
              <span className='typography-small-p'>Applications</span>
            </div>
            <div>
              <span className='font-bricolage font-bold text-3xl text-font-main'>{usedApps}</span>
              {plan.appLimit && <span className='typography-body text-font-gray'>/{plan.appLimit}</span>}
              {!plan.appLimit && <span className='typography-body text-font-gray'> this month</span>}
            </div>
            <p className='typography-small-p text-font-gray'>This month</p>
          </StyledCard>

          <StyledCard backgroundColor='bg-background-100' padding={3} extraStyles='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-font-gray'>
              <IconWrapper inheritColor icon={Circle} size={0} customIconSize={1} />
              <span className='typography-small-p'>Status</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-teal-100' />
              <span className='font-bricolage font-bold text-xl text-font-main'>Active</span>
            </div>
            <p className='typography-small-p text-font-gray'>{plan.statusLabel}</p>
          </StyledCard>

        </div>
      </StyledCard>

      {/* Ready for more banner — free/trial only */}
      {!plan.isPaid && (
        <StyledCard
          padding={2}
          backgroundColor='bg-background-80'
          extraStyles='w-full mb-4 flex justify-between items-center border border-teal-10'
        >
          <div>
            <h3>Ready for more?</h3>
            <p className='typography-body text-font-gray mt-1'>
              Unlock Geode Score, talent pools, and unlimited applications with Pro.
            </p>
          </div>
          <Button
            variant='primary'
            type='button'
            icon={ArrowRight}
            iconPosition='right'
            onClick={() => navigate('/admin/pricing')}
          >
            View Plans
          </Button>
        </StyledCard>
      )}

      {/* Team Members */}
      <StyledCard padding={2} extraStyles='w-full'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h3>Team Members</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              Manage who has access to your Geode workspace
              {plan.seatLimit && ` (${usedSeats}/${plan.seatLimit} seats used)`}
            </p>
          </div>
          <Button
            variant='primary'
            type='button'
            icon={Plus}
            iconPosition='left'
            disabled={plan.seatLimit && usedSeats >= plan.seatLimit}
          >
            Add Member
          </Button>
        </div>

        <div className='grid grid-cols-4 px-2 pb-2 border-b border-divider-100'>
          <span className='typography-small-p text-font-gray col-span-2'>Member</span>
          <span className='typography-small-p text-font-gray'>Role</span>
          <span className='typography-small-p text-font-gray'>Status</span>
        </div>

        {members.map((member, i) => (
          <div key={i} className='grid grid-cols-4 px-2 py-4 items-center border-b border-divider-100 last:border-0'>
            <div className='col-span-2 flex flex-col'>
              <span className='typography-body text-font-main'>
                {member.name} {member.isYou && <span className='text-font-gray'>(You)</span>}
              </span>
              <span className='typography-small-p text-font-gray'>{member.email}</span>
            </div>
            <span className='typography-small-p bg-teal-10 text-teal-100 px-3 py-1 rounded-full w-fit'>
              {member.role}
            </span>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-teal-100' />
              <span className='typography-body text-font-main'>{member.status}</span>
            </div>
          </div>
        ))}
      </StyledCard>

    </Container>
  )
}

export default ManagePlan
