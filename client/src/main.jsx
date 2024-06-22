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
import { Provider } from 'react-redux'
import { store } from './api/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>)
  </Provider>

