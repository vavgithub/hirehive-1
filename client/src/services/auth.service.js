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

export const uploadCompanyLogo = async (formData) => {
  const response = await axios.post(`${API_URL}/company-logo`, formData, {
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
      // console.error('Error in fetchAvailableDesignReviewers:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.error('Error response:', error.response.data);
        // console.error('Error status:', error.response.status);
        // console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error('Error message:', error.message);
      }
      throw error;
    }
  };

export const fetchAllDesignReviewers = async () => {
      const response = await axios.get(`${API_URL}/design-reviewers`, { withCredentials: true });
      return response.data;
}

export const candidateLogout = async ()=>{
    const response = await axios.post(`${API_URL}/candidate/logout`,{ withCredentials: true })
    return response.data;
}

export const forgotPassword = (email) => axios.post(API_URL + '/forgot-password' , { email })

export const verifyPassOTP = (email,otp) => axios.post(API_URL + '/verify-otp', { email, otp })

export const resetPassword = (email, otp, password) => axios.post(API_URL + '/reset-password' , { email, otp, password})

export const addTeamMembers = async ({teamMembers, email }) => {
    const response = await axios.post(API_URL + '/register/add-team-member',{email, teamMembers });
    return response.data
}

export const skipAddMembers = async () => {
    const response = await axios.post(API_URL + '/register/skip-add-member');
    return response.data
}

export const saveCompanyDetails = async (formData) => {
    const response = await axios.post(API_URL + '/register/complete-hiring-manager',formData);
    return response.data
}

export const sendJoinRequest = async ({email,companyId}) => {
  const response = await axios.post(API_URL + '/register/send-join-request',{email, companyId });
  return response.data
}

export const verifyOnboardOTP = async ({otp, email}) => {
    const response = await axios.post(API_URL + '/register/verify-otp-for-admin',{otp, email});
    return response.data
}

export const sendInviteOTP = async ({token}) => {
  const response = await axios.post(API_URL + '/register/send-invite-otp',{token});
  return response.data
}

export const setPassword = async ({password, email}) => {
  const response = await axios.post(API_URL + '/register/set-password',{password, email});
  return response.data
}

export const registerAdmin = async ({firstName, lastName, email}) => {
    const response = await axios.post(API_URL + '/register/init',{firstName, lastName, email});
    return response.data
}

export const verifyPassword = async ({ email , password }) => {
  const response = await axios.post(API_URL + '/register/verify-password',{email, password});
  return response.data
}

export const editUserProfile = ({ firstName, lastName, phone, jobTitle, experience, skills, tools_used }) => 
  axios.put(API_URL + '/register/edit-profile', { firstName, lastName, phone, jobTitle, experience, skills,tools_used })

export const editCompanyProfile = ({ name, size, location, industryType, about, website, founded, focusAreas, keyContacts }) => 
  axios.put(API_URL + '/edit-company-profile', { name, size, location, industryType, about, website, founded, focusAreas, keyContacts})

export const googleAuthorize = async () => {
  const response = await axios.post(`${API_URL}/google-authorize`);
  return response.data
}