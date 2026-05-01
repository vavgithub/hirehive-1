import axios from "./axios";

const API_URL = "/company";

export const getMultiReviewerSettings = async () => {
  const response = await axios.get(`${API_URL}/multi-reviewer-settings`, { withCredentials: true });
  return response.data;
};

export const updateMultiReviewerSettings = async ({ enabled, jobProfiles }) => {
  const response = await axios.put(
    `${API_URL}/multi-reviewer-settings`,
    { enabled, jobProfiles },
    { withCredentials: true }
  );
  return response.data;
};

