import { IMovies } from "../interfaces/IMovies";
import { IScreenings } from "../interfaces/IScreenings";
import { ICreateScreenings } from "../interfaces/ICreateScreenings";
import { ICreateMovies } from "../interfaces/ICreateMovies";
import axiosInstance from "./axios.config";
import * as ticketApi from "../api/tickets";



const Screenings = {
    getScreenings: () => axiosInstance.get<IScreenings[]>("screenings"),
    createScreening: (data: ICreateScreenings) =>axiosInstance.post("screenings", data),
    updateScreening: (id: number, data: ICreateScreenings) => axiosInstance.put(`screenings/${id}`, data),
    getScreeningById: (id: number) =>axiosInstance.get<IScreenings>(`screenings/${id}`),
    deleteScreeningById: (id: number) => axiosInstance.delete(`screenings/${id}`),
}

const Movies = {
    getMovies: () => axiosInstance.get<IMovies[]>("movies"),
    createMovie: (data: ICreateMovies) =>axiosInstance.post("movies", data),
    updateMovie: (id: number, data: ICreateMovies) => axiosInstance.put(`movies/${id}`, data),
    getMovieById: (id: number) =>axiosInstance.get<IMovies>(`movies/${id}`),
    deleteMovieById: (id: number) => axiosInstance.delete(`movies/${id}`),
};

const User = {
    registerUser: (name: string, email: string, password: string, phoneNumber: string, roleIds: number[]) =>
        axiosInstance.post("User/register", { name, email, password, phoneNumber, roleIds }),
    changeUserData: (name: string, email: string, phoneNumber: string, roleIds: number[]) =>
        axiosInstance.put("User/update-profile", { name, email, phoneNumber, roleIds }),
};

const Auth = {
    login: (email: string, password: string) => axiosInstance.post<{token: string}>("/User/login", {email, password})
}

const Tickets = {
    getMyTickets: ticketApi.getMyTickets,
    purchaseTicket: ticketApi.purchaseTicket,
    deleteTicket: ticketApi.deleteTicket,
    getTicketById: ticketApi.getTicketById,
    purchaseOfflineTicket: (data: any) => axiosInstance.post('/ticket/purchase-offline', data),
    getAllTickets: ticketApi.getAllTickets,
    getTicketsByUserId: ticketApi.getTicketsByUserId,
};

const api = {Screenings, Movies, User, Tickets, Auth};

export default api;