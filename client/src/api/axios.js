import axios from "axios";

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

export default axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true
});