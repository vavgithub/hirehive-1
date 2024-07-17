import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Admin/Register'
import Login from './pages/Admin/Login'
import Navbar from './components/Navbar'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
