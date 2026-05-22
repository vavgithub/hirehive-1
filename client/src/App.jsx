import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import * as Sentry from '@sentry/react';
import { StyledToastContainer } from './components/ui/Toast'
import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import StatePreserver from './context/StatePreserver';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './components/MUIUtilities/theme';
import { ThemesProvider } from './context/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { throwOnError: false }, mutations: { throwOnError: false } },
  queryCache: new QueryCache({
    onError: (error, query) => {
      Sentry.captureException(error, {
        extra: {
          queryKey: query.queryKey,
          queryHash: query.queryHash,
          file: "App.jsx",
          type: "query",
        }
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      Sentry.captureException(error, {
        extra: {
          mutationKey: mutation.options.mutationKey,
          file: "App.jsx",
          type: "mutation",
        }
      });
    },
  }),
});

function App() {
  return ( 
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <Provider store={store}>
          <AuthProvider>
            <StatePreserver>
              <ThemesProvider>
                <RouterProvider router={router} />
              </ThemesProvider>
              <StyledToastContainer />
            </StatePreserver>
          </AuthProvider> 
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App
