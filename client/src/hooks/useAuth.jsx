import { getProfile } from '../services/auth.service';
import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';

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
                Sentry.setUser(null);
                return null;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export default useAuth;
