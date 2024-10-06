import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyledToastContainer } from './components/ui/Toast'
import { AuthProvider } from './context/AuthProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <StyledToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
