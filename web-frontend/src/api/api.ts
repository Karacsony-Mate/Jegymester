import { IScreenings } from "../interfaces/IScreenings";
import axiosInstance from "./axios.config";



const Screenings = {
    getScreenings: () => axiosInstance.get<IScreenings[]>("screenings"),
    
}

const Movies = {
    getMovies: () => axiosInstance.get<{ id: number; title: string; description: string; duration: number; genre: string }[]>(
        `movies`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval logic
            },
        }
    ),
};

const Auth = {
    login: (email: string, password: string) => axiosInstance.post<{token: string}>("/User/login", {email, password})
}

const api = {Screenings, Auth, Movies};

export default api;