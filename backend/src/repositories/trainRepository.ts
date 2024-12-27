import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllSeats = () => {
    return prisma.trainSeat.findMany();
}

export const getAvailableSeats = () => {
    return prisma.trainSeat.findMany({
        where: { isReserved: false }
    })
}

export const findBestSeats = (availableSeats: any[], numberOfSeats: number) => {
    const rows: any[] = availableSeats.reduce((acc: any, seat: any) => {
        if(!acc[seat.rowNumber]) {
            acc[seat.rowNumber] = [];
        }

        acc[seat.rowNumber].push(seat);
        return acc
    }, {});

    for(const row of Object.values(rows)) {
        if(row.length >= numberOfSeats) {
            return row.slice(0, numberOfSeats)
        }
    }

    return availableSeats.slice(0, numberOfSeats);
}

export const createBooking = async (userId: number, seats: any[]) => {
    const seatIds = seats.map((seat) => seat.id);

    await prisma.trainSeat.updateMany({
        where: { id: { in: seatIds } },
        data: { isReserved: true, reservedBy: userId }
    });

    return prisma.booking.create({
        data: {
            userId,
            seatIds: JSON.stringify(seatIds)
        }
    });
}

export const resetAllSeats = async () => {
    await prisma.trainSeat.updateMany({
        data: { isReserved: false, reservedBy: null }
    });
}