import { useState } from 'react'
import GeodeDashboard from './GeodeDashboard'
import GeodeShell, { previewGeodeFooter, previewGeodeNav } from './GeodeShell'
import { applicationSeriesByPeriod, geodeDashboardFixture } from './fixtures'

function GeodeDashboardPreview() {
  const [period, setPeriod] = useState(geodeDashboardFixture.period)

  return (
    <GeodeShell
      items={previewGeodeNav}
      footer={previewGeodeFooter}
      user={{ name: 'Sample Admin' }}
    >
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
    </GeodeShell>
  )
}

export default GeodeDashboardPreview
