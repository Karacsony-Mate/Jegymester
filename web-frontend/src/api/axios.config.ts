import axios, { AxiosInstance } from "axios"
const baseURL: string = `${import.meta.env.VITE_REST_API_URL}/api/`;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor: minden kérés előtt frissíti a tokent
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;