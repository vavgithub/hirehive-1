import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CreateJobs from "./pages/CreateJobs";
import Authlayout from "./auth/Authlayout";
import Register from "./pages/Register";
import EditJobs from "./pages/EditJobs";
import ViewJobs from "./pages/ViewJobs";
import ViewCandidateProfile from "./pages/ViewCandidateProfile";
import Candidates from "./pages/Candidates";
import ErrorPage from "./pages/ErrorPage";
import Applyjob from "./pages/Candidate/CandidateViewJob";
import CandidateViewJob from "./pages/Candidate/CandidateViewJob";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/jobs",
        element: <Dashboard />,
      },
      {
        path: "/candidates",
        element: <Candidates />
      },
      {
        path: "/create-job",
        element: <CreateJobs />,
      },
      {
        path: "/edit-job/:id",
        element: <EditJobs />
      },
      {
        path: "/view-job/:id",
        element: <ViewJobs />,
      },
      {
        path: "/view-candidate",
        element: <ViewCandidateProfile />
      }
    ]
  },
  {
    path: "auth",
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
    path: "candidates",
    children:[{
      path: "view-job/:id",
      element: <CandidateViewJob />
    }
  ],
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);