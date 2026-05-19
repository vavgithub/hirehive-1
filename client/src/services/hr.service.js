import axios from "./axios";
import * as Sentry from '@sentry/react';
const HR_BASE_URL = '/hr'

//GET
export const fetchTotalScore = async (candidateId, jobId) => {
    const { data } = await axios.get(`${HR_BASE_URL}/candidate/${candidateId}/job/${jobId}/scores`);
    return data;
}

export const fetchTaskPresets = async (jobProfile) => {
    const response = await axios.post(`${HR_BASE_URL}/get-task-presets`,{ jobProfile }, { withCredentials: true });
    return response.data;
}

//POST
export const saveTaskPresets = async ({title,level,jobProfile,htmlString}) => {
    const response = await axios.post(`${HR_BASE_URL}/save-custom-task-presets`,{ title,level,jobProfile,htmlString }, { withCredentials: true });
    return response.data;
}
export const rejectCandidate  = async ({ candidateId, jobId, rejectionReason, scheduledDate , scheduledTime }) => {
    const response = await axios.post(HR_BASE_URL + '/reject-candidate', { candidateId, jobId, rejectionReason, scheduledDate , scheduledTime })
    return response.data;
}

export const moveCandidate = async ({candidateId, jobId, currentStage }) => {
    const response = await axios.post(HR_BASE_URL + '/move-candidate', { candidateId, jobId, currentStage })
    return response.data
}

export const moveMultipleCandidates = async (candidateData) => {
    const response = await axios.post(`${HR_BASE_URL}/move-multiple-candidates`,{candidateData})
    return response.data;
} 

export const rejectMultipleCandidates = async (candidateData) => {
    const response = await axios.post(`${HR_BASE_URL}/reject-multiple-candidates`,{candidateData})
    return response.data;
} 

export const assignReviewerForCandidates = async (candidateData,assigneeId) => {
    const response = await axios.post(`${HR_BASE_URL}/update-assignee-multiple-candidates`,{candidateData,assigneeId})
    return response.data;
} 

export const rateMultipleCandidates = async (candidateData,rating) => {
    const response = await axios.post(`${HR_BASE_URL}/rate-multiple-candidates`,{candidateData,rating})
    return response.data;
} 

export const noShowCandidate = async ({ candidateId, jobId, currentStage}) => {
    const response = await axios.post(HR_BASE_URL + '/no-show', { candidateId, jobId, currentStage})
    return response.data
}

export const updateCandidateRating = async ({ candidateId, jobId, rating }) =>{
    const response = await axios.post(HR_BASE_URL + '/update-candidate-rating', { candidateId, jobId, rating })
    return response.data
}

export const scheduleCall = async (scheduleData) => {
    const response = await axios.post(HR_BASE_URL + '/schedule-call', {...scheduleData,})
    return response.data
}

export const rescheduleCall = async (rescheduleData) => {
    const response = await axios.post(HR_BASE_URL + '/reschedule-call', {...rescheduleData})
    return response.data
}

export const submitBudgetScore = async ({ candidateId, jobId, stage, score }) => {
    const response = await axios.post(HR_BASE_URL + '/submit-budget-score', { candidateId, jobId, stage, score })
    return response.data
}

export const scoreRoundTwo = async (scoreData) => {
    const response = await axios.post(HR_BASE_URL + '/score-round-two', scoreData)
    return response.data
}

export const sendDesignTask = async (taskData) => {
    const response = await axios.post(HR_BASE_URL + '/send-design-task', taskData)
    return response.data
}

export const updateStatus = async (candidateId,jobId,status) => {
    try {       
        const response = await axios.post(`${HR_BASE_URL}/change-status/${candidateId}/${jobId}`,{status})
        return response.data
    } catch (error) {
        Sentry.captureException(error, { extra: { file: "hr.service.js", action: "statusUpdate", role: "admin" } });
        // console.log("Error in status update",error.response.data);
        return false
    }
};

export const undoStageActions = async ({candidateId,jobId}) => {
    const response = await axios.post(HR_BASE_URL + '/undo-action', { candidateId, jobId})
    return response.data
}