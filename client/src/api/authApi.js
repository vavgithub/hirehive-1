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

export const uploadProfilePicture = async (formData) => {
  const response = await axios.post(`${API_URL}/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchAvailableDesignReviewers = async () => {
    try {
      const response = await axios.get(`${API_URL}/design-reviewers`, { withCredentials: true });
      
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid data structure received from API');
      }
  
      return response.data.data;
    } catch (error) {
      console.error('Error in fetchAvailableDesignReviewers:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };

export const fetchAllDesignReviewers = async () => {
      const response = await axios.get(`${API_URL}/design-reviewers`, { withCredentials: true });
      return response.data;
}

export const candidateLogout = async ()=>{
    const response = await axios.post("/auth/candidate/logout",{ withCredentials: true })
    return response.data;
}
