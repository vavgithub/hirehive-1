import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Admin/Login';
import CreateJobs from './pages/Admin/CreateJobs';
import Authlayout from './auth/Authlayout';
import Register from './pages/Admin/Register';
import EditJobs from './pages/Admin/EditJobs.jsx';
import ViewJobs from './pages/Admin/ViewJobs';
import ViewCandidateProfile from './pages/Admin/ViewCandidateProfile';
import Candidates from './pages/Admin/Candidates';
import ErrorPage from './pages/Admin/ErrorPage';
import EditCandidateProfile from './pages/Admin/EditCandidateProfile';
import DesignReviewerDashboard from './pages/DesignReviewer/DesignReviewerDashboard.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Reviews from './pages/DesignReviewer/Reviews.jsx';
import HomePage from './pages/Candidate/HomePage.jsx';
import Text from './pages/Text.jsx';
import ViewJob from './pages/Candidate/ViewJob.jsx';
import ApplyJob from './pages/Candidate/ApplyJob.jsx';
import PreAssessment from './pages/Candidate/PreAssessment.jsx';
import ProtectedRouteCandidate from './routes/ProtectedRouteCandidate.jsx';
import CandidateLogin from './pages/Candidate/CandidateLogin.jsx';
import CandidateDashboard from './pages/Candidate/CandidateDashboard.jsx';
import CandidateProfilePage from "./pages/Candidate/Profile.jsx"
import CandidateLayout from './auth/CandidateLayout.jsx';
import MyJobs from './pages/Candidate/MyJobs.jsx';
import AllJobs from './pages/Candidate/AllJobs.jsx';
import Profile from './pages/Admin/Profile.jsx';
import AssessmentResponse from './pages/Admin/AssessmentResponse.jsx';
import { OnboardingProvider } from './context/OnboardingProvider.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import Teams from './pages/Admin/Teams.jsx';
import Jobs from './pages/Admin/Jobs.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <CandidateLogin />,
  },

  //Protected Candidate Routes
  {
    path: '/candidate',
    element: (
      <ProtectedRouteCandidate>
        <CandidateLayout />
      </ProtectedRouteCandidate>
    ),
    children: [
      {
        path: 'dashboard',
        element: <CandidateDashboard />,
      },
      {
        path: 'profile',
        element: <CandidateProfilePage />,
      },
      {
        path: 'my-jobs',
        element: <MyJobs />, // Create this component
      },
      {
        path: 'all-jobs',
        element: <AllJobs />, // Protected HomePage with sidebar
      },
      {
        path: 'viewJob/:candidateId/:jobId',
        element: <ViewCandidateProfile />
      },
      {
        path: '',
        element: <Navigate to="dashboard" />, // Redirect to dashboard by default
      },
    ],
  },
  {
    path: "/:id",
    element: <ViewJob />
  },
  {
    path: "/apply-job/:id",
    element: <ApplyJob />
  },
  {
    path: "/assessment",
    element: (
      <ProtectedRouteCandidate>
        <PreAssessment />
      </ProtectedRouteCandidate>
    )
  },
  {
    path: "/admin",
    element: <Authlayout />,
    children: [
      {
        path: "", // Match the root `/admin` path
        element: <Navigate to="login" />, // Redirect to `/admin/login`
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <OnboardingProvider>
          <Register />
        </OnboardingProvider>,
      }
    ],
  },
  {
    path: "/hiring-manager",
    element: <ProtectedRoute allowedRoles={['Hiring Manager']}><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Jobs />
      },
      {
        path: "assessment/:id",
        element: <AssessmentResponse />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "jobs",
        element:
          <Jobs />
      },
      {
        path: "candidates",
        element:
          <Candidates />
      },
      {
        path: "create-job",
        element:

          <CreateJobs />
      },
      {
        path: "edit-job/:id",
        element:
          <EditJobs />
      },
      {
        path: "jobs/view-job/:id",
        element:
          <ViewJobs />
      },
      {
        path: "jobs/view-candidate/:candidateId/:jobId",
        element:
          <ViewCandidateProfile />
      },
      {
        path: "candidates/view-candidate/:candidateId/:jobId",
        element:
          <ViewCandidateProfile />
      },
      {
        path: "jobs/edit-candidate/:id",
        element:
          <EditCandidateProfile />
      }
    ]
  },

  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={['Admin']}><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Jobs />
      },
      {
        path: "teams",
        element: <Teams />    
      },
      {
        path: "assessment/:id",
        element: <AssessmentResponse />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "jobs",
        element:
          <Jobs />
      },
      {
        path: "candidates",
        element:
          <Candidates />
      },
      {
        path: "create-job",
        element:

          <CreateJobs />
      },
      {
        path: "edit-job/:id",
        element:
          <EditJobs />
      },
      {
        path: "jobs/view-job/:id",
        element:
          <ViewJobs />
      },
      {
        path: "jobs/view-candidate/:candidateId/:jobId",
        element:
          <ViewCandidateProfile />
      },
      {
        path: "candidates/view-candidate/:candidateId/:jobId",
        element:
          <ViewCandidateProfile />
      },
      {
        path: "jobs/edit-candidate/:id",
        element:
          <EditCandidateProfile />
      }
    ]
  },

  {
    path: "/design-reviewer",
    element: <ProtectedRoute allowedRoles={['Design Reviewer']}><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Candidates />
        // element: <DesignReviewerDashboard />,
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "candidates",
        element: <Candidates />
      },
      {
        path: "reviews",
        element:
          <Reviews />
      },
      {
        path: "candidates/view-candidate/:candidateId/:jobId",
        element:
          <ViewCandidateProfile />
      },

      // Add more Design Reviewer routes here
    ]
  },
  {
    path: "*",
    element: <ErrorPage />
  },
  {
    path: "/test",
    element: <Text />
  }
]);
