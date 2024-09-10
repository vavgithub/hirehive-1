import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyledToastContainer } from './components/ui/Toast'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <StyledToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default App
