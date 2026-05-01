import axios from "./axios";

//GET
export const fetchAssignedCandidates = async () => {
  const response = await axios.get('/dr/assigned-candidates');
  return response.data;
};

export const fetchUnderReviewStats = async () => {
  const response = await axios.get('/dr/under-review-stats');
  return response.data.stats;
};

//PUT
export const updateAssignee = (candidateId, jobId, stage, assigneeId) => axios.put('/dr/update-assignee', { candidateId, jobId, stage, assigneeId })

export const updateMultipleAssignee = (candidateId, jobId, stage, assigneeId) => axios.put('/dr/update-multiple-assignee', { candidateId, jobId, stage, assigneeId })

//POST
export const autoAssignPortfolio = async ({ jobId, reviewerIds, budgetMin, budgetMax }) =>{
    const response = await axios.post('/dr/auto-assign-portfolios', { jobId, reviewerIds, budgetMin, budgetMax })
    return response.data
}

export const submitReview = async ({ candidateId, reviewData }) => {
  const response = await axios.post('/dr/submit-score-review', {
    candidateId,
    ...reviewData,
  });
  return response.data;
};