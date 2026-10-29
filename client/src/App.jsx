import { useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import * as Sentry from '@sentry/react';
import { StyledToastContainer } from './components/ui/Toast'
import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import StatePreserver from './context/StatePreserver';
import { ThemesProvider } from './context/ThemeContext';
import { TooltipProvider } from '@/components/shadcn/tooltip';

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
  useLayoutEffect(() => {
    document.documentElement.dataset.geodeSkin = 'on'
  }, [])

  return ( 
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        <Provider store={store}>
          <AuthProvider>
            <StatePreserver>
              <ThemesProvider>
                <div className="geode min-h-screen">
                  <RouterProvider router={router} />
                </div>
              </ThemesProvider>
              <StyledToastContainer />
            </StatePreserver>
          </AuthProvider> 
        </Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App
