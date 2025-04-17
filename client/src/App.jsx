import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyledToastContainer } from './components/ui/Toast'
import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import StatePreserver from './context/StatePreserver';
import { ThemeProvider } from '@mui/material';
import theme from './components/MUIUtilities/theme';
import ProductTour from './context/ProductTour';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme} >
      <Provider store={store}>
        <AuthProvider>
          <StatePreserver>
            <ProductTour />
            <RouterProvider router={router} />
            <StyledToastContainer />
          </StatePreserver>
        </AuthProvider>
      </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App
