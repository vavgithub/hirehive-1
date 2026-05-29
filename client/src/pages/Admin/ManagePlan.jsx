import React, { useState } from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import { Button } from '../../components/Buttons/Button'
import Modal from '../../components/Modals/Modal'
import { InputField } from '../../components/Inputs/InputField'
import GlobalDropDown from '../../components/Dropdowns/GlobalDropDown'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addMember } from '../../services/admin.service'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import { emailPattern } from '../../components/Register/RegisterForm'
import { roleOptions } from '../../components/Register/AddMembers'
import { useAuthContext } from '../../context/AuthProvider'
import { Users, Mail, Circle, ArrowRight, Plus, Edit2, Trash2 } from 'lucide-react'
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

  const [currentPlan, setCurrentPlan] = useState('free')
  const [showAddModal, setShowAddModal] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [roleError, setRoleError] = useState('')
  const queryClient = useQueryClient()

  const plan = PLAN_CONFIG[currentPlan]

  const usedSeats = 1
  const usedApps = 47
  const members = [
    { name: (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : 'Jane Doe', email: user?.email || 'jane@company.com', role: 'Admin', status: 'Active', isYou: true },
  ]

  const addMemberMutation = useMutation({
    mutationFn: addMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries('team_members')
      showSuccessToast('Success', data?.message || 'Team member added successfully.')
      setShowAddModal(false)
      setFirstName(''); setLastName(''); setEmail(''); setRole('')
    },
    onError: (error) => {
      showErrorToast('Error', error?.response?.data?.message || 'Error adding team member.')
    }
  })

  const handleAddMember = () => {
    let valid = true
    if (!firstName.trim()) { setFirstNameError('Please enter the firstname'); valid = false } else setFirstNameError('')
    if (!lastName.trim()) { setLastNameError('Please enter the lastname'); valid = false } else setLastNameError('')
    if (!email.trim()) { setEmailError('Please enter the email'); valid = false }
    else if (!emailPattern.test(email)) { setEmailError('Invalid email format'); valid = false }
    else setEmailError('')
    if (!role.trim()) { setRoleError('Please select a role'); valid = false } else setRoleError('')
    if (!valid) return
    addMemberMutation.mutate({ teamMember: { firstName, lastName, email, role } })
  }

  return (
    <Container>
      <Header
        HeaderText="Manage Plan"
        rightContent={
          /* DEV ONLY — remove before final release */
          <select
            value={currentPlan}
            onChange={(e) => setCurrentPlan(e.target.value)}
            className='bg-background-100 border border-divider-100 text-font-main typography-small-p rounded-lg px-3 py-1'
          >
            <option value='free'>Current plan: Free</option>
            <option value='trial'>Current plan: Trial</option>
            <option value='pro'>Current plan: Pro</option>
            <option value='enterprise'>Current plan: Enterprise</option>
          </select>
        }
      />

      {/* Current Plan */}
      <StyledCard padding={2} extraStyles='w-full mb-4'>
        <div className='flex flex-col mb-6'>
          <div className='flex items-center gap-3'>
            <h3>Current Plan</h3>
            <span className='typography-small-p text-font-gray bg-background-100 border border-divider-100 px-3 py-1 rounded-full'>{plan.label}</span>
          </div>
          <p className='typography-small-p text-font-gray mt-1'>{plan.description}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
          <StyledCard backgroundColor='bg-background-100' padding={3} extraStyles='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-font-gray mb-2'>
              <IconWrapper inheritColor icon={Users} size={0} customIconSize={1} />
              <span className='typography-small-p'>Team Seats</span>
            </div>
            <div className='flex items-baseline gap-1 pt-2'>
              <span className='font-bricolage font-bold text-3xl text-font-main'>{usedSeats}</span>
              {plan.seatLimit && <span className='typography-body text-font-gray'>/{plan.seatLimit}</span>}
              {!plan.seatLimit && <span className='typography-body text-font-gray'> used</span>}
            </div>
            <p className='typography-small-p text-font-gray'>
              {plan.seatLimit ? `${plan.seatLimit - usedSeats} available` : 'Unlimited seats'}
            </p>
          </StyledCard>

          <StyledCard backgroundColor='bg-background-100' padding={3} extraStyles='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-font-gray mb-2'>
              <IconWrapper inheritColor icon={Mail} size={0} customIconSize={1} />
              <span className='typography-small-p'>Applications Received</span>
            </div>
            <div className='flex items-baseline gap-1 pt-2'>
              <span className='font-bricolage font-bold text-3xl text-font-main'>{usedApps}</span>
              {plan.appLimit && <span className='typography-body text-font-gray'>/{plan.appLimit}</span>}
              {!plan.appLimit && <span className='typography-body text-font-gray'> this month</span>}
            </div>
            <p className='typography-small-p text-font-gray'>This month</p>
          </StyledCard>

          <StyledCard backgroundColor='bg-background-100' padding={3} extraStyles='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-font-gray mb-2'>
              <IconWrapper inheritColor icon={Circle} size={0} customIconSize={1} />
              <span className='typography-small-p'>Status</span>
            </div>
            <div className='flex items-center gap-2 pt-2'>
              <span className='font-bricolage font-bold text-3xl text-font-main'>Active</span>
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
              Unlock budget screening, talent pools, unlimited candidate applications and much more with Pro.
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
            </p>
          </div>
          <Button
            variant='secondary'
            type='button'
            icon={Plus}
            iconPosition='left'
            onClick={() => setShowAddModal(true)}
            disabled={plan.seatLimit && usedSeats >= plan.seatLimit}
          >
            Add Member
          </Button>
        </div>

        <div className='grid grid-cols-5 px-2 pb-2 border-b border-divider-100'>
          <span className='typography-small-p text-font-gray col-span-2'>Member</span>
          <span className='typography-small-p text-font-gray'>Role</span>
          <span className='typography-small-p text-font-gray'>Status</span>
          <span className='typography-small-p text-font-gray'>Actions</span>
        </div>

        {members.map((member, i) => (
          <div key={i} className='grid grid-cols-5 px-2 py-4 items-center border-b border-divider-100 last:border-0'>
            <div className='col-span-2 flex flex-col'>
              <span className='typography-body text-font-main'>
                {member.name} {member.isYou && <span className='text-font-gray'>(You)</span>}
              </span>
              <span className='typography-small-p text-font-gray'>{member.email}</span>
            </div>
            <p className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
              {member.role}
            </p>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-teal-100' />
              <span className='typography-body text-font-main'>{member.status}</span>
            </div>
            <div className='flex items-center gap-3'>
              <IconWrapper inheritColor icon={Edit2} size={0} customIconSize={3} className='cursor-pointer hover:text-accent-100' />
              <IconWrapper inheritColor icon={Trash2} size={0} customIconSize={3} className='cursor-pointer hover:text-red-100' />
            </div>
          </div>
        ))}
      </StyledCard>

      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onConfirm={handleAddMember}
        customConfirmLabel='Add'
        customTitle='Add Team Member'
        customMessage='Add team members of your company and invite them to join.'
        isReadyToClose={false}
      >
        <div className='mt-4 flex flex-col gap-4'>
          <StyledCard padding={0} backgroundColor='bg-transparent' extraStyles='flex flex-col gap-4 mb-4'>
            <InputField
              type='text'
              label='First Name'
              labelStyles='font-bricolage font-medium'
              extraClass='mt-1'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              error={firstNameError}
              errorMessage={firstNameError}
            />
            <InputField
              type='text'
              label='Last Name'
              labelStyles='font-bricolage font-medium'
              extraClass='mt-1'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              error={lastNameError}
              errorMessage={lastNameError}
            />
            <InputField
              type='email'
              label='Email'
              labelStyles='font-bricolage font-medium'
              extraClass='mt-1'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={emailError}
              errorMessage={emailError}
            />
            <GlobalDropDown
              label='Role'
              required
              extraStylesForLabel='font-bricolage font-medium'
              value={role}
              error={roleError}
              errorMessage={roleError}
              onChange={setRole}
              options={roleOptions}
            />
          </StyledCard>
        </div>
      </Modal>

    </Container>
  )
}

export default ManagePlan
