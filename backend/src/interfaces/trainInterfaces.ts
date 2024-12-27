export interface Seat {
    id: number;
    rowNumber: number;
    seatNumber: number;
    isReserved: boolean;
    reservedBy?: number | null;
  }
  
  export interface BookingRequest {
    userId: number;
    numberOfSeats: number;
  }
  
  export interface BookingResponse {
    bookingId: number;
    seatsBooked: Seat[];
  }