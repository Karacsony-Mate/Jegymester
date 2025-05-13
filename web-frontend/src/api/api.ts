import { IMovies } from "../interfaces/IMovies";
import { IScreenings } from "../interfaces/IScreenings";
import { ICreateScreenings } from "../interfaces/ICreateScreenings";
import axiosInstance from "./axios.config";



const Screenings = {
    getScreenings: () => axiosInstance.get<IScreenings[]>("screenings"),
    createScreening: (data: ICreateScreenings) =>axiosInstance.post("screenings", data),
    updateScreening: (id: number, data: ICreateScreenings) => axiosInstance.put(`screenings/${id}`, data),
    getScreeningById: (id: number) =>axiosInstance.get<IScreenings>(`screenings/${id}`),
}

const Movies = {
    getMovies: () => axiosInstance.get<IMovies[]>("movies")
};

const Auth = {
    login: (email: string, password: string) => axiosInstance.post<{token: string}>("/User/login", {email, password})
}

const api = {Screenings, Auth, Movies};

export default api;