import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@/components/shadcn/avatar'
import { Button } from '@/components/shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card'
import { DataTable } from '@/components/shadcn/data-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/tabs'
import GeodeDashboard from '../dashboard/GeodeDashboard'
import { applicationSeriesByPeriod, geodeDashboardFixture } from '../dashboard/fixtures'
import {
  november2026,
  previewAssessments,
  previewCandidates,
  previewGuide,
  previewJobs,
  previewTeam,
  weekdays,
} from './fixtures'

function Page({ title, action, children }) {
  return (
    <div className="flex flex-col gap-geode-4">
      <header className="flex flex-wrap items-baseline justify-between gap-geode-3">
        <h1 className="pb-0 font-geode text-geode-h4 font-geode-heading">{title}</h1>
        {action}
      </header>
      {children}
    </div>
  )
}

const statusLabel = { open: 'Open', draft: 'Draft', closed: 'Closed' }

const jobColumns = [
  { key: 'title', header: 'Job Title' },
  { key: 'profile', header: 'Job Profile' },
  { key: 'workplace', header: 'Workplace' },
  { key: 'status', header: 'Status', render: (row) => statusLabel[row.status] || row.status },
  { key: 'applied', header: 'Applied Candidates', align: 'right' },
  { key: 'postedOn', header: 'Posted On' },
]

const candidateColumns = [
  { key: 'name', header: 'Name' },
  { key: 'jobTitle', header: 'Job' },
  { key: 'stage', header: 'Stage' },
  { key: 'score', header: 'Score', align: 'right' },
  { key: 'email', header: 'Email' },
]

export function DashboardScreen() {
  const [period, setPeriod] = useState(geodeDashboardFixture.period)
  const navigate = useNavigate()

  return (
    <GeodeDashboard
      isPrimaryLoading={false}
      isSecondaryLoading={false}
      period={period}
      onPeriodChange={setPeriod}
      applicationSeries={applicationSeriesByPeriod[period] || applicationSeriesByPeriod.monthly}
      company={geodeDashboardFixture.company}
      upcomingInterviews={geodeDashboardFixture.upcomingInterviews}
      onOpenInterview={() => navigate('/preview/geode/calendar')}
      interviewStages={geodeDashboardFixture.interviewStages}
      jobs={geodeDashboardFixture.jobs}
      onOpenJob={(row) => navigate(`/preview/geode/jobs/all/${row.id}`)}
      leaderboard={geodeDashboardFixture.leaderboard}
      onOpenLeader={(row) => navigate(`/preview/geode/candidates/all/${row.id}`)}
    />
  )
}

export function JobsScreen() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('open')
  const rows = previewJobs.filter((job) => job.status === status)

  return (
    <Page
      title="Jobs"
      action={<Button type="button" onClick={() => navigate('/preview/geode/jobs/all/new')}>New job</Button>}
    >
      <Card>
        <CardHeader className="flex-row flex-wrap items-start justify-between">
          <CardTitle>All Jobs</CardTitle>
          <Tabs value={status} onValueChange={setStatus}>
            <TabsList aria-label="Job status">
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={jobColumns}
            rows={rows}
            getRowId={(row) => row.id}
            onRowClick={(row) => navigate(`/preview/geode/jobs/all/${row.id}`)}
            emptyLabel="No jobs in this tab"
            searchable
            columnToggle
          />
        </CardContent>
      </Card>
    </Page>
  )
}

export function JobDetailScreen() {
  const { jobId } = useParams()
  const job = previewJobs.find((item) => item.id === jobId)
  const people = previewCandidates.filter((person) => person.jobId === jobId)

  if (!job) {
    return (
      <Page title="New job">
        <Card>
          <CardContent>
            <p className="font-geode text-geode-small text-geode-muted">This preview does not save a job. The form on the live admin app is unchanged.</p>
          </CardContent>
        </Card>
      </Page>
    )
  }

  return (
    <Page title={job.title}>
      <Card>
        <CardHeader>
          <CardTitle>{job.profile === job.title ? 'Overview' : job.profile}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-geode text-geode-small text-geode-muted">{job.summary}</p>
          <div className="grid grid-cols-2 gap-geode-4 md:grid-cols-4">
            <Stat label="Workplace" value={job.workplace} />
            <Stat label="Status" value={statusLabel[job.status] || job.status} />
            <Stat label="Applied" value={job.applied} />
            <Stat label="Posted" value={job.postedOn} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={candidateColumns}
            rows={people}
            getRowId={(row) => row.id}
            emptyLabel="No candidates for this job"
            searchable
          />
        </CardContent>
      </Card>
    </Page>
  )
}

