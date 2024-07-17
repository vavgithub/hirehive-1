import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.jsx'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

import { AuthProvider } from './context/AuthProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App/>  
  </AuthProvider>)

