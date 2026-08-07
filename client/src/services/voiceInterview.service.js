import axios from "./axios";

const BASE = "/candidate/voice-interview";

export const getOrCreateVoiceInterviewSession = (jobId) =>
  axios.get(`${BASE}/${jobId}`).then((res) => res.data);

export const submitVoiceInterviewAnswer = (jobId, { audioBlob, durationSeconds, selectedAnswer } = {}) => {
  if (audioBlob) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "answer.webm");
    if (durationSeconds != null) {
      formData.append("durationSeconds", String(durationSeconds));
    }
    return axios
      .post(`${BASE}/${jobId}/answer`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  }

  return axios
    .post(`${BASE}/${jobId}/answer`, { selectedAnswer })
    .then((res) => res.data);
};
