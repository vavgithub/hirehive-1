import { validateProfileImages, validateResume } from "../utility/validationRules";
import axios from "./axios";

//GET
export const getCandidateDashboard = () => axios.get('/auth/candidate/dashboard');

//POST
export const registerCandidate = (registrationData) => axios.post('/auth/candidate/register', registrationData)

export const createPassword = ( email, password ) => axios.post('/auth/candidate/create-password', { email, password })

export const verifyOtpCandidate = (email, otp) => axios.post('/auth/candidate/verify-otp', { email, otp })

export const verifyEmailOtpCandidate = (email, otp) => axios.post('/auth/candidate/verify-email-otp', { email, otp })

export const applyToJob = (applicationData) => axios.post('/auth/candidate/apply-job', applicationData)

export const editCandidateProfile = (data) => axios.post("/auth/candidate/edit-profile", data)

export const forgotPasswordCandidate = (email) => axios.post('/auth/candidate/forgot-password' , { email })

export const verifyPassOTPCandidate = (email,otp) => axios.post('/auth/candidate/verify-otp-pass', { email, otp })

export const resetPasswordCandidate = (email, otp, password) => axios.post('/auth/candidate/reset-password' , { email, otp, password})

export const updateDesignTask = async ({taskLink,comment,jobId}) => {
    const response = await axios.post('/auth/candidate/update-design-task',{taskLink,comment,jobId});
    return response.data
}

export const fetchAppliedJobs = async (page) => {
  const response = await axios.get(`/auth/candidate/applied-jobs?page=${page}`);
  return response.data;
};

export const uploadCandidateProfilePicture = async (file) => {
  if (!file) throw new Error("No file selected.");
  validateProfileImages(file);
  const formData = new FormData();
  formData.append('profilePicture', file);
  try {
    const response = await axios.post('/auth/candidate/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.profilePictureUrl;
  } catch (error) {
    throw error;
  }
};

export const uploadResume = async (file, setUploadProgress) => {
  if (!file) throw new Error("No file selected.");
  validateResume(file);
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await axios.post('/auth/candidate/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    });
    return response.data.resumeUrl;
  } catch (error) {
    throw error;
  }
};

export const updateEmail = ({ email, userId }) => {
  const response = axios.post('/auth/candidate/update-email', { email, userId });
  return response?.data;
};