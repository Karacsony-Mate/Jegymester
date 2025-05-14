import axios from './axios.config';
import { ITicket, ITicketPurchase, ITicketPurchaseOffline } from '../interfaces/ITicket';

export const getMyTickets = async (): Promise<ITicket[]> => {
  const response = await axios.get<ITicket[]>('/ticket');
  return response.data;
};

export const purchaseTicket = async (data: ITicketPurchase): Promise<ITicket> => {
  const response = await axios.post<ITicket>('/ticket/purchase', data);
  return response.data;
};

export const deleteTicket = async (id: number): Promise<void> => {
  await axios.delete(`/ticket/${id}`);
};

export const getTicketById = async (id: number): Promise<ITicket> => {
  const response = await axios.get<ITicket>(`/ticket/${id}`);
  return response.data;
};

export const purchaseOfflineTicket = async (data: ITicketPurchaseOffline): Promise<ITicket> => {
  const response = await axios.post<ITicket>('/ticket/purchase-offline', data);
  return response.data;
};
