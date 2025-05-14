import { IMovies } from "../interfaces/IMovies";
import { IScreenings } from "../interfaces/IScreenings";
import { ICreateScreenings } from "../interfaces/ICreateScreenings";
import { ICreateMovies } from "../interfaces/ICreateMovies";
import axiosInstance from "./axios.config";



const Screenings = {
    getScreenings: () => axiosInstance.get<IScreenings[]>("screenings"),
    createScreening: (data: ICreateScreenings) =>axiosInstance.post("screenings", data),
    updateScreening: (id: number, data: ICreateScreenings) => axiosInstance.put(`screenings/${id}`, data),
    getScreeningById: (id: number) =>axiosInstance.get<IScreenings>(`screenings/${id}`),
}

const Movies = {
    getMovies: () => axiosInstance.get<IMovies[]>("movies"),
    createMovie: (data: ICreateMovies) =>axiosInstance.post("movies", data),
    updateMovie: (id: number, data: ICreateMovies) => axiosInstance.put(`movies/${id}`, data),
    getMovieById: (id: number) =>axiosInstance.get<IMovies>(`screenings/${id}`),
};

const User = {
    changeUserData: (email: string, name: string, phoneNumber: string, roleIds: number[]) =>
        axiosInstance.put("User/update-profile", { email, name, phoneNumber, roleIds }),
};

const Auth = {
    login: (email: string, password: string) => axiosInstance.post<{token: string}>("/User/login", {email, password})
}

const api = {Screenings, Auth, Movies, User};

export default api;