import { getProfile } from '../services/auth.service';
import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';

const isSessionInvalid = (error) => error?.response?.status === 401;

const isTransientAuthError = (error) => {
  const status = error?.response?.status;
  if (status === 503 || status === 502 || status === 504) return true;
  // Network / timeout — no HTTP response
  if (!error?.response) return true;
  return false;
};

const useAuth = () => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                const data = await getProfile();
                if (data) {
                    Sentry.setUser({
                        id: data._id,
                        email: data.email,
                        role: 'admin',
                        appRole: data.role,
                    });
                }
                return data;
            } catch (error) {
                // Explicit unauthenticated — clear session
                if (isSessionInvalid(error)) {
                    Sentry.setUser(null);
                    return null;
                }

                // Infra / network — keep prior React Query data; retry below
                if (isTransientAuthError(error)) {
                    Sentry.captureException(error, {
                      tags: { file: "useAuth.jsx", action: "queryFn", role: "admin", kind: "transient" },
                      extra: { response: error?.response?.data, message: error?.message, status: error?.response?.status },
                    });
                    throw error;
                }

                // Other unexpected statuses — do not treat as logout
                Sentry.captureException(error, {
                  tags: { file: "useAuth.jsx", action: "queryFn", role: "admin", kind: "non_auth" },
                  extra: { response: error?.response?.data, message: error?.message, status: error?.response?.status },
                });
                throw error;
            }
        },
        retry: (failureCount, error) => {
            if (isSessionInvalid(error) || error?.response?.status === 403) return false;
            return failureCount < 2;
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 4000),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        // Avoid focus-driven auth refetches piling onto batch-job DB pressure
        refetchOnWindowFocus: false,
    });
};

export default useAuth;
