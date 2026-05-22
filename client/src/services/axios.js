import axios from "axios";
import * as Sentry from "@sentry/react";

const getBaseUrl = () => {
  switch (import.meta.env.MODE) {
    case 'development':
      return import.meta.env.VITE_API_BASE_URL_DEVELOPMENT;
    case 'staging':
      return import.meta.env.VITE_API_BASE_URL_STAGING;
    case 'production':
      return import.meta.env.VITE_API_BASE_URL_PRODUCTION;
    default:
      return import.meta.env.VITE_API_BASE_URL_DEVELOPMENT;
  }
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    // Don't report 401 (unauthenticated) and 403 (forbidden) to Sentry — expected errors
    if (status !== 401 && status !== 403) {
      Sentry.captureException(error, {
        tags: {
          file: "axios.js",
          action: error?.config?.url,
          method: error?.config?.method,
          status: status,
        },
        extra: {
          url: error?.config?.url,
          method: error?.config?.method,
          status: status,
          response: error?.response?.data,
        },
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
