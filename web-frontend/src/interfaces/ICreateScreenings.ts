export interface ICreateScreenings {
  movieId: number;
  dateTime: string; // ISO string helyi időzónában (pl. "2025-06-10T18:30")
  location: string;
  availableSeats: number;
}