export function AssessmentsScreen() {
  return (
    <Page title="Assessments">
      <Card>
        <CardHeader>
          <CardTitle>Question sets</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', header: 'Assessment' },
              { key: 'job', header: 'Job' },
              { key: 'questions', header: 'Questions', align: 'right' },
              { key: 'responses', header: 'Responses', align: 'right' },
              { key: 'updated', header: 'Updated' },
            ]}
            rows={previewAssessments}
            getRowId={(row) => row.id}
            emptyLabel="No assessments"
            searchable
          />
        </CardContent>
      </Card>
    </Page>
  )
}

function CandidateList({ title, list }) {
  const navigate = useNavigate()
  const rows = previewCandidates.filter((person) => person.list === list)
  return (
    <Page title={title}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={candidateColumns}
            rows={rows}
            getRowId={(row) => row.id}
            onRowClick={(row) => navigate(`/preview/geode/candidates/all/${row.id}`)}
            emptyLabel="No candidates"
            searchable
            columnToggle
          />
        </CardContent>
      </Card>
    </Page>
  )
}

export function CandidatesScreen() {
  return <CandidateList title="All Candidates" list="active" />
}

export function FutureGemsScreen() {
  return <CandidateList title="Future Gems" list="gem" />
}

export function ParkedScreen() {
  return <CandidateList title="Parked Candidates" list="parked" />
}

export function CandidateDetailScreen() {
  const { candidateId } = useParams()
  const person = previewCandidates.find((item) => item.id === candidateId)
  if (!person) {
    return <Page title="Candidate"><Card><CardContent><p className="font-geode text-geode-small text-geode-muted">Candidate not in the sample set.</p></CardContent></Card></Page>
  }
  return (
    <Page title={person.name}>
      <Card>
        <CardContent className="items-center text-center">
          <Avatar alt="" fallback={person.name.slice(0, 1)} className="h-geode-lg w-geode-lg" />
          <div>
            <CardTitle>{person.jobTitle}</CardTitle>
            <p className="font-geode text-geode-small text-geode-muted">{person.stage}</p>
          </div>
        </CardContent>
        <div className="mt-geode-4 flex flex-col gap-geode-3">
          <StatRow label="Email" value={person.email} />
          <StatRow label="Phone" value={person.phone} />
          <StatRow label="Score" value={person.score} />
          <StatRow label="Expected CTC" value={person.expectedCtc} />
        </div>
      </Card>
    </Page>
  )
}

