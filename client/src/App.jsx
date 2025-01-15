import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyledToastContainer } from './components/ui/Toast'
import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import StatePreserver from './context/StatePreserver';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <StatePreserver>
            <RouterProvider router={router} />
            <StyledToastContainer />
          </StatePreserver>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App
