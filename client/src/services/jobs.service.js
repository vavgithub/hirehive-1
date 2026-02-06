import axios from "./axios";
const JOBS_BASE_URL = '/jobs'

//GET
export const fetchJobs = (page, status, pinned) => 
    axios.get(`${JOBS_BASE_URL}/jobs?page=${page}&status=${status}&pinned=${JSON.stringify(pinned)}`).then(res => res.data);


export const fetchOverallStats = () => axios.get(`${JOBS_BASE_URL}/stats/overall`).then(res => res.data.data);

export const fetchOverallJobStats = (mainId) => axios.get(`${JOBS_BASE_URL}/stats/job/${mainId}`).then(res => res.data)

export const fetchAssessmentTemplates = async() => {
    const response = await axios.get(`${JOBS_BASE_URL}/get-assessment-templates`, { withCredentials: true });
    return response.data;
}

export const fetchjobsById = async (id) => {
    const response = await axios.get(`${JOBS_BASE_URL}/getJobById/${id}`)
    return response.data
}

//POST
export const filterSearchJobs = (query, filters, page, status) => axios.post(`${JOBS_BASE_URL}/filterSearchJobs`, { filters, page, status, query }).then(res => res.data);

export const createJob = async (jobData) => {
    const response = await axios.post(`${JOBS_BASE_URL}/createJobs`, jobData)
    return response.data
}

//DELETE
export const deleteJob = async (jobId) => {
    const response = await axios.delete(`${JOBS_BASE_URL}/deleteJob/${jobId}`)
    return response.data
}

//PUT
export const draftJob = async (jobId) => {
    const response = await axios.put(`${JOBS_BASE_URL}/draftJob/${jobId}`)
    return response.data
}

export const reOpenJob = async (jobId) => {
    const response = await axios.put(`${JOBS_BASE_URL}/reOpen/${jobId}`)
    return response.data
}

export const unArchiveJob = async (jobId) => {
    const response = await axios.put(`${JOBS_BASE_URL}/unarchiveJob/${jobId}`);
    return response.data
}

export const closeJob = async ({ jobId, reason }) =>{
    const response = await axios.put(`${JOBS_BASE_URL}/closeJob/${jobId}`, { reason })
    return response.data
}

export const updateJob = async ({id,updatedJob}) => {
    const response = await axios.put(`${JOBS_BASE_URL}/editJob/${id}`, updatedJob)
    return response.data
}
