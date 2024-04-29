import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="/" element={<Login />} />
  </>
  

));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
