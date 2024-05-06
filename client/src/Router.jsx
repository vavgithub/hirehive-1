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
  
export const router = createBrowserRouter([
    {
      path: "/",
      element:<Navbar/>,
      children:[
        {
          path: "/",
          element: <Dashboard/>,
        },
        {
            path: "/create-job",
            element: <CreateJobs/>,
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