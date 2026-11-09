export const TRIAL_TOTAL_DAYS = 21

const startOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export const resolveTrialEndsAt = (user) => {
  const fromUser = user?.companyDetails?.subscription?.trialEndsAt
  if (fromUser) return startOfDay(new Date(fromUser))
  return null
}

export const getTrialStatus = (user) => {
  const trialEndsAt = resolveTrialEndsAt(user)
  if (!trialEndsAt) {
    return {
      daysLeft: 0,
      dayCurrent: 0,
      totalDays: TRIAL_TOTAL_DAYS,
      isActive: false,
      statusLabel: 'No trial',
      daysRemainingLabel: '0 days',
      progressLabel: 'Day 0/21',
      bannerTitle: '',
      trialEndsAt: null,
    }
  }
  const today = startOfDay(new Date())
  const msPerDay = 24 * 60 * 60 * 1000
  const daysLeft = Math.max(0, Math.round((trialEndsAt - today) / msPerDay))
  const dayCurrent = daysLeft > 0
    ? Math.min(TRIAL_TOTAL_DAYS, TRIAL_TOTAL_DAYS - daysLeft + 1)
    : TRIAL_TOTAL_DAYS
  const isActive = daysLeft > 0
  return {
    daysLeft,
    dayCurrent,
    totalDays: TRIAL_TOTAL_DAYS,
    isActive,
    statusLabel: isActive ? 'Trial Active' : 'Inactive',
    daysRemainingLabel: daysLeft === 0 ? '0 days' :
      daysLeft === 1 ? '1 day' : `${daysLeft} days`,
    progressLabel: `Day ${dayCurrent}/${TRIAL_TOTAL_DAYS}`,
    bannerTitle: daysLeft === 0 ? 'Your trial has ended' :
      daysLeft === 1 ? '1 day left in your trial' :
      `${daysLeft} days left in your trial`,
    trialEndsAt,
  }
}
