import { useState } from 'react'
import GeodeDashboard from './GeodeDashboard'
import { applicationSeriesByPeriod, geodeDashboardFixture } from './fixtures'

function GeodeDashboardPreview() {
  const [period, setPeriod] = useState(geodeDashboardFixture.period)

  return (
    <GeodeDashboard
      isPrimaryLoading={false}
      isSecondaryLoading={false}
      period={period}
      onPeriodChange={setPeriod}
      applicationSeries={applicationSeriesByPeriod[period] || applicationSeriesByPeriod.monthly}
      company={geodeDashboardFixture.company}
      upcomingInterviews={geodeDashboardFixture.upcomingInterviews}
      onOpenInterview={() => {}}
      interviewStages={geodeDashboardFixture.interviewStages}
      jobs={geodeDashboardFixture.jobs}
      onOpenJob={() => {}}
      leaderboard={geodeDashboardFixture.leaderboard}
      onOpenLeader={() => {}}
    />
  )
}

export default GeodeDashboardPreview
