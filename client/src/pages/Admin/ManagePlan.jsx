import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
import { Users, Mail, Circle, Plus, Minus, Edit2, Trash2, ChevronDown, UserCog, Search, Clock, ExternalLink, Download, CreditCard, CalendarDays, DollarSign, X, Phone } from 'lucide-react'
import IconWrapper from '../../components/Cards/IconWrapper'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LoaderModal from '../../components/Loaders/LoaderModal'
import StatsGrid from '../../components/ui/StatsGrid'
import { useUnknownProfilePicture } from '../../context/ThemeContext'
import AssessmentBanner from '../../components/ui/AssessmentBanner'
import EnterpriseContactModal from '../../components/Register/EnterpriseContactModal'
import StatusBadge from '../../components/ui/StatusBadge'
import useTrialStatus from '../../hooks/useTrialStatus'
import { DataGrid } from '@mui/x-data-grid'
import MuiCustomStylesForDataGrid from '../../components/tableUtilities/MuiCustomStylesForDataGrid'

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
    label: 'Trial Plan',
    description: 'Experience Pro features during your trial period',
    seatLimit: null,
    appLimit: null,
    statusLabel: 'Trial',
    isPaid: false,
  },
  pro: {
    label: 'Pro Plan',
    description: 'Manage your subscription and billing details',
    seatLimit: 5,
    appLimit: null,
    statusLabel: 'Active',
    isPaid: true,
  },
  enterprise: {
    label: 'Enterprise Plan',
    description: 'Your enterprise subscription overview',
    seatLimit: 50,
    appLimit: null,
    statusLabel: 'Active',
    isPaid: true,
  },
}

const PLAN_PILL_CLASS = 'bg-background-80 text-font-gray border border-divider-100'

const TRIAL_STAT_VALUE_CLASS = 'font-gilroy text-h3 font-h3'

const formatMemberName = (firstName = '', lastName = '') => {
  const toTitleCase = (value) =>
    value.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())

  return [firstName, lastName]
    .filter((part) => part?.trim())
    .map(toTitleCase)
    .join(' ')
}

const MANAGE_PLAN_TABLE_SX = {
  '& .padded-col': {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  '& .MuiDataGrid-columnHeader': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiDataGrid-row': {
    cursor: 'default',
  },
  '& .first-row:hover, & .second-row:hover': {
    outline: 'none !important',
  },
  '& .first-row:hover': {
    backgroundColor: 'var(--color-background-100) !important',
  },
  '& .second-row:hover': {
    backgroundColor: 'var(--color-background-80) !important',
  },
}

// TODO: replace with real billing data from API
const PRO_PRICE_PER_LICENSE = 19
const PRO_LICENSE_COUNT = 5
const PRO_NEXT_BILL_DATE = 'June 8, 2028'
const PRO_BILLING_EFFECTIVE_DATE = '11/06/2026'

const PRO_PAYMENT_HISTORY = [
  { id: 'Inv-001', date: 'May 8, 2026', description: 'Pro Plan - 5 licenses', addOn: '+1 license', amount: '$95.00', status: 'Paid' },
  { id: 'Inv-002', date: 'Apr 8, 2026', description: 'Pro Plan - 4 licenses', addOn: null, amount: '$76.00', status: 'Paid' },
  { id: 'Inv-003', date: 'Mar 8, 2026', description: 'Pro Plan - 4 licenses', addOn: null, amount: '$76.00', status: 'Processing' },
]

// TODO: replace with real enterprise billing data from API
const ENTERPRISE_NEXT_BILL_DATE = 'January 1, 2027'

const ENTERPRISE_PAYMENT_HISTORY = [
  { id: 'INV-001', date: 'Apr 8, 2026', description: 'Enterprise Plan - Annual', addOn: '+10 licenses', amount: '$1,198.00', status: 'Paid' },
  { id: 'INV-002', date: 'Apr 8, 2025', description: 'Enterprise Plan - Annual', addOn: null, amount: '$1,098.00', status: 'Paid' },
]

