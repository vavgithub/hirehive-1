import { getProfile } from '../api/authApi';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            try {
                const data = await getProfile();
                return data;
            } catch (error) {
                // console.error('Error fetching profile:', error);
                return null;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });
};

export default useAuth;
