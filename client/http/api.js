import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8008/api",
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

export const login = async (data) => {
    try {
        const response = await api.post("/users/login", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}