const DEDICATED_SUPPORT = {
  name: 'Sarah Chen',
  email: 'sarah.chen@geode.io',
  phone: '+1 (555) 234-5678',
}

function ManagePlan() {
  const { user } = useAuthContext()
  const trialStatus = useTrialStatus()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const currentPlan = searchParams.get('plan') || user?.plan || 'free'
  const plan = PLAN_CONFIG[currentPlan] || PLAN_CONFIG.free
  const pricingPath = `${getRoute(user.role, ROUTE_KEY.PRICING)}?plan=${currentPlan}`

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
  const [showBuySeatsModal, setShowBuySeatsModal] = useState(false)
  const [seatsToBuy, setSeatsToBuy] = useState(1)
  const [showRemoveSeatsModal, setShowRemoveSeatsModal] = useState(false)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)
  const changeAdminMenuRef = useRef(null)
  const queryClient = useQueryClient()
  const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture()
  const isAdmin = user?.role === 'Admin'

  const { data: teamData, isLoading: isTeamLoading } = useQuery({ queryKey: ['team_members'], queryFn: getAllTeamMembers })

  const usedSeats = teamData?.members?.length || 0
  const memberCount = usedSeats + 1
  const seatLimit = plan.seatLimit
  const usedApps = currentPlan === 'enterprise' ? 4521 : currentPlan === 'pro' ? 847 : 47
  const enterpriseSeatsAvailable = seatLimit ? Math.max(seatLimit - memberCount, 0) : 0
  const paymentHistory = currentPlan === 'enterprise' ? ENTERPRISE_PAYMENT_HISTORY : PRO_PAYMENT_HISTORY
  const isPaidPlan = currentPlan === 'pro' || currentPlan === 'enterprise'
  const proMonthlyCost = PRO_LICENSE_COUNT * PRO_PRICE_PER_LICENSE
  const proSeatsAvailable = seatLimit ? Math.max(seatLimit - memberCount, 0) : 0
  const revisedMonthlyCost = (PRO_LICENSE_COUNT + seatsToBuy) * PRO_PRICE_PER_LICENSE

  useEffect(() => {
    if (showBuySeatsModal) setSeatsToBuy(1)
  }, [showBuySeatsModal])

  const handleBuySeatsContinue = () => {
    // TODO: wire to Stripe payment flow
    showSuccessToast('Success', 'Payment successful. Your licenses have been updated.')
    setShowBuySeatsModal(false)
  }

  const stats = currentPlan === 'trial'
    ? [
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
          title: 'Team Seats',
          value: memberCount,
          valueClassName: TRIAL_STAT_VALUE_CLASS,
          icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
          statistics: { monthly: 'Unlimited seats' },
        },
        {
          title: 'Applications',
          value: usedApps,
          valueClassName: TRIAL_STAT_VALUE_CLASS,
          icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Mail} />,
          statistics: { monthly: 'Unlimited' },
        },
        {
          title: 'Status',
          value: trialStatus.statusLabel,
          valueClassName: TRIAL_STAT_VALUE_CLASS,
          icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Circle} />,
        },
      ]
    : currentPlan === 'pro'
      ? [
          {
            title: 'Monthly Cost',
            value: `$${proMonthlyCost}`,
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={DollarSign} />,
            statistics: { monthly: `$${PRO_PRICE_PER_LICENSE} per license` },
          },
          {
            title: 'Team Seats',
            value: `${memberCount}/${seatLimit}`,
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
            statistics: { monthly: `${proSeatsAvailable} available` },
          },
          {
            title: 'Applications',
            value: usedApps,
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Mail} />,
            statistics: { monthly: 'Unlimited' },
          },
          {
            title: 'Billing Cycle',
            value: 'Monthly',
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={CalendarDays} />,
            statistics: { monthly: `Next bill: ${PRO_NEXT_BILL_DATE}` },
          },
        ]
      : currentPlan === 'enterprise'
        ? [
            {
              title: 'Annual Cost',
              value: 'Custom',
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={DollarSign} />,
              statistics: { monthly: 'Contact sales for pricing' },
            },
            {
              title: 'Team Seats',
              value: `${memberCount}/${seatLimit}`,
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
              statistics: { monthly: `${enterpriseSeatsAvailable} available` },
            },
            {
              title: 'Applications',
              value: usedApps,
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Mail} />,
              statistics: { monthly: 'Unlimited' },
            },
            {
              title: 'Billing Cycle',
              value: 'Yearly',
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={CalendarDays} />,
              statistics: { monthly: `Next bill: ${ENTERPRISE_NEXT_BILL_DATE}` },
            },
          ]
        : [
          {
            title: 'Team Seats',
            value: seatLimit ? `${usedSeats}/${seatLimit}` : usedSeats,
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
            statistics: seatLimit ? {
              monthly: `${seatLimit - usedSeats} available`,
            } : undefined,
          },
          {
            title: 'Applications',
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

  const getMemberStatusDisplay = (status) => {
    if (currentPlan === 'pro' || currentPlan === 'enterprise') {
      if (status === 'JOINED') return { label: 'Active', dotClass: 'bg-teal-100' }
      return { label: 'Pending', dotClass: 'bg-status-borderyellow' }
    }
    if (status === 'JOINED') return { label: 'Joined', dotClass: 'bg-teal-100' }
    if (status === 'REQUESTED') return { label: 'Requested', dotClass: 'bg-status-borderyellow' }
    return { label: 'Invited', dotClass: 'bg-status-borderyellow' }
  }

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

  const teamMemberColumns = useMemo(() => [
    {
      field: 'member',
      headerName: 'Member',
      flex: 1.6,
      minWidth: 260,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => {
        const isYou = params.row.isYou
        const displayName = formatMemberName(params.row.firstName, params.row.lastName)

        return (
          <div className='flex h-full flex-col justify-center gap-0.5 py-1'>
            <p className='typography-large-p text-font-main overflow-hidden whitespace-nowrap text-ellipsis'>
              {displayName}
              {isYou && <span className='text-font-gray'> (You)</span>}
            </p>
            <p className='typography-small-p text-font-gray overflow-hidden whitespace-nowrap text-ellipsis'>
              {params.row.email}
            </p>
          </div>
        )
      },
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      minWidth: 170,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <div className='flex h-full items-center'>
          <p className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
            {params.row.role}
          </p>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => {
        const { label, dotClass } = getMemberStatusDisplay(params.row.status)
        return (
          <div className='flex h-full items-center gap-2'>
            <div className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
            <p className='typography-large-p text-font-main'>{label}</p>
          </div>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      align: 'right',
      headerAlign: 'right',
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => {
        const member = params.row
        const memberId = member?.member_id ?? member?._id

        return (
          <div className='flex h-full w-full items-center justify-end gap-3'>
            {isAdmin && member.isYou && (
              <>
                <div className='relative' ref={changeAdminMenuRowId === memberId ? changeAdminMenuRef : null}>
                  <button
                    type='button'
                    className='cursor-pointer bg-background-70 h-9 min-h-9 px-2 flex justify-center items-center gap-1 rounded-xl hover:bg-background-80 text-font-gray hover:text-accent-100'
                    onClick={(e) => {
                      e.stopPropagation()
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
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/admin/teams/profile/${memberId}`)
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/admin/teams/profile/${memberId}`)
                  }}
                  className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
                  aria-label='Edit member'
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/admin/teams/profile/${memberId}`)}
                >
                  <IconWrapper inheritColor icon={Edit2} size={0} customIconSize={3} />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveMember(member)
                  }}
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
        )
      },
    },
  ], [
    isAdmin,
    changeAdminMenuRowId,
    adminSearch,
    filteredAdminCandidates,
    navigate,
    UNKNOWN_PROFILE_PICTURE_URL,
    currentPlan,
  ])

  const paymentHistoryColumns = useMemo(() => [
    {
      field: 'id',
      headerName: 'Invoice',
      flex: 0.8,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <p className='typography-body text-font-main'>{params.value}</p>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 120,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <p className='typography-body text-font-main'>{params.value}</p>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1.8,
      minWidth: 200,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <p className='typography-body text-font-main'>{params.value}</p>
      ),
    },
    {
      field: 'addOn',
      headerName: 'Add-ons',
      flex: 1,
      minWidth: 130,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <div className='flex h-full items-center'>
          {params.value ? (
            <p className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1'>
              {params.value}
            </p>
          ) : (
            <span className='typography-small-p text-font-gray'>—</span>
          )}
        </div>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.8,
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <p className='typography-body text-font-main'>{params.value}</p>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.9,
      minWidth: 120,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <div className='flex h-full items-center'>
          <StatusBadge status={params.value} customWidth='w-fit' />
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.7,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      align: 'right',
      headerAlign: 'right',
      cellClassName: 'padded-col',
      headerClassName: 'padded-col',
      renderCell: (params) => (
        <div className='flex h-full w-full items-center justify-end'>
          <div
            onClick={(e) => {
              e.stopPropagation()
              showSuccessToast('Info', `Downloading ${params.row.id}...`)
            }}
            className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
            aria-label='Download invoice'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') showSuccessToast('Info', `Downloading ${params.row.id}...`)
            }}
          >
            <IconWrapper inheritColor icon={Download} size={0} customIconSize={3} />
          </div>
        </div>
      ),
    },
  ], [])

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
            <span className={`w-fit font-bricolage text-sm rounded-full font-medium tracking-wider px-4 py-1 ${PLAN_PILL_CLASS}`}>
              {plan.label}
            </span>
          </div>
          <p className='typography-small-p text-font-gray mt-1'>{plan.description}</p>
        </div>

        <StatsGrid stats={stats} equalWidth={currentPlan === 'trial'} />

        {currentPlan === 'pro' && (
          <div className='flex flex-wrap items-center gap-3 mt-6'>
            <Button
              variant='tertiary'
              type='button'
              icon={ExternalLink}
              iconPosition='left'
              onClick={() => navigate(pricingPath)}
            >
              View Plans
            </Button>
            <Button
              variant='secondary'
              type='button'
              onClick={() => setShowRemoveSeatsModal(true)}
            >
              Remove seats
            </Button>
            <Button
              variant='primary'
              type='button'
              icon={Plus}
              iconPosition='left'
              onClick={() => setShowBuySeatsModal(true)}
            >
              Buy more seats
            </Button>
          </div>
        )}

        {currentPlan === 'enterprise' && (
          <div className='flex flex-wrap items-center gap-3 mt-6'>
            <Button
              variant='primary'
              type='button'
              onClick={() => setShowEnterpriseModal(true)}
            >
              Customise more
            </Button>
            <Button
              variant='tertiary'
              type='button'
              icon={ExternalLink}
              iconPosition='left'
              onClick={() => navigate(pricingPath)}
            >
              View Plans
            </Button>
          </div>
        )}
      </StyledCard>

      {currentPlan === 'enterprise' && (
        <StyledCard padding={2} extraStyles='w-full mb-4'>
          <div className='mb-4'>
            <h3>Dedicated Support</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              Your dedicated account manager for enterprise support
            </p>
          </div>
          <StyledCard padding={2} backgroundColor='bg-background-100' extraStyles='flex items-center gap-4'>
            <img
              src={UNKNOWN_PROFILE_PICTURE_URL}
              alt={DEDICATED_SUPPORT.name}
              className='w-14 h-14 rounded-full object-cover shrink-0'
            />
            <div className='flex flex-col gap-1'>
              <p className='typography-body font-semibold text-font-main'>{DEDICATED_SUPPORT.name}</p>
              <p className='typography-small-p text-font-gray'>{DEDICATED_SUPPORT.email}</p>
              <div className='flex items-center gap-2 typography-small-p text-font-gray'>
                <IconWrapper icon={Phone} inheritColor size={0} customIconSize={3} />
                <span>{DEDICATED_SUPPORT.phone}</span>
              </div>
            </div>
          </StyledCard>
        </StyledCard>
      )}

      {isPaidPlan && (
        <StyledCard padding={2} extraStyles='w-full mb-4'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div>
              <h3>Payment Method</h3>
              <p className='typography-small-p text-font-gray mt-1'>
                Your default payment method for subscriptions
              </p>
            </div>
            <Button
              variant='secondary'
              type='button'
              icon={Edit2}
              iconPosition='left'
              onClick={() => showSuccessToast('Info', 'Stripe payment update coming soon.')}
            >
              Update
            </Button>
          </div>
          <StyledCard padding={2} backgroundColor='bg-background-100' extraStyles='flex items-center gap-4 mt-4'>
            <div className='w-12 h-12 rounded-xl bg-background-80 flex items-center justify-center shrink-0'>
              <IconWrapper icon={CreditCard} inheritColor size={0} customIconSize={4} className='text-font-gray' />
            </div>
            <div>
              <p className='typography-body text-font-main'>Visa ending in 4242</p>
              <p className='typography-small-p text-font-gray mt-0.5'>Expires 12/2028</p>
            </div>
          </StyledCard>
        </StyledCard>
      )}

      {/* Ready for more / Love what you see — free/trial only */}
      {!plan.isPaid && (
        <AssessmentBanner
          title={currentPlan === 'trial' ? 'Love what you see?' : 'Ready for more?'}
          description={
            currentPlan === 'trial'
              ? 'Keep all your Pro features by choosing a plan before your trial ends.'
              : 'Unlock Geode Score, talent pools, and unlimited applications with Pro.'
          }
          buttonText='View Plans'
          onButtonClick={() => navigate(pricingPath)}
        />
      )}

      {/* Team Members */}
      <StyledCard padding={2} extraStyles={`w-full ${isPaidPlan ? 'mb-4' : ''}`}>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h3>Team Members</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              {(currentPlan === 'pro' || currentPlan === 'enterprise')
                ? `Manage who has access to your Geode workspace (${memberCount}/${seatLimit} seats used)`
                : 'Manage who has access to your Geode workspace'}
            </p>
          </div>
          <div className='flex items-center gap-3 flex-wrap justify-end'>
            {(currentPlan === 'trial' || currentPlan === 'pro') && (
              <>
                <span className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider px-4 py-1 bg-background-80 text-font-gray border border-divider-100'>
                  {memberCount} users
                </span>
                <span className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider px-4 py-1 bg-background-80 text-font-gray border border-divider-100'>
                  {currentPlan === 'trial' ? 'Unlimited seats' : `${seatLimit} seats`}
                </span>
              </>
            )}
            <Button
              variant='secondary'
              type='button'
              icon={Plus}
              iconPosition='left'
              onClick={() => setShowAddModal(true)}
              disabled={seatLimit && memberCount >= seatLimit}
            >
              Add Member
            </Button>
          </div>
        </div>

        <MuiCustomStylesForDataGrid />
        <div className='mt-2'>
          <DataGrid
            rows={members}
            columns={teamMemberColumns}
            loading={isTeamLoading}
            getRowId={(row) => String(row.member_id ?? row._id)}
            autoHeight
            rowHeight={72}
            hideFooter
            disableRowSelectionOnClick
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
            }
            sx={MANAGE_PLAN_TABLE_SX}
            localeText={{ noRowsLabel: 'No team members' }}
          />
        </div>
      </StyledCard>

      {isPaidPlan && (
        <StyledCard padding={2} extraStyles='w-full'>
          <div className='mb-6'>
            <h3>Payment History</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              View and download your past invoices
            </p>
          </div>

          <MuiCustomStylesForDataGrid />
          <div className='mt-2'>
            <DataGrid
              rows={paymentHistory}
              columns={paymentHistoryColumns}
              getRowId={(row) => row.id}
              autoHeight
              rowHeight={72}
              hideFooter
              disableRowSelectionOnClick
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
              }
              sx={MANAGE_PLAN_TABLE_SX}
              localeText={{ noRowsLabel: 'No payment history' }}
            />
          </div>
        </StyledCard>
      )}

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

      {showBuySeatsModal && createPortal(
        <div className='fixed z-50 inset-0 flex justify-center items-center bg-background-overlay bg-black/20'>
          <StyledCard
            padding={3}
            backgroundColor='bg-background-90'
            extraStyles='relative w-full max-w-xl mx-4'
          >
            <div
              onClick={() => setShowBuySeatsModal(false)}
              className='absolute top-4 right-4 z-10 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
            >
              <IconWrapper icon={X} size={0} />
            </div>

            <div className='flex flex-col gap-6'>
              <div>
                <h3 className='mb-1 pr-10'>Buy more seats</h3>
                <p className='typography-body text-font-gray'>How many seats do you want to buy?</p>
                <p className='typography-small-p text-font-gray mt-1'>
                  You can add as many seats as you want.
                </p>
              </div>

              <div className='flex items-center gap-2 w-fit'>
                <button
                  type='button'
                  onClick={() => setSeatsToBuy((count) => count + 1)}
                  className='bg-background-70 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-80 shrink-0'
                  aria-label='Increase seats'
                >
                  <IconWrapper icon={Plus} inheritColor size={0} customIconSize={3} />
                </button>
                <input
                  type='number'
                  min={1}
                  value={seatsToBuy}
                  onChange={(e) => setSeatsToBuy(Math.max(1, Number(e.target.value) || 1))}
                  className='no-spinner w-28 h-11 rounded-xl bg-background-80 typography-body text-font-main text-center outline-none'
                />
                <button
                  type='button'
                  onClick={() => setSeatsToBuy((count) => Math.max(1, count - 1))}
                  className='bg-background-70 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-80 shrink-0'
                  aria-label='Decrease seats'
                >
                  <IconWrapper icon={Minus} inheritColor size={0} customIconSize={3} />
                </button>
              </div>

              <StyledCard
                padding={4}
                backgroundColor='bg-background-100'
                extraStyles='w-full flex flex-col gap-6'
              >
                <div className='grid grid-cols-2 divide-x divide-divider-100'>
                  <div className='flex flex-col items-center justify-center text-center px-8 py-4'>
                    <p className='typography-small-p text-font-gray mb-2'>Your current price</p>
                    <span className='font-bricolage font-bold text-5xl text-font-main'>${proMonthlyCost}</span>
                  </div>
                  <div className='flex flex-col items-center justify-center text-center px-8 py-4'>
                    <p className='typography-small-p text-font-gray mb-2'>Your revised price</p>
                    <span className='font-bricolage font-bold text-5xl text-teal-100'>${revisedMonthlyCost}</span>
                  </div>
                </div>
                <div className='flex flex-col items-center gap-4'>
                  <Button
                    variant='primary'
                    type='button'
                    onClick={handleBuySeatsContinue}
                  >
                    Continue
                  </Button>
                  <p className='typography-small-p text-font-gray text-center max-w-xs'>
                    The revised price will take effect in your next billing cycle, starting on {PRO_BILLING_EFFECTIVE_DATE}.
                  </p>
                </div>
              </StyledCard>
            </div>
          </StyledCard>
        </div>,
        document.body
      )}

      <Modal
        open={showRemoveSeatsModal}
        onClose={() => setShowRemoveSeatsModal(false)}
        onConfirm={() => {
          // TODO: wire to billing API
          showSuccessToast('Success', 'Seat removal request submitted.')
          setShowRemoveSeatsModal(false)
        }}
        customTitle='Remove seats'
        customMessage='Reduce the number of licenses on your plan. Changes apply at the next billing cycle.'
        customConfirmLabel='Remove seats'
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
        cancelVariant='tertiary'
        isReadyToClose={false}
        showCloseIcon
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

      {showEnterpriseModal && (
        <EnterpriseContactModal onClose={() => setShowEnterpriseModal(false)} />
      )}

    </Container>
  )
}

export default ManagePlan
