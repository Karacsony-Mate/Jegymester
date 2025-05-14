export interface ITicket {
  id: number;
  screeningId: number;
  userId?: number;
  price: number;
  purchaseDate: string; // ISO string
  isConfirmed: boolean;
}

export interface ITicketPurchase {
  screeningId: number;
  userId?: number;
  price: number;
}

export interface ITicketPurchaseOffline {
  screeningId: number;
  price: number;
}
