import axios, { AxiosInstance } from "axios"

const baseURL: string = `${import.meta.env.VITE_REST_API_URL}/api/`;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
})

export default axiosInstance;