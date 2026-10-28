import { geodeDashboardFixture } from '../dashboard/fixtures'

const statusByJob = ['open', 'open', 'open', 'draft', 'closed', 'open']

export const previewJobs = geodeDashboardFixture.jobs.map((job, index) => ({
  ...job,
  status: statusByJob[index] || 'open',
  location: 'Dubai',
  summary: `${job.title} for Sample Studio. Applications are sample data for this preview.`,
}))

export const previewAssessments = [
  { id: 'assess-1', name: 'Portfolio Review', job: 'Product Designer', questions: 6, responses: 18, updated: '12 Oct 2026' },
  { id: 'assess-2', name: 'Brand Exercise', job: 'Brand Designer', questions: 4, responses: 11, updated: '02 Oct 2026' },
  { id: 'assess-3', name: 'Interface Critique', job: 'UI Designer', questions: 5, responses: 9, updated: '28 Sep 2026' },
  { id: 'assess-4', name: 'Motion Study', job: 'Motion Designer', questions: 3, responses: 7, updated: '14 Sep 2026' },
]

const stages = ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2']

export const previewCandidates = geodeDashboardFixture.leaderboard.rows.map((row, index) => ({
  ...row,
  stage: stages[index % stages.length],
  list: index < 4 ? 'active' : index === 4 ? 'gem' : 'parked',
  jobTitle: previewJobs.find((job) => job.id === row.jobId)?.title || 'Product Designer',
}))

export const previewTeam = [
  { id: 'member-1', name: 'Sample Admin', role: 'Admin', status: 'Joined', email: 'admin@samplestudio.example' },
  { id: 'member-2', name: 'Sample Reviewer', role: 'Design Reviewer', status: 'Joined', email: 'reviewer@samplestudio.example' },
  { id: 'member-3', name: 'Sample Manager', role: 'Hiring Manager', status: 'Invited', email: 'manager@samplestudio.example' },
  { id: 'member-4', name: 'Rina Cole', role: 'Design Reviewer', status: 'Requested', email: 'rina@samplestudio.example' },
]

export const previewGuide = [
  { id: 'portfolio', title: 'Portfolio', body: 'Review the work samples before the first conversation. Note the role the piece was made for and what the candidate owned.' },
  { id: 'screening', title: 'Screening', body: 'Confirm the basics: location, notice period, and the kind of work they want next. Keep the conversation short.' },
  { id: 'task', title: 'Design Task', body: 'Give a bounded exercise with a clear deadline. Score the decisions, not the polish alone.' },
  { id: 'round-1', title: 'Round 1', body: 'Walk through one project. Ask what changed after feedback and what they would do differently now.' },
  { id: 'round-2', title: 'Round 2', body: 'Close on collaboration, craft, and the offer range. Write the decision down the same day.' },
]

export const november2026 = [
  { label: '1', marks: 0 },
  { label: '2', marks: 1 },
  { label: '3', marks: 0 },
  { label: '4', marks: 1 },
  { label: '5', marks: 0 },
  { label: '6', marks: 0 },
  { label: '7', marks: 0 },
  { label: '8', marks: 0 },
  { label: '9', marks: 0 },
  { label: '10', marks: 0 },
  { label: '11', marks: 0 },
  { label: '12', marks: 0 },
  { label: '13', marks: 0 },
  { label: '14', marks: 0 },
  { label: '15', marks: 0 },
  { label: '16', marks: 0 },
  { label: '17', marks: 0 },
  { label: '18', marks: 0 },
  { label: '19', marks: 0 },
  { label: '20', marks: 0 },
  { label: '21', marks: 0 },
  { label: '22', marks: 0 },
  { label: '23', marks: 0 },
  { label: '24', marks: 0 },
  { label: '25', marks: 0 },
  { label: '26', marks: 0 },
  { label: '27', marks: 0 },
  { label: '28', marks: 0 },
  { label: '29', marks: 0 },
  { label: '30', marks: 0 },
  { label: '1', marks: 0, muted: true },
  { label: '2', marks: 0, muted: true },
  { label: '3', marks: 0, muted: true },
  { label: '4', marks: 0, muted: true },
  { label: '5', marks: 0, muted: true },
]

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
