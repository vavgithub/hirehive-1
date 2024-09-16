import {
  createBrowserRouter,
} from 'react-router-dom';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Navbar from './components/Navbar';
import CreateJobs from './pages/Admin/CreateJobs';
import Authlayout from './auth/Authlayout';
import Register from './pages/Admin/Register';
import EditJobs from './pages/Admin/EditJobs';
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
import MiniForm from './pages/Candidate/MiniForm.jsx';
import Verification from './pages/Candidate/Verification.jsx';
import PreAssessment from './pages/Candidate/PreAssessment.jsx';
import ProtectedRouteCandidate from './routes/ProtectedRouteCandidate.jsx';
import CandidateLogin from './pages/Candidate/CandidateLogin.jsx';
import CandidateDashboard from './pages/Candidate/CandidateDashboard.jsx';

export const router = createBrowserRouter([
   {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/candidate',
    children: [
      {
        path: 'login',
        element: <CandidateLogin />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRouteCandidate>
            <CandidateDashboard />
          </ProtectedRouteCandidate>
        ),
      },
    ],
  },
  {
    path:"/:id",
    element:<ViewJob/>
  },
  {
    path:"/apply-job/:id",
    element:<ApplyJob/>
  },
  {
    path:"/assessment/:id",
    element:<PreAssessment/>
  },
  {
    path: "/auth",
    element: <Authlayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={['Hiring Manager']}><Navbar /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "jobs",
        element:
          <Dashboard />
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
        path: "jobs/view-candidate/:id",
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
    element: <ProtectedRoute allowedRoles={['Design Reviewer']}><Navbar /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <DesignReviewerDashboard />,
      },
      {
        path: "candidates",
        element:
          <Candidates />
      },
      {
        path: "reviews",
        element:
          <Reviews />
      },
      {
        path: "view-candidate/:id",
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
