import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

import Login  from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CreateJobs from "./pages/CreateJobs";
import Authlayout from "./auth/Authlayout";
import Register from "./pages/Register";
import EditJobs from "./pages/EditJobs";
import ViewJobs from "./pages/ViewJobs";
import ViewCandidate from "./pages/ViewCandidate";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element:<Navbar/>,
      children:[
        {
          path: "/jobs",
          element: <Dashboard/>,
        },
        {
          path:"/candidates",
          element:<h1>Candidates</h1>
        },
        {
            path: "/create-job",
            element: <CreateJobs/>,
        },
        {
          path:"/edit-job/:id",
          element:<EditJobs/>
        },
        {
          path: "/view-job/:id",
          element: <ViewJobs/>,
        },
        {
          path:"/view-candidate",
          element:<ViewCandidate/>
        }
      ]
    },    
    {
      path: "auth",
      element: <Authlayout/>,
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
  ]);