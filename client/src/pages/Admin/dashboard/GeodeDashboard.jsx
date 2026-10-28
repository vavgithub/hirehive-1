import ApplicationChart from '@/components/Charts/ApplicationChart'
import InterviewsChart from '@/components/Charts/InterviewsChart'
import { Avatar } from '@/components/shadcn/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card'
import { DataTable } from '@/components/shadcn/data-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/tabs'

const PERIODS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'daily', label: 'Daily' },
  { value: 'yesterday', label: 'Yesterday' },
]

function Stat({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-geode-3">
      <span className="font-geode text-geode-small text-geode-muted">{label}</span>
      <span className="font-geode text-geode-small font-geode-heading text-geode-text">{value}</span>
    </div>
  )
}

const jobColumns = [
  { key: 'title', header: 'Job Title' },
  { key: 'profile', header: 'Job Profile' },
  { key: 'workplace', header: 'Workplace' },
  { key: 'engagement', header: 'Engagement', align: 'right' },
  { key: 'processed', header: 'Processed Applications', align: 'right' },
  { key: 'applied', header: 'Applied Candidates', align: 'right' },
  { key: 'postedOn', header: 'Posted On' },
]

function leaderColumns() {
  return [
    {
      key: 'name',
      header: 'Name',
      render: (row) => (
        <span className="inline-flex items-center gap-geode-2">
          <Avatar src={row.avatar} alt="" fallback={row.name ? row.name.slice(0, 1) : '?'} />
          {row.name || '-'}
        </span>
      ),
    },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'score', header: 'Score', align: 'right' },
    { key: 'hourly', header: 'Hourly Rate', align: 'right' },
    { key: 'currentCtc', header: 'Current CTC', align: 'right' },
    { key: 'expectedCtc', header: 'Expected CTC', align: 'right' },
  ]
}

function GeodeDashboard({
  isPrimaryLoading,
  isSecondaryLoading,
  period,
  onPeriodChange,
  applicationSeries,
  company,
  upcomingInterviews,
  onOpenInterview,
  interviewStages,
  jobs,
  onOpenJob,
  leaderboard,
  onOpenLeader,
}) {
  return (
    <div className="flex flex-col gap-geode-4">
      <header className="flex items-end justify-between gap-geode-3">
        <h1 className="pb-0 font-geode text-geode-h4 font-geode-heading">Dashboard</h1>
        {isPrimaryLoading ? (
          <p className="font-geode text-geode-small text-geode-muted" role="status">Loading dashboard</p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 items-start gap-geode-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row flex-wrap items-center justify-between">
            <CardTitle>Application Trends</CardTitle>
            <Tabs value={period} onValueChange={onPeriodChange}>
              <TabsList aria-label="Application trend period">
                {PERIODS.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ApplicationChart type={period} dataArray={applicationSeries} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="items-center text-center">
            <Avatar
              src={company.logoUrl}
              alt=""
              fallback={company.name ? company.name.slice(0, 1) : '?'}
              className="h-geode-lg w-geode-lg"
            />
            <div>
              <CardTitle>{company.name || 'Company'}</CardTitle>
              <p className="font-geode text-geode-small text-geode-muted">
                {[company.location, company.industry].filter(Boolean).join(' · ') || '—'}
              </p>
            </div>
          </CardContent>
          <div className="mt-geode-4 flex flex-col gap-geode-3">
            <Stat label="Employees" value={company.employees} />
            <Stat label="Active Jobs" value={company.activeJobs} />
            <Stat label="Applications Received" value={company.applications} />
            <Stat label="Upcoming Interviews" value={company.upcomingInterviews} />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.length === 0 ? (
              <p className="font-geode text-geode-small text-geode-muted">No upcoming interviews</p>
            ) : (
              upcomingInterviews.map((interview) => (
                <button
                  key={interview.id}
                  type="button"
                  onClick={() => onOpenInterview(interview)}
                  className="flex w-full flex-col gap-geode-1 rounded-geode border border-geode-border bg-geode-card px-geode-4 py-geode-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-geode-focus"
                >
                  <span className="flex items-center justify-between gap-geode-2">
                    <span className="font-geode text-geode-small text-geode-muted">{interview.when}</span>
                    <span className="font-geode text-geode-small text-geode-muted">{interview.stage}</span>
                  </span>
                  <span className="font-geode text-geode-small font-geode-heading text-geode-text">{interview.candidate || '-'}</span>
                  <span className="font-geode text-geode-small text-geode-muted">
                    {[interview.reviewer, interview.reviewerRole].filter(Boolean).join(' · ') || '—'}
                  </span>
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Interviews by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <InterviewsChart dataSet={interviewStages} />
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={jobColumns}
              rows={jobs}
              getRowId={(row) => row.id}
              onRowClick={onOpenJob}
              emptyLabel="No jobs"
              isLoading={isSecondaryLoading}
              searchable
              columnToggle
            />
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <div className="grid grid-cols-2 gap-geode-4">
              <div className="flex flex-col gap-geode-1">
                <span className="font-geode text-geode-small text-geode-muted">Unique Candidates</span>
                <span className="font-geode text-geode-display font-geode-heading text-geode-text">{leaderboard.uniqueCandidates}</span>
              </div>
              <div className="flex flex-col gap-geode-1">
                <span className="font-geode text-geode-small text-geode-muted">Assessments</span>
                <span className="font-geode text-geode-display font-geode-heading text-geode-text">{leaderboard.assessments}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={leaderColumns()}
              rows={leaderboard.rows}
              getRowId={(row) => row.id}
              onRowClick={onOpenLeader}
              emptyLabel="No candidates"
              isLoading={isSecondaryLoading}
              searchable
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GeodeDashboard
