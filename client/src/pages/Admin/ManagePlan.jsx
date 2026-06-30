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
import { addMember, getAdminDashboard, getAllTeamMembers, removeTeamMember } from '../../services/admin.service'
import {
  createBillingPortalSession,
  createCheckoutSession,
  getInvoices,
  getPaymentMethod,
  listPaymentMethods,
  setDefaultPaymentMethod,
  getSubscription,
  confirmCheckoutSession,
  previewSeatChange,
  updateSeats,
} from '../../services/billing.service'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import { emailPattern } from '../../components/Register/RegisterForm'
import { roleOptions } from '../../components/Register/AddMembers'
import { useAuthContext } from '../../context/AuthProvider'
import { getRoute, ROUTE_KEY } from '../../config/permissions.config'
import { Users, Mail, Circle, Plus, Edit2, Trash2, ChevronDown, UserCog, Search, Clock, ExternalLink, Download, CreditCard, CalendarDays, DollarSign, X } from 'lucide-react'
import IconWrapper from '../../components/Cards/IconWrapper'
import SeatStepper from '../../components/ui/SeatStepper'
import ConsentCheckbox from '../../components/Checkboxes/ConsentCheckbox'
import PaymentMethodPicker from '../../components/ui/PaymentMethodPicker'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LoaderModal from '../../components/Loaders/LoaderModal'
import StatsGrid from '../../components/ui/StatsGrid'
import { useUnknownProfilePicture } from '../../context/ThemeContext'
import AssessmentBanner from '../../components/ui/AssessmentBanner'
import EnterpriseContactModal from '../../components/Register/EnterpriseContactModal'
import StatusBadge from '../../components/ui/StatusBadge'
import CustomToolTip from '../../components/Tooltip/CustomToolTip'
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
    seatLimit: null,
    appLimit: null,
    statusLabel: 'Active',
    isPaid: true,
  },
  enterprise: {
    label: 'Enterprise Plan',
    description: 'Your enterprise subscription overview',
    seatLimit: null,
    appLimit: null,
    statusLabel: 'Active',
    isPaid: true,
  },
}

const MIN_PRO_SEATS = 1
const PRO_SEAT_PRICE = { monthly: 19, yearly: 180 }
// Per-seat monthly-equivalent shown as "per seat" in summaries.
const calculateBillingAmount = (workspaceSeats, interval) => {
  const perSeat = interval === 'yearly' ? PRO_SEAT_PRICE.yearly : PRO_SEAT_PRICE.monthly
  return Math.max(MIN_PRO_SEATS, workspaceSeats) * perSeat
}

const formatBillDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
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
    overflow: 'hidden',
  },
  '& .MuiDataGrid-row': {
    cursor: 'default',
  },
  '& .MuiDataGrid-virtualScroller': {
    borderRadius: '0.75rem !important',
    marginBottom: '0px !important',
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

function ManagePlan() {
  const { user } = useAuthContext()
  const trialStatus = useTrialStatus()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const queryClient = useQueryClient()
  const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture()
  const isAdmin = user?.role === 'Admin'

  const { data: subscriptionResponse, refetch: refetchSubscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    enabled: isAdmin,
    placeholderData: (previousData) => previousData,
  })

  const subscription = subscriptionResponse?.data ?? {}

  const currentPlan = subscription?.plan || 'free'
  const plan = PLAN_CONFIG[currentPlan] || PLAN_CONFIG.free
  const pricingRoute = user?.role ? getRoute(user.role, ROUTE_KEY.PRICING) : null
  const pricingPath = pricingRoute ? `${pricingRoute}?plan=${currentPlan}` : null

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
  const [seatPreview, setSeatPreview] = useState(null)
  const [seatsToBuy, setSeatsToBuy] = useState(1)
  const [buySeatsAgree, setBuySeatsAgree] = useState(false)
  const [showRemoveSeatsModal, setShowRemoveSeatsModal] = useState(false)
  const [removeSeatsStep, setRemoveSeatsStep] = useState(1)
  const [seatsToRemove, setSeatsToRemove] = useState(1)
  const [removeSeatPreview, setRemoveSeatPreview] = useState(null)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null)
  const changeAdminMenuRef = useRef(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return

    const finalizeCheckout = async () => {
      try {
        await confirmCheckoutSession({ sessionId })
        queryClient.invalidateQueries({ queryKey: ['auth'] })
        queryClient.invalidateQueries({ queryKey: ['subscription'] })
        queryClient.invalidateQueries({ queryKey: ['billing_invoices'] })
        queryClient.invalidateQueries({ queryKey: ['billing_payment_method'] })
        await refetchSubscription()
        showSuccessToast('Success', 'Welcome to Geode Pro!')
      } catch (error) {
        showErrorToast(
          'Error',
          error?.response?.data?.message || 'Payment succeeded but plan sync failed. Refresh the page or contact support.'
        )
      } finally {
        const url = new URL(window.location.href)
        url.searchParams.delete('session_id')
        window.history.replaceState({}, '', url.toString())
      }
    }

    finalizeCheckout()
  }, [])

  const { data: teamData, isLoading: isTeamLoading } = useQuery({
    queryKey: ['team_members'],
    queryFn: getAllTeamMembers,
  })

  const { data: dashboardDetails } = useQuery({
    queryKey: ['admin_dashboard', timezone],
    queryFn: () => getAdminDashboard(timezone),
    enabled: isAdmin,
  })

  const { data: invoicesResponse, isLoading: isInvoicesLoading } = useQuery({
    queryKey: ['billing_invoices'],
    queryFn: getInvoices,
    enabled: isAdmin && (currentPlan === 'pro' || (currentPlan === 'enterprise' && Boolean(subscription?.stripeCustomerId))),
  })

  const { data: paymentMethodResponse } = useQuery({
    queryKey: ['billing_payment_method'],
    queryFn: getPaymentMethod,
    enabled: isAdmin && (currentPlan === 'pro' || (currentPlan === 'enterprise' && Boolean(subscription?.stripeCustomerId))),
  })

  const { data: paymentMethodsResponse } = useQuery({
    queryKey: ['billing_payment_methods'],
    queryFn: listPaymentMethods,
    enabled: isAdmin && (currentPlan === 'pro' || (currentPlan === 'enterprise' && Boolean(subscription?.stripeCustomerId))),
  })

  const usedSeats = teamData?.members?.length || 0
  const memberCount = usedSeats + 1
  const billingInterval = subscription?.billingInterval || 'monthly'
  const pricePerSeat = subscription?.pricePerSeat
    ?? (billingInterval === 'yearly' ? PRO_SEAT_PRICE.yearly : PRO_SEAT_PRICE.monthly)
  const contractedSeats = subscription?.seatCount || 0
  const hasStripeBilling = Boolean(subscription?.stripeCustomerId)
  const isEnterpriseUnlimited = currentPlan === 'enterprise' && contractedSeats <= 0

  const licensedSeats = currentPlan === 'pro'
    ? Math.max(contractedSeats, memberCount)
    : currentPlan === 'enterprise' && contractedSeats > 0
      ? Math.max(contractedSeats, memberCount)
      : null
  const seatLimit = currentPlan === 'free'
    ? plan.seatLimit
    : isEnterpriseUnlimited
      ? null
      : licensedSeats

  const monthlyAppCount = useMemo(() => {
    const monthly = dashboardDetails?.applications?.monthlyApplications
    if (!monthly?.length) return 0
    return monthly[monthly.length - 1]?.totalCount ?? 0
  }, [dashboardDetails])

  const totalAppCount = dashboardDetails?.applications?.totalApplicationsCount ?? 0
  const usedApps = currentPlan === 'free' ? monthlyAppCount : totalAppCount

  const nextBillDate = formatBillDate(subscription?.currentPeriodEnd)

  const dataRetentionEndsAt = subscription?.dataRetentionEndsAt
  const isInDataRetention = currentPlan === 'pro'
    && !subscription?.stripeSubscriptionId
    && Boolean(dataRetentionEndsAt)
    && new Date(dataRetentionEndsAt) > new Date()
  const dataRetentionDate = formatBillDate(dataRetentionEndsAt)

  const paymentHistory = invoicesResponse?.data ?? []
  const paymentMethod = paymentMethodResponse?.data
  const paymentMethods = paymentMethodsResponse?.data ?? []
  const defaultPaymentMethod =
    paymentMethods.find((m) => m.isDefault) || paymentMethods[0] || null
  const selectedPaymentMethod =
    paymentMethods.find((m) => m.id === selectedPaymentMethodId) || defaultPaymentMethod
  const isPaidPlan = currentPlan === 'pro' || currentPlan === 'enterprise'
  const showStripeBilling = currentPlan === 'pro' || (currentPlan === 'enterprise' && hasStripeBilling)
  const billingAmount = subscription?.billingAmount
    ?? calculateBillingAmount(Math.max(contractedSeats, memberCount, MIN_PRO_SEATS), billingInterval)
  const proSeatsAvailable = seatLimit ? Math.max(seatLimit - memberCount, 0) : 0
  const enterpriseSeatsAvailable = seatLimit ? Math.max(seatLimit - memberCount, 0) : 0
  const enterpriseCostTitle = billingInterval === 'yearly' ? 'Annual Cost' : 'Monthly Cost'
  const enterpriseBillingCycleValue = subscription?.currentPeriodEnd
    ? (billingInterval === 'yearly' ? 'Yearly' : 'Monthly')
    : 'Contract'
  const enterpriseBillingCycleDetail = subscription?.currentPeriodEnd
    ? (subscription?.cancelAtPeriodEnd
      ? `Cancels on ${nextBillDate}`
      : `Next bill: ${nextBillDate}`)
    : 'Managed by your account team'
  const teamSeatsSubtitle = (() => {
    if (currentPlan === 'pro' && seatLimit) {
      return `Manage who has access to your Geode workspace (${memberCount}/${seatLimit} seats used)`
    }
    if (currentPlan === 'enterprise' && seatLimit) {
      return `Manage who has access to your Geode workspace (${memberCount}/${seatLimit} seats used)`
    }
    return 'Manage who has access to your Geode workspace'
  })()
  const buyCurrentSeats = licensedSeats || Math.max(memberCount, MIN_PRO_SEATS)
  const buyTotalSeats = buyCurrentSeats + seatsToBuy
  const buyCurrentPlanCost = Math.round(calculateBillingAmount(buyCurrentSeats, billingInterval))
  const buyNewTotalCost = Math.round(calculateBillingAmount(buyTotalSeats, billingInterval))
  const buyAdditionalCost = buyNewTotalCost - buyCurrentPlanCost
  const renewalIntervalSuffix = billingInterval === 'yearly' ? '/yr' : '/mo'
  const renewalTotalLabel = billingInterval === 'yearly' ? 'New yearly total' : 'New monthly total'
  const perSeatIntervalLabel = billingInterval === 'yearly' ? 'year' : 'month'

  const maxSeatsToRemove = licensedSeats
    ? Math.max(licensedSeats - memberCount, 0)
    : 0
  const revisedBillingAfterRemoval = calculateBillingAmount(
    Math.max((licensedSeats || MIN_PRO_SEATS) - seatsToRemove, MIN_PRO_SEATS),
    billingInterval
  )

  const planStatusLabel = isInDataRetention
    ? `Access ends ${dataRetentionDate}`
    : subscription?.cancelAtPeriodEnd
      ? 'Cancels at period end'
      : subscription?.status === 'past_due'
        ? 'Past due'
        : plan.statusLabel

  useEffect(() => {
    if (showBuySeatsModal) {
      setSeatsToBuy(1)
      setSeatPreview(null)
      setBuySeatsAgree(false)
    }
  }, [showBuySeatsModal])

  useEffect(() => {
    if (showRemoveSeatsModal) {
      setSeatsToRemove(1)
      setRemoveSeatsStep(1)
      setRemoveSeatPreview(null)
    }
  }, [showRemoveSeatsModal])

  const closeBuySeatsModal = () => {
    setShowBuySeatsModal(false)
    setSeatPreview(null)
    setBuySeatsAgree(false)
  }

  const closeRemoveSeatsModal = () => {
    setShowRemoveSeatsModal(false)
    setRemoveSeatsStep(1)
    setSeatsToRemove(1)
    setRemoveSeatPreview(null)
  }

  const previewSeatChangeMutation = useMutation({
    mutationFn: previewSeatChange,
    onSuccess: (data) => {
      setSeatPreview(data?.data)
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to preview seat change.')
    },
  })

  const previewRemoveSeatsMutation = useMutation({
    mutationFn: previewSeatChange,
    onSuccess: (data) => {
      setRemoveSeatPreview(data?.data)
      setRemoveSeatsStep(2)
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to preview seat change.')
    },
  })

  const createCheckoutSessionMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to start checkout.')
    }
  })

  const updateSeatsMutation = useMutation({
    mutationFn: updateSeats,
    onSuccess: async (data) => {
      if (data?.data) {
        queryClient.setQueryData(['subscription'], { status: 'success', data: data.data })
      }
      await refetchSubscription()
      queryClient.invalidateQueries({ queryKey: ['billing_invoices'] })
      queryClient.invalidateQueries({ queryKey: ['billing_payment_method'] })
      showSuccessToast('Success', data?.message || 'Seats updated successfully.')
      closeBuySeatsModal()
      closeRemoveSeatsModal()
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to update seats.')
    }
  })

  const billingPortalMutation = useMutation({
    mutationFn: createBillingPortalSession,
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to open billing portal.')
    }
  })

  const setDefaultPaymentMethodMutation = useMutation({
    mutationFn: setDefaultPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing_payment_method'] })
      queryClient.invalidateQueries({ queryKey: ['billing_payment_methods'] })
    },
    onError: (error) => {
      showErrorToast('Error',
        error?.response?.data?.message || 'Failed to update payment method.')
    }
  })

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethodId(method.id)
    if (!method.isDefault) {
      setDefaultPaymentMethodMutation.mutate({ paymentMethodId: method.id })
    }
  }

  const previewSeatChangeMutate = previewSeatChangeMutation.mutate

  useEffect(() => {
    if (!showBuySeatsModal || currentPlan !== 'pro') return
    const handle = setTimeout(() => {
      previewSeatChangeMutate({ seatCount: buyTotalSeats })
    }, 450)
    return () => clearTimeout(handle)
  }, [showBuySeatsModal, currentPlan, buyTotalSeats, previewSeatChangeMutate])

  const handleConfirmBuySeats = () => {
    if (!buyTotalSeats || !buySeatsAgree) return
    updateSeatsMutation.mutate({ seatCount: buyTotalSeats })
  }

  const handleRemoveSeatsContinue = () => {
    if (!licensedSeats || maxSeatsToRemove < 1) {
      showErrorToast('Error', `You cannot reduce seats below ${memberCount} active members.`)
      return
    }

    const newSeatCount = licensedSeats - seatsToRemove

    if (removeSeatsStep === 1) {
      previewRemoveSeatsMutation.mutate({ seatCount: newSeatCount })
      return
    }

    if (removeSeatPreview?.newSeatCount) {
      updateSeatsMutation.mutate({ seatCount: removeSeatPreview.newSeatCount })
    }
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
            title: billingInterval === 'yearly' ? 'Annual Cost' : 'Monthly Cost',
            value: `$${Math.round(billingAmount)}`,
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={DollarSign} />,
            statistics: {
              monthly: billingInterval === 'yearly'
                ? `${licensedSeats || memberCount} seat${(licensedSeats || memberCount) > 1 ? 's' : ''} · $${PRO_SEAT_PRICE.yearly}/seat per year`
                : `${licensedSeats || memberCount} seat${(licensedSeats || memberCount) > 1 ? 's' : ''} · $${PRO_SEAT_PRICE.monthly}/seat per month`,
            },
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
            value: billingInterval === 'yearly' ? 'Yearly' : 'Monthly',
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={CalendarDays} />,
            statistics: {
              monthly: subscription?.cancelAtPeriodEnd
                ? `Cancels on ${nextBillDate}`
                : `Next bill: ${nextBillDate}`,
            },
          },
        ]
      : currentPlan === 'enterprise'
        ? [
            {
              title: subscription?.billingAmount ? enterpriseCostTitle : 'Contract Cost',
              value: subscription?.billingAmount
                ? `$${Math.round(subscription.billingAmount)}`
                : 'Custom',
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={DollarSign} />,
              statistics: {
                monthly: subscription?.billingAmount
                  ? (billingInterval === 'yearly' ? 'Annual contract' : 'Monthly contract')
                  : 'Contact sales for pricing',
              },
            },
            {
              title: 'Team Seats',
              value: isEnterpriseUnlimited ? memberCount : `${memberCount}/${seatLimit}`,
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
              statistics: {
                monthly: isEnterpriseUnlimited
                  ? 'Unlimited seats'
                  : `${enterpriseSeatsAvailable} available`,
              },
            },
            {
              title: 'Applications',
              value: usedApps,
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Mail} />,
              statistics: { monthly: 'Unlimited' },
            },
            {
              title: 'Billing Cycle',
              value: enterpriseBillingCycleValue,
              icon: () => <IconWrapper size={10} isTeritiaryIcon icon={CalendarDays} />,
              statistics: { monthly: enterpriseBillingCycleDetail },
            },
          ]
        : [
          {
            title: 'Team Seats',
            value: seatLimit ? `${memberCount}/${seatLimit}` : memberCount,
            icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />,
            statistics: seatLimit ? {
              monthly: `${Math.max(seatLimit - memberCount, 0)} available`,
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
            statistics: { monthly: planStatusLabel },
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
        <CustomToolTip title={params.value} arrowed>
          <p className='typography-body text-font-main truncate w-full min-w-0'>
            {params.value}
          </p>
        </CustomToolTip>
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
              if (params.row.invoiceUrl) {
                window.open(params.row.invoiceUrl, '_blank', 'noopener,noreferrer')
              } else {
                showErrorToast('Error', 'Invoice PDF is not available yet.')
              }
            }}
            className={`bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80 ${params.row.invoiceUrl ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            aria-label='Download invoice'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && params.row.invoiceUrl) {
                window.open(params.row.invoiceUrl, '_blank', 'noopener,noreferrer')
              }
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
      {(addMemberMutation?.isPending || removeMemberMutation?.isPending || isTeamLoading || updateSeatsMutation.isPending || createCheckoutSessionMutation.isPending || billingPortalMutation.isPending || previewRemoveSeatsMutation.isPending) && <LoaderModal />}

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

        {isInDataRetention && (
          <StyledCard
            padding={2}
            backgroundColor='bg-background-100'
            extraStyles='mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-divider-100'
          >
            <div className='flex gap-3'>
              <IconWrapper icon={Clock} inheritColor size={0} customIconSize={3} className='text-font-gray flex-shrink-0 mt-0.5' />
              <div>
                <p className='typography-body text-font-main'>Your Pro subscription has been cancelled</p>
                <p className='typography-small-p text-font-gray mt-1'>
                  You can review, export, or back up your data until {dataRetentionDate}. After that, your workspace moves to the Free plan.
                </p>
              </div>
            </div>
            <Button
              variant='primary'
              type='button'
              onClick={() => pricingPath && navigate(pricingPath)}
            >
              Resubscribe
            </Button>
          </StyledCard>
        )}

        <StatsGrid stats={stats} equalWidth={currentPlan === 'trial'} />

        {currentPlan === 'pro' && (
          <div className='flex flex-wrap items-center gap-3 mt-6'>
            <Button
              variant='tertiary'
              type='button'
              icon={ExternalLink}
              iconPosition='left'
              onClick={() => pricingPath && navigate(pricingPath)}
            >
              View Plans
            </Button>
            {!isInDataRetention && (
              <>
                <Button
                  variant='secondary'
                  type='button'
                  onClick={() => setShowRemoveSeatsModal(true)}
                  disabled={!licensedSeats || licensedSeats <= memberCount}
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
              </>
            )}
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
              onClick={() => pricingPath && navigate(pricingPath)}
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
          <StyledCard padding={2} backgroundColor='bg-background-100' extraStyles='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <p className='typography-body text-font-gray'>
              Need help with your enterprise plan? Contact our team for dedicated support.
            </p>
            <Button
              variant='secondary'
              type='button'
              onClick={() => setShowEnterpriseModal(true)}
            >
              Contact support
            </Button>
          </StyledCard>
        </StyledCard>
      )}

      {showStripeBilling && (
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
              onClick={() => billingPortalMutation.mutate()}
              disabled={billingPortalMutation.isPending}
            >
              Update
            </Button>
          </div>
          <StyledCard padding={2} backgroundColor='bg-background-100' extraStyles='flex items-center gap-4 mt-4'>
            <div className='w-12 h-12 rounded-xl bg-background-80 flex items-center justify-center shrink-0'>
              <IconWrapper icon={CreditCard} inheritColor size={0} customIconSize={4} className='text-font-gray' />
            </div>
            {paymentMethod?.last4 ? (
              <div>
                <p className='typography-body text-font-main'>
                  {paymentMethod.brand} ending in {paymentMethod.last4}
                </p>
                <p className='typography-small-p text-font-gray mt-0.5'>
                  Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                </p>
              </div>
            ) : (
              <p className='typography-body text-font-gray'>No payment method on file</p>
            )}
          </StyledCard>
        </StyledCard>
      )}

      {currentPlan === 'enterprise' && !hasStripeBilling && (
        <StyledCard padding={2} extraStyles='w-full mb-4'>
          <div className='mb-4'>
            <h3>Billing</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              Enterprise billing and invoices
            </p>
          </div>
          <StyledCard padding={2} backgroundColor='bg-background-100' extraStyles='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <p className='typography-body text-font-gray'>
              Your billing is managed by our team. Invoices and payment updates will be shared directly with you.
            </p>
            <Button
              variant='secondary'
              type='button'
              onClick={() => setShowEnterpriseModal(true)}
            >
              Contact support
            </Button>
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
          onButtonClick={() => pricingPath && navigate(pricingPath)}
        />
      )}

      {/* Team Members */}
      <StyledCard padding={2} extraStyles={`w-full ${isPaidPlan ? 'mb-4' : ''}`}>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h3>Team Members</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              {teamSeatsSubtitle}
            </p>
          </div>
          <div className='flex items-center gap-3 flex-wrap justify-end'>
            {(currentPlan === 'trial' || currentPlan === 'pro' || currentPlan === 'enterprise') && (
              <>
                <span className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider px-4 py-1 bg-background-80 text-font-gray border border-divider-100'>
                  {memberCount} users
                </span>
                <span className='w-fit font-bricolage text-sm rounded-full font-medium tracking-wider px-4 py-1 bg-background-80 text-font-gray border border-divider-100'>
                  {currentPlan === 'trial' || isEnterpriseUnlimited
                    ? 'Unlimited seats'
                    : `${seatLimit} seats`}
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
        <div className='mt-2 rounded-xl overflow-hidden'>
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

      {showStripeBilling && (
        <StyledCard padding={2} extraStyles='w-full'>
          <div className='mb-6'>
            <h3>Payment History</h3>
            <p className='typography-small-p text-font-gray mt-1'>
              View and download your past invoices
            </p>
          </div>

          <MuiCustomStylesForDataGrid />
          <div className='mt-2 rounded-xl overflow-hidden'>
            <DataGrid
              rows={paymentHistory}
              columns={paymentHistoryColumns}
              loading={isInvoicesLoading}
              getRowId={(row) => row.id}
              autoHeight
              rowHeight={72}
              hideFooter
              disableRowSelectionOnClick
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
              }
              sx={MANAGE_PLAN_TABLE_SX}
              localeText={{ noRowsLabel: 'No invoices yet' }}
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
        <div className='fixed z-50 inset-0 flex justify-center items-center bg-background-overlay bg-black/20 p-4'>
          <StyledCard
            padding={2}
            backgroundColor='bg-background-90'
            extraStyles='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto'
          >
            <div
              onClick={closeBuySeatsModal}
              className='absolute top-4 right-4 z-10 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
            >
              <IconWrapper icon={X} size={0} />
            </div>

            <div className='flex flex-col gap-5'>
              <div>
                <h3 className='mb-1 pr-10'>Add more seats</h3>
                <p className='typography-body text-font-gray'>
                  You'll only pay a prorated amount for the remaining days in this billing cycle.
                </p>
              </div>

              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'>
                  <StyledCard
                    padding={3}
                    backgroundColor='bg-background-80'
                    extraStyles='w-full flex flex-col gap-4'
                  >
                    <p className='typography-body text-font-gray text-center'>How many seats to add?</p>

                    <SeatStepper
                      value={seatsToBuy}
                      onChange={setSeatsToBuy}
                      min={1}
                      helperText={`$${pricePerSeat} per seat / ${perSeatIntervalLabel}`}
                    />

                    <div className='flex flex-col gap-3 pt-2'>
                      <div className='flex justify-between items-center'>
                        <span className='typography-body text-font-gray'>Current seats</span>
                        <span className='typography-body text-font-main'>{buyCurrentSeats}</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='typography-body text-font-gray'>Additional seats</span>
                        <span className='typography-body text-font-main'>{seatsToBuy}</span>
                      </div>
                      <div className='flex justify-between items-center pt-2 border-t border-divider-100'>
                        <span className='typography-body font-semibold text-font-main'>Total seats</span>
                        <span className='typography-body font-semibold text-font-main'>{buyTotalSeats}</span>
                      </div>
                    </div>
                  </StyledCard>

                  <div className='flex flex-col gap-4'>
                    <StyledCard
                      padding={3}
                      backgroundColor='bg-background-100'
                      extraStyles='w-full flex flex-col gap-1'
                    >
                      <p className='typography-body text-font-main'>
                        Due today <span className='text-font-gray'>(One-time)</span>
                      </p>
                      <span className={`font-bricolage font-bold text-4xl text-teal-100 ${previewSeatChangeMutation.isPending ? 'opacity-50' : ''}`}>
                        {seatPreview?.dueToday ?? '—'}
                      </span>
                      <p className='typography-small-p text-font-gray mt-1'>
                        Prorated charge for the remaining days in your current billing cycle.
                      </p>
                    </StyledCard>

                    <StyledCard
                      padding={3}
                      backgroundColor='bg-background-80'
                      extraStyles='w-full flex flex-col gap-3 flex-1'
                    >
                      <p className='typography-body text-font-main'>For next renewal</p>
                      <div className='flex justify-between items-center'>
                        <span className='typography-body text-font-gray'>Current plan</span>
                        <span className='typography-body text-font-main'>${buyCurrentPlanCost}{renewalIntervalSuffix}</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='typography-body text-font-gray'>
                          {seatsToBuy} additional seat{seatsToBuy > 1 ? 's' : ''}
                        </span>
                        <span className='typography-body text-font-main'>${buyAdditionalCost}{renewalIntervalSuffix}</span>
                      </div>
                      <div className='flex justify-between items-center pt-2 border-t border-divider-100'>
                        <span className='typography-body font-semibold text-font-main'>{renewalTotalLabel}</span>
                        <span className='typography-body font-semibold text-font-main'>${buyNewTotalCost}{renewalIntervalSuffix}</span>
                      </div>
                      <p className='typography-small-p text-font-gray mt-1'>
                        This total applies automatically from your next billing cycle.
                      </p>
                    </StyledCard>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'>
                  <div className='flex items-center px-3 md:px-4'>
                    <ConsentCheckbox
                      id='buy-seats-agree'
                      checked={buySeatsAgree}
                      onChange={setBuySeatsAgree}
                      label='I authorize the charges shown above. My plan renews automatically, payments already made are non-refundable, and I can cancel anytime — Pro access stays until the end of the paid period.'
                    />
                  </div>

                  <PaymentMethodPicker
                    paymentMethods={paymentMethods}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onSelect={handleSelectPaymentMethod}
                    onAddPaymentMethod={() => billingPortalMutation.mutate()}
                    isUpdating={setDefaultPaymentMethodMutation.isPending}
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <Button
                  variant='primary'
                  type='button'
                  className='shrink-0'
                  onClick={handleConfirmBuySeats}
                  disabled={!buySeatsAgree || !seatPreview || previewSeatChangeMutation.isPending || updateSeatsMutation.isPending}
                >
                  {updateSeatsMutation.isPending ? 'Processing...' : 'Confirm and Pay'}
                </Button>
              </div>
            </div>
          </StyledCard>
        </div>,
        document.body
      )}

      {showRemoveSeatsModal && createPortal(
        <div className='fixed z-50 inset-0 flex justify-center items-center bg-background-overlay bg-black/20'>
          <StyledCard
            padding={3}
            backgroundColor='bg-background-90'
            extraStyles='relative w-full max-w-xl mx-4'
          >
            <div
              onClick={closeRemoveSeatsModal}
              className='absolute top-4 right-4 z-10 cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'
            >
              <IconWrapper icon={X} size={0} />
            </div>

            <div className='flex flex-col gap-6'>
              {removeSeatsStep === 1 ? (
                <>
                  <div>
                    <h3 className='mb-1 pr-10'>Remove seats</h3>
                    <p className='typography-body text-font-gray'>How many seats do you want to remove?</p>
                    <p className='typography-small-p text-font-gray mt-1'>
                      You can remove up to {maxSeatsToRemove} seat{maxSeatsToRemove !== 1 ? 's' : ''} ({memberCount} active members must remain).
                    </p>
                  </div>

                  <SeatStepper
                    value={seatsToRemove}
                    onChange={setSeatsToRemove}
                    min={1}
                    max={maxSeatsToRemove}
                    align='start'
                    incrementLabel='Increase seats to remove'
                    decrementLabel='Decrease seats to remove'
                  />

                  <StyledCard
                    padding={4}
                    backgroundColor='bg-background-100'
                    extraStyles='w-full flex flex-col gap-6'
                  >
                    <div className='grid grid-cols-2 divide-x divide-divider-100'>
                      <div className='flex flex-col items-center justify-center text-center px-8 py-4'>
                        <p className='typography-small-p text-font-gray mb-2'>Your current price</p>
                        <span className='font-bricolage font-bold text-5xl text-font-main'>${Math.round(billingAmount)}</span>
                      </div>
                      <div className='flex flex-col items-center justify-center text-center px-8 py-4'>
                        <p className='typography-small-p text-font-gray mb-2'>Your revised price</p>
                        <span className='font-bricolage font-bold text-5xl text-teal-100'>${Math.round(revisedBillingAfterRemoval)}</span>
                      </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                      <Button
                        variant='primary'
                        type='button'
                        onClick={handleRemoveSeatsContinue}
                      >
                        Review removal
                      </Button>
                      <p className='typography-small-p text-font-gray text-center max-w-xs'>
                        Licensed seats will go from {licensedSeats} to {licensedSeats - seatsToRemove}. A credit will be applied to your next invoice.
                      </p>
                    </div>
                  </StyledCard>
                </>
              ) : (
                <>
                  <div>
                    <h3 className='mb-1 pr-10'>Confirm seat removal</h3>
                    <p className='typography-body text-font-gray'>
                      Removing {seatsToRemove} seat{seatsToRemove > 1 ? 's' : ''} ({removeSeatPreview?.currentSeatCount} → {removeSeatPreview?.newSeatCount})
                    </p>
                  </div>

                  <StyledCard padding={4} backgroundColor='bg-background-100' extraStyles='w-full flex flex-col gap-4'>
                    <div className='flex justify-between items-center'>
                      <p className='typography-body text-font-gray'>Credit on next invoice</p>
                      <p className='font-bricolage font-bold text-2xl text-teal-100'>
                        {removeSeatPreview?.creditAmount || '—'}
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='typography-body text-font-gray'>Next invoice date</p>
                      <p className='typography-body text-font-main'>
                        {formatBillDate(removeSeatPreview?.nextBillDate || subscription?.currentPeriodEnd)}
                      </p>
                    </div>
                    <div className='flex justify-between items-center pt-2 border-t border-divider-100'>
                      <p className='typography-body text-font-gray'>New recurring total</p>
                      <p className='typography-body text-font-main'>{removeSeatPreview?.newRecurringAmount}</p>
                    </div>
                  </StyledCard>

                  <div className='flex flex-col items-center gap-4'>
                    <Button
                      variant='primary'
                      type='button'
                      onClick={handleRemoveSeatsContinue}
                    >
                      Confirm removal
                    </Button>
                    <Button
                      variant='tertiary'
                      type='button'
                      onClick={() => {
                        setRemoveSeatsStep(1)
                        setRemoveSeatPreview(null)
                      }}
                    >
                      Go back
                    </Button>
                    <p className='typography-small-p text-font-gray text-center max-w-sm'>
                      {removeSeatPreview?.creditAmount
                        ? `A credit of ${removeSeatPreview.creditAmount} will be applied to your next invoice on ${formatBillDate(removeSeatPreview.nextBillDate || subscription?.currentPeriodEnd)}.`
                        : 'A credit will be applied to your next invoice.'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </StyledCard>
        </div>,
        document.body
      )}

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
