import { Outlet } from 'react-router-dom'
import {
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  FileText,
  IdCard,
  LayoutGrid,
  PauseCircle,
  Settings,
  UserCheck,
  Users,
} from 'lucide-react'
import GeodeShell from '../dashboard/GeodeShell'
import {
  AssessmentsScreen,
  CalendarScreen,
  CandidateDetailScreen,
  CandidatesScreen,
  DashboardScreen,
  FutureGemsScreen,
  GuideScreen,
  JobDetailScreen,
  JobsScreen,
  ParkedScreen,
  ProfileScreen,
  SettingsScreen,
  TeamDetailScreen,
  TeamsScreen,
} from './screens'
import './preview.css'

const base = '/preview/geode'

const nav = [
  { label: 'Dashboard', to: base, icon: LayoutGrid, end: true },
  {
    label: 'Jobs',
    icon: Briefcase,
    children: [
      { label: 'All Jobs', to: `${base}/jobs/all`, icon: Briefcase },
      { label: 'Assessments', to: `${base}/jobs/assessments`, icon: ClipboardCheck },
    ],
  },
  {
    label: 'Candidates',
    icon: Users,
    children: [
      { label: 'All Candidates', to: `${base}/candidates/all`, icon: Users },
      { label: 'Future Gems', to: `${base}/candidates/future-gems`, icon: UserCheck },
      { label: 'Parked Candidates', to: `${base}/candidates/parked`, icon: PauseCircle },
    ],
  },
  { label: 'Calendar', to: `${base}/calendar`, icon: CalendarDays },
  { label: 'Teams', to: `${base}/teams`, icon: IdCard },
  { label: 'Guide', to: `${base}/guide`, icon: FileText },
]

const footer = [
  { label: 'Settings', to: `${base}/settings`, icon: Settings },
]

function GeodeAppPreview() {
  return (
    <GeodeShell
      items={nav}
      footer={footer}
      user={{ name: 'Sample Admin', to: `${base}/profile` }}
    >
      <Outlet />
    </GeodeShell>
  )
}

export const geodePreviewRoute = {
  path: '/preview/geode',
  element: <GeodeAppPreview />,
  children: [
    { index: true, element: <DashboardScreen /> },
    { path: 'jobs/all', element: <JobsScreen /> },
    { path: 'jobs/all/:jobId', element: <JobDetailScreen /> },
    { path: 'jobs/assessments', element: <AssessmentsScreen /> },
    { path: 'candidates/all', element: <CandidatesScreen /> },
    { path: 'candidates/all/:candidateId', element: <CandidateDetailScreen /> },
    { path: 'candidates/future-gems', element: <FutureGemsScreen /> },
    { path: 'candidates/parked', element: <ParkedScreen /> },
    { path: 'calendar', element: <CalendarScreen /> },
    { path: 'teams', element: <TeamsScreen /> },
    { path: 'teams/:memberId', element: <TeamDetailScreen /> },
    { path: 'guide', element: <GuideScreen /> },
    { path: 'settings', element: <SettingsScreen /> },
    { path: 'profile', element: <ProfileScreen /> },
  ],
}

export default GeodeAppPreview
