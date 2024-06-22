import React from 'react'
import useAuth from './useAuth'
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log("am i cliked or not")
            const response = await axios.get('api/v1/auth/refresh');
            const result = response.data;
            console.log(result)
            console.log("check this please " + JSON.stringify(result));
            // setAuth(prev => {
            //     console.log(JSON.stringify(prev));
            //     console.log(result);
            //     return { ...prev, accessToken: result.data.accessToken };
            // });
            return result;
        } catch (error) {
            console.error('Error refreshing token', error);
            // Optionally, handle the error as needed
        }
    };

    return refresh;
};

export default useRefreshToken;