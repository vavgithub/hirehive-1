export const TRIAL_TOTAL_DAYS = 21
const TRIAL_ENDS_AT_KEY = 'geode_trial_ends_at'
const DEFAULT_DAYS_LEFT = 18

const startOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export const resolveTrialEndsAt = (user) => {
  const fromUser = user?.companyDetails?.trialEndsAt || user?.trialEndsAt
  if (fromUser) return startOfDay(new Date(fromUser))

  const stored = localStorage.getItem(TRIAL_ENDS_AT_KEY)
  if (stored) return startOfDay(new Date(stored))

  const end = startOfDay(new Date())
  end.setDate(end.getDate() + DEFAULT_DAYS_LEFT)
  localStorage.setItem(TRIAL_ENDS_AT_KEY, end.toISOString())
  return end
}

export const startTrialPeriod = (totalDays = TRIAL_TOTAL_DAYS) => {
  const end = startOfDay(new Date())
  end.setDate(end.getDate() + totalDays)
  localStorage.setItem(TRIAL_ENDS_AT_KEY, end.toISOString())
  return end
}

export const getTrialStatus = (user) => {
  const trialEndsAt = resolveTrialEndsAt(user)
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
    daysRemainingLabel: daysLeft === 0
      ? '0 days'
      : daysLeft === 1
        ? '1 day'
        : `${daysLeft} days`,
    progressLabel: `Day ${dayCurrent}/${TRIAL_TOTAL_DAYS}`,
    bannerTitle: daysLeft === 0
      ? 'Your trial has ended'
      : daysLeft === 1
        ? '1 day left in your trial'
        : `${daysLeft} days left in your trial`,
    trialEndsAt,
  }
}
