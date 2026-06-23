import axios from './axios';

const API_URL = '/billing';

export const createCheckoutSession = async ({ interval, seatCount }) => {
  const response = await axios.post(
    `${API_URL}/create-checkout`,
    { interval, seatCount },
    { withCredentials: true }
  );
  return response.data;
};

export const getSubscription = async () => {
  const response = await axios.get(`${API_URL}/subscription`, { withCredentials: true });
  return response?.data;
};

export const getInvoices = async () => {
  const response = await axios.get(`${API_URL}/invoices`, { withCredentials: true });
  return response?.data;
};

export const getPaymentMethod = async () => {
  const response = await axios.get(`${API_URL}/payment-method`, { withCredentials: true });
  return response?.data;
};

export const createBillingPortalSession = async () => {
  const response = await axios.post(`${API_URL}/portal`, {}, { withCredentials: true });
  return response?.data;
};

export const cancelSubscription = async ({ immediate = false } = {}) => {
  const response = await axios.post(
    `${API_URL}/cancel`,
    { immediate },
    { withCredentials: true }
  );
  return response?.data;
};

export const previewSeatChange = async ({ seatCount }) => {
  const response = await axios.post(
    `${API_URL}/preview-seat-change`,
    { seatCount },
    { withCredentials: true }
  );
  return response.data;
};

export const updateSeats = async ({ seatCount }) => {
  const response = await axios.post(
    `${API_URL}/update-seats`,
    { seatCount },
    { withCredentials: true }
  );
  return response?.data;
};

export const previewBillingIntervalChange = async ({ interval }) => {
  const response = await axios.post(
    `${API_URL}/preview-interval-change`,
    { interval },
    { withCredentials: true }
  );
  return response.data;
};

export const switchBillingInterval = async ({ interval }) => {
  const response = await axios.post(
    `${API_URL}/switch-interval`,
    { interval },
    { withCredentials: true }
  );
  return response?.data;
};

export const startTrial = async () => {
  const response = await axios.post(`${API_URL}/start-trial`, {}, { withCredentials: true });
  return response?.data;
};
