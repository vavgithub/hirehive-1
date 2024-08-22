import { getProfile } from '../api/authApi';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        enabled: !!document.cookie.split('; ').find(row => row.startsWith('jwt=')),
    });
};

export default useAuth;
