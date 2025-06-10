import axios from "./axios";

//GET
export const getShortlistedCandidates = (companyId) => axios.get(`/admin/candidate/shortlisted/${companyId}`).then(res => res.data)

export const getAllCandidatesAndStats = () => axios.get('/admin/candidate/getData/data/allCandidatesWithStats').then(res => res.data)

export const fetchCandidateData = async (candidateId, jobId) => {
    const { data } = await axios.get(`/admin/candidate/${candidateId}/job/${jobId}`);
    return data;
};

export const fetchCandidateJobs = async (candidateId) => {
    const { data } = await axios.get(`/admin/candidate/${candidateId}/jobs`);
    return data;
};

export const getRandomAssessmentQuestions = async (assessment_id) => {
    const response = await axios.post(`/admin/candidate/assessment-questions/random?assessmentId=${assessment_id}`);
    return response.data.questions;
} 

export const getAssessmentQuestionsById = async (assessment_id) => {
    const response = await axios.get(`/admin/candidate/assessment-questions?assessmentId=${assessment_id}`);
    return response.data;
}

export const fetchAssessmentDetails = async (candidateId, jobId) => {
    const { data } = await axios.get(`/admin/candidate/get-assessment/${candidateId}/${jobId}`);
    return data;
};

export const fetchCalendarDetails = async (startDate,endDate,calendarType) => {
    const { data } = await axios.get(`/admin/candidate/get-calendar-details?startDate=${startDate}&endDate=${endDate}&calendarType=${calendarType}`);
    return data;
};

//POST
export const addNotes = async ({ candidateId, jobId, notesData }) => {
    const response = await axios.post(`/admin/candidate/${candidateId}/${jobId}/addNotes`, notesData);
    return response?.data;
};

export const toggleShortlistStatus = async ({ candidateId, jobId, shortlisted }) => {
    const response = await axios.post(`/admin/candidate/${candidateId}/job/${jobId}/shortlist`, { shortlisted });
    return response?.data;
};

export const submitAssessment = ({candidate_id, assessmentData, recordingUrl}) => axios.post(`/admin/candidate/questionnaire/${candidate_id}`,{ ...assessmentData, recordingUrl })

//PATCH
export const updateProfessionalDetails = async ({experience, noticePeriod, currentCTC, expectedCTC, hourlyRate , id, jobId}) => {
    const response = await axios.patch(`/admin/candidate/update-candidate/${id}/${jobId}`,{experience, noticePeriod, currentCTC, expectedCTC, hourlyRate });
    return response?.data
}

export const updateCandidateProfile = async ({mainId, updatedData}) => {
    const response = await axios.patch(`/admin/candidate/update-candidate-profile/${mainId}`, updatedData)
    return response.data
}