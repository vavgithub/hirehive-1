import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { industryTypeOptions, LocationOptions } from '../../components/Register/CompanyDetails'
import { formatPhoneNumber } from '../../components/Form/PhoneInputField'
import { useAuthContext } from '../../context/AuthProvider'
import { useUnknownProfilePicture } from '../../context/ThemeContext'
import { getRoute, ROUTE_KEY } from '../../config/permissions.config'
import { getAdminDashboard, getAdminDashboardSecondary } from '../../services/admin.service'
import { formatIntoDateString } from '../../utility/formatTime'
import { formatUTCToLocalTimeAuto, timezone, UTCToDateFormatted } from '../../utility/timezoneConverter'
import GeodeDashboard from './dashboard/GeodeDashboard'

function displayOrDash(value) {
  if (value === undefined || value === null || value === '' || value === 0) return '-'
  return value
}

function applicationSeries(details, period) {
  const applications = details?.applications
  if (!applications) return []
  if (period === 'weekly') return applications.weeklyApplications ?? []
  if (period === 'daily') return applications.dailyApplications ?? []
  if (period === 'yesterday') return applications.yesterdaysApplications ?? []
  return applications.monthlyApplications ?? []
}

function AdminDashboard() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const unknownProfilePicture = useUnknownProfilePicture()
  const [period, setPeriod] = useState('monthly')

  const { data: dashboardDetails, isLoading: isPrimaryLoading } = useQuery({
    queryKey: ['admin_dashboard'],
    queryFn: () => getAdminDashboard(timezone),
    refetchOnWindowFocus: false,
  })

  const { data: dashboardSecondaryDetails, isLoading: isSecondaryLoading } = useQuery({
    queryKey: ['admin_dashboard_secondary'],
    queryFn: () => getAdminDashboardSecondary(),
    refetchOnWindowFocus: false,
  })

  const companyDetails = dashboardDetails?.companyDetails
  const locationLabel = (companyDetails?.location && companyDetails?.geoLocation)
    ? companyDetails.location
    : LocationOptions.find((item) => item.value === companyDetails?.location)?.label
  const industryLabel = industryTypeOptions.find((item) => item.value === companyDetails?.industryType)?.label

  const model = useMemo(() => {
    const upcomingInterviews = (dashboardDetails?.interviews?.upcomingInterviews ?? []).map((interview) => ({
      id: interview?._id,
      stage: interview?.jobApplications?.currentStage || 'Scheduled',
      when: `${UTCToDateFormatted(interview?.scheduledDate)} at ${formatUTCToLocalTimeAuto(interview?.scheduledDate)}`,
      candidate: `${interview?.firstName ?? ''} ${interview?.lastName ?? ''}`.trim(),
      reviewer: `${interview?.assignee?.firstName ?? ''} ${interview?.assignee?.lastName ?? ''}`.trim(),
      reviewerRole: interview?.assignee?.role || 'Design Reviewer',
      candidateId: interview?._id,
      jobId: interview?.jobApplications?.jobId,
    }))

    const jobs = (dashboardSecondaryDetails?.jobsWithStats ?? []).map((job) => ({
      id: job._id,
      title: job.jobTitle,
      profile: job.jobProfile,
      workplace: job.workplaceType,
      engagement: job.applyClickCount,
      processed: job.processed,
      applied: job.applied,
      postedOn: formatIntoDateString(job.createdAt),
    }))

    const leaders = (dashboardSecondaryDetails?.leaderBoard?.candidates ?? []).map((row) => ({
      id: row._id,
      name: `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim(),
      email: row.email,
      phone: row.phone ? formatPhoneNumber(row.phone) : '-',
      score: row.assessmentScore,
      hourly: displayOrDash(row.hourlyRate),
      currentCtc: displayOrDash(row.currentCTC),
      expectedCtc: displayOrDash(row.expectedCTC),
      avatar: row.profilePictureUrl || unknownProfilePicture,
      jobId: row.jobApplications?.jobId,
    }))

    return {
      upcomingInterviews,
      jobs,
      leaderboard: {
        uniqueCandidates: dashboardSecondaryDetails?.leaderBoard?.totalUniqueCandidatesCount ?? 0,
        assessments: dashboardSecondaryDetails?.leaderBoard?.totalAssessmentsDone ?? 0,
        rows: leaders,
      },
    }
  }, [dashboardDetails, dashboardSecondaryDetails, unknownProfilePicture])

  const openCandidate = (candidateId, jobId) => {
    navigate(`${getRoute(user?.role, ROUTE_KEY.CANDIDATES_VIEW_CANDIDATE)}/${candidateId}/${jobId}`)
  }

  return (
    <GeodeDashboard
      isPrimaryLoading={isPrimaryLoading}
      isSecondaryLoading={isSecondaryLoading}
      period={period}
      onPeriodChange={setPeriod}
      applicationSeries={applicationSeries(dashboardDetails, period)}
      company={{
        name: companyDetails?.name,
        logoUrl: companyDetails?.logoUrl || unknownProfilePicture,
        location: locationLabel,
        industry: industryLabel,
        employees: dashboardDetails?.members?.length ?? 0,
        activeJobs: dashboardDetails?.activeJobs ?? 0,
        applications: dashboardDetails?.applications?.totalApplicationsCount ?? 0,
        upcomingInterviews: dashboardDetails?.interviews?.totalCount ?? 0,
      }}
      upcomingInterviews={model.upcomingInterviews}
      onOpenInterview={(interview) => openCandidate(interview.candidateId, interview.jobId)}
      interviewStages={dashboardDetails?.interviews?.stageBasedInterviewsCount}
      jobs={model.jobs}
      onOpenJob={(job) => navigate(`${getRoute(user?.role, ROUTE_KEY.JOBS_VIEW_JOB)}/${job.id}`)}
      leaderboard={model.leaderboard}
      onOpenLeader={(row) => openCandidate(row.id, row.jobId)}
    />
  )
}

export default AdminDashboard
