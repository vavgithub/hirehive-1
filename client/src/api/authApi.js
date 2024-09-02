import axios from "./axios"
const API_URL = '/auth';

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
};

export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
    return response.data;
};

export const fetchAvailableDesignReviewers = async () => {
    const response = await axios.get(`${API_URL}/design-reviewers`, { withCredentials: true });
    return response.data.data;
  };
