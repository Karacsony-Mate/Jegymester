import { IScreenings } from "../interfaces/IScreenings";
import axiosInstance from "./axios.config";

const Screenings = {
    getScreenings: () => axiosInstance.get<IScreenings[]>("screenings")
}

const Auth = {
    login: (email: string, password: string) => axiosInstance.post<{token: string}>("/User/login", {email, password})
}

const api = {Screenings, Auth};

export default api;