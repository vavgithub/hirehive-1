export const applicationSeriesByPeriod = {
  monthly: [
    { month: 'May', totalCount: 18 },
    { month: 'Jun', totalCount: 24 },
    { month: 'Jul', totalCount: 21 },
    { month: 'Aug', totalCount: 33 },
    { month: 'Sep', totalCount: 29 },
    { month: 'Oct', totalCount: 36 },
  ],
  weekly: [
    { week: { start: '2026-09-07T00:00:00.000Z', end: '2026-09-13T00:00:00.000Z' }, totalCount: 12 },
    { week: { start: '2026-09-14T00:00:00.000Z', end: '2026-09-20T00:00:00.000Z' }, totalCount: 18 },
    { week: { start: '2026-09-21T00:00:00.000Z', end: '2026-09-27T00:00:00.000Z' }, totalCount: 15 },
    { week: { start: '2026-09-28T00:00:00.000Z', end: '2026-10-04T00:00:00.000Z' }, totalCount: 22 },
  ],
  daily: [
    { day: '2026-10-20T00:00:00.000Z', totalCount: 4 },
    { day: '2026-10-21T00:00:00.000Z', totalCount: 7 },
    { day: '2026-10-22T00:00:00.000Z', totalCount: 5 },
    { day: '2026-10-23T00:00:00.000Z', totalCount: 9 },
    { day: '2026-10-24T00:00:00.000Z', totalCount: 6 },
  ],
  yesterday: [
    { hour: '2026-10-26T06:00:00.000Z', totalCount: 1 },
    { hour: '2026-10-26T09:00:00.000Z', totalCount: 3 },
    { hour: '2026-10-26T12:00:00.000Z', totalCount: 2 },
    { hour: '2026-10-26T15:00:00.000Z', totalCount: 4 },
  ],
}

const jobs = [
  { id: 'job-1', title: 'Product Designer', profile: 'Product Designer', workplace: 'Remote', engagement: 128, processed: 46, applied: 80, postedOn: '12 May 2026' },
  { id: 'job-2', title: 'Brand Designer', profile: 'Brand Designer', workplace: 'Hybrid', engagement: 96, processed: 31, applied: 54, postedOn: '02 Jun 2026' },
  { id: 'job-3', title: 'UI Designer', profile: 'UI UX', workplace: 'Remote', engagement: 74, processed: 22, applied: 41, postedOn: '18 Jun 2026' },
  { id: 'job-4', title: 'Motion Designer', profile: 'Motion Designer', workplace: 'On-site', engagement: 51, processed: 16, applied: 28, postedOn: '09 Jul 2026' },
  { id: 'job-5', title: 'Design Director', profile: 'Creative Director', workplace: 'Hybrid', engagement: 40, processed: 11, applied: 19, postedOn: '21 Jul 2026' },
  { id: 'job-6', title: 'Graphic Designer', profile: 'Graphic Designer', workplace: 'Remote', engagement: 63, processed: 18, applied: 33, postedOn: '04 Aug 2026' },
]

const leaders = [
  { id: 'cand-1', name: 'Amina Shah', email: 'amina@example.com', phone: '971-500000001', score: 92, hourly: '-', currentCtc: '18', expectedCtc: '24', avatar: '', jobId: 'job-1' },
  { id: 'cand-2', name: 'Leo Martins', email: 'leo@example.com', phone: '971-500000002', score: 88, hourly: '40', currentCtc: '-', expectedCtc: '20', avatar: '', jobId: 'job-2' },
  { id: 'cand-3', name: 'Nora Iqbal', email: 'nora@example.com', phone: '971-500000003', score: 85, hourly: '-', currentCtc: '15', expectedCtc: '22', avatar: '', jobId: 'job-1' },
  { id: 'cand-4', name: 'Samir Patel', email: 'samir@example.com', phone: '971-500000004', score: 81, hourly: '35', currentCtc: '-', expectedCtc: '18', avatar: '', jobId: 'job-3' },
  { id: 'cand-5', name: 'Hana Ito', email: 'hana@example.com', phone: '971-500000005', score: 79, hourly: '-', currentCtc: '12', expectedCtc: '16', avatar: '', jobId: 'job-4' },
  { id: 'cand-6', name: 'Owen Blake', email: 'owen@example.com', phone: '971-500000006', score: 76, hourly: '30', currentCtc: '10', expectedCtc: '15', avatar: '', jobId: 'job-6' },
]

export const geodeDashboardFixture = {
  period: 'monthly',
  applicationSeries: applicationSeriesByPeriod.monthly,
  company: {
    name: 'Sample Studio',
    logoUrl: '',
    location: 'Dubai',
    industry: 'Design',
    employees: 12,
    activeJobs: 6,
    applications: 161,
    upcomingInterviews: 2,
  },
  upcomingInterviews: [
    {
      id: 'int-1',
      stage: 'Portfolio',
      when: '02 Nov 2026 at 10:00 AM',
      candidate: 'Amina Shah',
      reviewer: 'Sample Reviewer',
      reviewerRole: 'Design Reviewer',
    },
    {
      id: 'int-2',
      stage: 'Round 1',
      when: '04 Nov 2026 at 2:30 PM',
      candidate: 'Leo Martins',
      reviewer: 'Sample Reviewer',
      reviewerRole: 'Design Reviewer',
    },
  ],
  interviewStages: {
    Portfolio: 14,
    Screening: 9,
    'Design Task': 6,
    'Round 1': 4,
    'Round 2': 2,
  },
  jobs,
  leaderboard: {
    uniqueCandidates: 48,
    assessments: 27,
    rows: leaders,
  },
}
