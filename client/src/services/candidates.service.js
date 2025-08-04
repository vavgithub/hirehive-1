import axios from "./axios";

//GET
export const fetchOpenJobs = (page,companyId) => axios.get(`/candidates/jobs/open?page=${page}&companyId=${companyId ?? ''}`).then(res => res.data);

export const searchJobs = (query, page) => axios.get(`/candidates/jobs/searchJobs?jobTitle=${encodeURIComponent(query)}&page=${page}`).then(res => res.data);

export const disconnectTelegram = () => axios.post(`/candidates/disconnect-telegram`);

//POST
export const filterJobs = (filters, page) => axios.post('/candidates/filterJobs', { filters, page }).then(res => res.data);

export const filterSearchJobsCM = (query,filters,page,companyId) => axios.post('/candidates/filterSearchJobs', { filters , page , query , companyId : companyId ?? '' }).then(res => res.data);

export const incrementApplyClick = async (jobId) => {
    const response = await axios.post(`/candidates/${jobId}/increment-apply-click`);
    return response.data
}

export const submitDesignTask = async (taskData) => {
    const response = await axios.post('/candidates/submit-design-task', taskData)
    return response.data
}