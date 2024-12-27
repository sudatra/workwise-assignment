import * as trainRepository from '../repositories/trainRepository'
import { BookingRequest, BookingResponse } from '../interfaces/trainInterfaces'

export const getSeats = async () => {
    return trainRepository.getAllSeats();
}

export const bookSeats = async (data: BookingRequest): Promise<BookingResponse> => {
    const { userId, numberOfSeats } = data;
    if(numberOfSeats < 1 || numberOfSeats > 7) {
        throw new Error("You can only book between 1 and 7 Seats at a time");
    }

    const availableSeats = await trainRepository.getAvailableSeats();
    if(availableSeats.length < numberOfSeats) {
        throw new Error('Not enough seats available.');
    }

    const seatsToBook = trainRepository.findBestSeats(availableSeats, numberOfSeats);
    const booking = await trainRepository.createBooking(userId, seatsToBook);

    return {
        bookingId: booking.id,
        seatsBooked: seatsToBook
    }
}

export const resetSeats = async () => {
    await trainRepository.resetAllSeats();
}