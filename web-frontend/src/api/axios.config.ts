import axios, { AxiosInstance } from "axios"

const baseURL: string = `${import.meta.env.VITE_REST_API_URL}/api/`;

const axiosInstance: AxiosInstance = axios.create({
    baseURL
})

export default axiosInstance;