export function CalendarScreen() {
  return (
    <Page title="Calendar">
      <div className="geode-board">
        <Card className="geode-board-trends">
          <CardHeader>
            <CardTitle>November 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="geode-month">
              {weekdays.map((day) => <span key={day} className="geode-month-label">{day}</span>)}
              {november2026.map((day, index) => (
                <span key={`${day.label}-${index}`} className="geode-month-cell" data-muted={day.muted ? 'true' : 'false'}>
                  <span>{day.label}</span>
                  {day.marks ? <span className="geode-month-mark" /> : null}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="geode-board-rail">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              {geodeDashboardFixture.upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex flex-col gap-geode-1 rounded-geode border border-geode-border px-geode-4 py-geode-3">
                  <span className="flex items-baseline justify-between gap-geode-2">
                    <span className="font-geode text-geode-small text-geode-muted">{interview.when}</span>
                    <span className="font-geode text-geode-small text-geode-muted">{interview.stage}</span>
                  </span>
                  <span className="font-geode text-geode-small font-geode-heading">{interview.candidate}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  )
}

export function TeamsScreen() {
  const navigate = useNavigate()
  const joined = previewTeam.filter((member) => member.status !== 'Requested')
  const requested = previewTeam.filter((member) => member.status === 'Requested')
  return (
    <Page title="Teams" action={<Button type="button">Add member</Button>}>
      <div className="geode-team-grid">
        {joined.map((member) => (
          <Card key={member.id}>
            <button type="button" className="geode-team-card w-full" onClick={() => navigate(`/preview/geode/teams/${member.id}`)}>
              <Avatar alt="" fallback={member.name.slice(0, 1)} className="h-geode-lg w-geode-lg" />
              <span className="font-geode text-geode-small font-geode-heading">{member.name}</span>
              <span className="font-geode text-geode-small text-geode-muted">{member.role}</span>
              <span className="font-geode text-geode-small text-geode-muted">{member.status}</span>
            </button>
          </Card>
        ))}
      </div>
      {requested.length ? (
        <div className="flex flex-col gap-geode-3">
          <h2 className="font-geode text-geode-h6 font-geode-heading">New member request</h2>
          <div className="geode-team-grid">
            {requested.map((member) => (
              <Card key={member.id}>
                <div className="geode-team-card">
                  <Avatar alt="" fallback={member.name.slice(0, 1)} className="h-geode-lg w-geode-lg" />
                  <span className="font-geode text-geode-small font-geode-heading">{member.name}</span>
                  <span className="font-geode text-geode-small text-geode-muted">{member.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </Page>
  )
}

export function TeamDetailScreen() {
  const { memberId } = useParams()
  const member = previewTeam.find((item) => item.id === memberId)
  if (!member) return <Page title="Team member" />
  return (
    <Page title={member.name}>
      <Card>
        <CardContent className="items-center text-center">
          <Avatar alt="" fallback={member.name.slice(0, 1)} className="h-geode-lg w-geode-lg" />
          <CardTitle>{member.role}</CardTitle>
        </CardContent>
        <div className="mt-geode-4 flex flex-col gap-geode-3">
          <StatRow label="Email" value={member.email} />
          <StatRow label="Status" value={member.status} />
        </div>
      </Card>
    </Page>
  )
}

export function GuideScreen() {
  return (
    <Page title="Guide">
      <div className="flex flex-col gap-geode-4">
        {previewGuide.map((stage) => (
          <Card key={stage.id}>
            <CardHeader>
              <CardTitle>{stage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-geode text-geode-small text-geode-muted">{stage.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Page>
  )
}

const profiles = ['Product Designer', 'Brand Designer', 'UI UX']

export function SettingsScreen() {
  const [enabled, setEnabled] = useState(true)
  const [selected, setSelected] = useState(['Product Designer'])

  const toggle = (profile) => {
    setSelected((current) => (
      current.includes(profile) ? current.filter((item) => item !== profile) : [...current, profile]
    ))
  }

  return (
    <Page title="Settings">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio multi-reviewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-geode-3">
            <p className="font-geode text-geode-small text-geode-muted">Allow assigning up to 3 reviewers for the portfolio stage.</p>
            <button type="button" className="geode-switch" data-on={enabled ? 'true' : 'false'} aria-pressed={enabled} aria-label="Portfolio multi-reviewer" onClick={() => setEnabled((value) => !value)} />
          </div>
          {enabled ? (
            <div className="grid grid-cols-1 gap-geode-3 md:grid-cols-3">
              {profiles.map((profile) => (
                <button key={profile} type="button" className="geode-check" data-on={selected.includes(profile) ? 'true' : 'false'} aria-pressed={selected.includes(profile)} onClick={() => toggle(profile)}>
                  {profile}
                </button>
              ))}
            </div>
          ) : null}
          <div className="flex justify-end">
            <Button type="button">Save</Button>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}

export function ProfileScreen() {
  const company = geodeDashboardFixture.company
  return (
    <Page title="Profile">
      <Card>
        <CardContent className="items-center text-center">
          <Avatar alt="" fallback="S" className="h-geode-lg w-geode-lg" />
          <div>
            <CardTitle>Sample Admin</CardTitle>
            <p className="font-geode text-geode-small text-geode-muted">Admin · {company.name}</p>
          </div>
        </CardContent>
        <div className="mt-geode-4 flex flex-col gap-geode-3">
          <StatRow label="Email" value="admin@samplestudio.example" />
          <StatRow label="Location" value={company.location} />
          <StatRow label="Industry" value={company.industry} />
          <StatRow label="Active jobs" value={company.activeJobs} />
        </div>
      </Card>
    </Page>
  )
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-geode-1">
      <span className="font-geode text-geode-small text-geode-muted">{label}</span>
      <span className="font-geode text-geode-small font-geode-heading">{value}</span>
    </div>
  )
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-geode-3">
      <span className="font-geode text-geode-small text-geode-muted">{label}</span>
      <span className="font-geode text-geode-small font-geode-heading">{value}</span>
    </div>
  )
}
