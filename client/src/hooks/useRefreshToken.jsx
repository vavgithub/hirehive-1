import React from 'react'
import useAuth from './useAuth'
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log("am i cliked or not")
            const response = await axios.post('/api/v1/users/refresh-token',{
                withCredentials: true
            });
            const result = response.data;
            console.log(result)
            console.log("check this please " + JSON.stringify(result));
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(result.data.accessToken);
                return { ...prev, accessToken: result.data.accessToken };
            });
            return result.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token', error);
            // Optionally, handle the error as needed
            throw error; // Re-throw the error to be caught by the caller if necessary
        }
    };

    return refresh;
};

export default useRefreshToken;