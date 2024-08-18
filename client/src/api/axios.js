import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8008/api/v1";

export default axios.create({
    baseURL,
});