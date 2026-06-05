import React, { useEffect, useMemo, useRef, useState } from 'react'
import Container from '../../components/Cards/Container'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import { Button } from '../../components/Buttons/Button'
import Modal from '../../components/Modals/Modal'
import { InputField } from '../../components/Inputs/InputField'
import GlobalDropDown from '../../components/Dropdowns/GlobalDropDown'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addMember, getAllTeamMembers, removeTeamMember } from '../../services/admin.service'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import { emailPattern } from '../../components/Register/RegisterForm'
import { roleOptions } from '../../components/Register/AddMembers'
import { useAuthContext } from '../../context/AuthProvider'
import { getRoute, ROUTE_KEY } from '../../config/permissions.config'
import { Users, Mail, Circle, Plus, Edit2, Trash2, ChevronDown, UserCog, Search } from 'lucide-react'
import IconWrapper from '../../components/Cards/IconWrapper'
import { useNavigate } from 'react-router-dom'
import LoaderModal from '../../components/Loaders/LoaderModal'
import StatsGrid from '../../components/ui/StatsGrid'
import { useUnknownProfilePicture } from '../../context/ThemeContext'
import AssessmentBanner from '../../components/ui/AssessmentBanner'

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

  const [showAddModal, setShowAddModal] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [changeAdminMenuRowId, setChangeAdminMenuRowId] = useState(null)
  const [adminSearch, setAdminSearch] = useState('')
  const [pendingAdminMember, setPendingAdminMember] = useState(null)
  const [showChangeAdminModal, setShowChangeAdminModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [pendingRemoveMember, setPendingRemoveMember] = useState(null)
  const changeAdminMenuRef = useRef(null)
  const queryClient = useQueryClient()
  const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture()
  const isAdmin = user?.role === 'Admin'

  const plan = PLAN_CONFIG[user?.plan || 'free']

  const { data: teamData, isLoading: isTeamLoading } = useQuery({ queryKey: ['team_members'], queryFn: getAllTeamMembers })

  const usedSeats = teamData?.members?.length || 0
  const seatLimit = plan.seatLimit
  const usedApps = 47

  const stats = [
    {
      title: 'Team Seats',
      value: seatLimit ? `${usedSeats}/${seatLimit}` : usedSeats,
      icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
      statistics: seatLimit ? {
        monthly: `${seatLimit - usedSeats} available`,
      } : undefined,
    },
    {
      title: 'Applications Received',
      value: plan.appLimit ? `${usedApps}/${plan.appLimit}` : usedApps,
      icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Mail} />,
      statistics: { monthly: 'This month' },
    },
    {
      title: 'Status',
      value: 'Active',
      icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Circle} />,
      statistics: { monthly: plan.statusLabel },
    },
  ]

  const invitedMembers = teamData?.members ?? []
  const members = [
    {
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: 'Admin',
      status: 'JOINED',
      isYou: true,
    },
    ...invitedMembers
  ]

  const filteredAdminCandidates = useMemo(() => {
    const term = adminSearch.trim().toLowerCase()
    return members.filter((member) => {
      const name = `${member?.firstName ?? ''} ${member?.lastName ?? ''}`.toLowerCase()
      return !term || name.includes(term) || member?.email?.toLowerCase().includes(term)
    })
  }, [members, adminSearch])

  useEffect(() => {
    if (!changeAdminMenuRowId) return
    const handleClickOutside = (e) => {
      if (changeAdminMenuRef.current && !changeAdminMenuRef.current.contains(e.target)) {
        setChangeAdminMenuRowId(null)
        setAdminSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [changeAdminMenuRowId])

  const handleSelectNewAdmin = (member) => {
    setPendingAdminMember(member)
    setChangeAdminMenuRowId(null)
    setAdminSearch('')
    setShowChangeAdminModal(true)
  }

  const handleConfirmChangeAdmin = () => {
    // TODO: wire to change-admin API
    const name = `${pendingAdminMember?.firstName ?? ''} ${pendingAdminMember?.lastName ?? ''}`.trim()
    showSuccessToast('Success', `Admin changed to ${name}.`)
    setShowChangeAdminModal(false)
    setPendingAdminMember(null)
  }

  const removeMemberMutation = useMutation({
    mutationFn: removeTeamMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] })
      showSuccessToast('Success', data?.message || 'Team member removed successfully.')
      setShowRemoveModal(false)
      setPendingRemoveMember(null)
    },
    onError: (error) => {
      showErrorToast('Error', error?.response?.data?.message || 'Error removing team member.')
    },
  })

  const handleRemoveMember = (member) => {
    setPendingRemoveMember(member)
    setShowRemoveModal(true)
  }

  const handleConfirmRemoveMember = () => {
    if (!pendingRemoveMember?.email) return
    removeMemberMutation.mutate({ email: pendingRemoveMember.email })
  }

  const addMemberMutation = useMutation({
    mutationFn: addMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] })
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
      <Header HeaderText="Manage Plan" />
      {(addMemberMutation?.isPending || removeMemberMutation?.isPending || isTeamLoading) && <LoaderModal />}

      {/* Current Plan */}
      <StyledCard padding={2} extraStyles='w-full mb-4'>
        <div className='flex flex-col mb-6'>
          <div className='flex items-center gap-3'>
            <h3>Current Plan</h3>
            <span className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider px-4 py-1 bg-background-80 text-font-gray border border-divider-100'>{plan.label}</span>
          </div>
          <p className='typography-small-p text-font-gray mt-1'>{plan.description}</p>
        </div>

        <StatsGrid stats={stats} />
      </StyledCard>

      {/* Ready for more banner — free/trial only */}
      {!plan.isPaid && (
        <AssessmentBanner
          title='Ready for more?'
          description='Unlock Geode Score, talent pools, and unlimited applications with Pro.'
          buttonText='View Plans'
          onButtonClick={() => navigate(getRoute(user.role, ROUTE_KEY.PRICING))}
        />
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

        {members.map((member) => {
          const memberId = member?.member_id ?? member?._id
          const isYou = user?.email && member?.email === user.email
          const statusDisplay = member?.status === 'JOINED' ? 'Joined' : member?.status === 'REQUESTED' ? 'Requested' : 'Invited'

          return (
            <div
              key={memberId}
              className='grid grid-cols-5 px-2 py-4 items-center border-b border-divider-100 last:border-0'
            >
              <div className='col-span-2 flex flex-col'>
                <span className='typography-body text-font-main'>
                  {member?.firstName} {member?.lastName}
                  {isYou && <span className='text-font-gray'> (You)</span>}
                </span>
                <span className='typography-small-p text-font-gray'>{member?.email}</span>
              </div>
              <p className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
                {member?.role}
              </p>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-teal-100' />
                <span className='typography-body text-font-main'>{statusDisplay}</span>
              </div>
              <div className='flex items-center justify-end gap-3'>
                {isAdmin && member.isYou && (
                  <>
                    <div className='relative' ref={changeAdminMenuRowId === memberId ? changeAdminMenuRef : null}>
                      <button
                        type='button'
                        className='cursor-pointer bg-background-70 h-9 min-h-9 px-2 flex justify-center items-center gap-1 rounded-xl hover:bg-background-80 text-font-gray hover:text-accent-100'
                        onClick={() => {
                          setChangeAdminMenuRowId((id) => (id === memberId ? null : memberId))
                          setAdminSearch('')
                        }}
                        aria-label='Change admin'
                      >
                        <IconWrapper inheritColor icon={UserCog} size={0} customIconSize={3} />
                        <ChevronDown size={14} />
                      </button>
                      {changeAdminMenuRowId === memberId && (
                        <div className='absolute right-0 top-full mt-2 z-50 w-56 rounded-xl bg-background-80 shadow-[0px_0px_20px_rgba(45,45,45,0.7)] overflow-hidden'>
                          <div className='p-2 border-b border-divider-100 relative'>
                            <IconWrapper
                              inheritColor
                              icon={Search}
                              size={0}
                              customIconSize={2}
                              className='absolute left-3 top-1/2 -translate-y-1/2 text-font-gray pointer-events-none'
                            />
                            <InputField
                              type='text'
                              placeholder='Search'
                              value={adminSearch}
                              onChange={(e) => setAdminSearch(e.target.value)}
                              extraClass='pl-9 h-9'
                            />
                          </div>
                          <ul className='max-h-48 overflow-y-auto py-1'>
                            {filteredAdminCandidates.map((candidate) => {
                              const candidateId = candidate?.member_id ?? candidate?._id
                              return (
                                <li key={candidateId}>
                                  <button
                                    type='button'
                                    className='w-full flex items-center gap-3 px-3 py-2 typography-body text-font-main hover:bg-background-100 text-left'
                                    onClick={() => handleSelectNewAdmin(candidate)}
                                  >
                                    <img
                                      src={candidate?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL}
                                      alt=''
                                      className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                                    />
                                    <span className='truncate'>
                                      {candidate?.firstName} {candidate?.lastName}
                                    </span>
                                  </button>
                                </li>
                              )
                            })}
                            {filteredAdminCandidates.length === 0 && (
                              <li className='px-3 py-2 typography-small-p text-font-gray'>No members found</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => navigate(`/admin/teams/profile/${memberId}`)}
                      className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
                      aria-label='Edit member'
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigate(`/admin/teams/profile/${memberId}`)}
                    >
                      <IconWrapper inheritColor icon={Edit2} size={0} customIconSize={3} />
                    </div>
                  </>
                )}
                {isAdmin && !member.isYou && (
                  <>
                    <div
                      onClick={() => navigate(`/admin/teams/profile/${memberId}`)}
                      className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
                      aria-label='Edit member'
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigate(`/admin/teams/profile/${memberId}`)}
                    >
                      <IconWrapper inheritColor icon={Edit2} size={0} customIconSize={3} />
                    </div>
                    <div
                      onClick={() => handleRemoveMember(member)}
                      className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
                      aria-label='Remove member'
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleRemoveMember(member)}
                    >
                      <IconWrapper inheritColor icon={Trash2} size={0} customIconSize={3} className='text-red-100' />
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </StyledCard>

      <Modal
        open={showChangeAdminModal}
        onClose={() => {
          setShowChangeAdminModal(false)
          setPendingAdminMember(null)
        }}
        onConfirm={handleConfirmChangeAdmin}
        customTitle={`Change admin to ${pendingAdminMember?.firstName ?? ''} ${pendingAdminMember?.lastName ?? ''}?`}
        customMessage='This member will become the workspace admin.'
        customConfirmLabel='Yes'
        cancelLabel='No'
        isReadyToClose={false}
      />

      <Modal
        open={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false)
          setPendingRemoveMember(null)
        }}
        onConfirm={handleConfirmRemoveMember}
        customTitle={`Remove ${pendingRemoveMember?.firstName ?? ''} ${pendingRemoveMember?.lastName ?? ''}?`}
        customMessage='This member will lose access to your Geode workspace.'
        customConfirmLabel='Remove'
        cancelLabel='Cancel'
        isReadyToClose={false}
      />

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
