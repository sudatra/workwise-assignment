import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTrainSeats = async () => {
  const rows = 12;
  const seatsPerRow = 7;
  const lastRowSeats = 3;

  // Generate 80 train seats
  for (let row = 1; row <= rows; row++) {
    const seatsInRow = row === rows ? lastRowSeats : seatsPerRow;
    for (let seat = 1; seat <= seatsInRow; seat++) {
      await prisma.trainSeat.create({
        data: {
          rowNumber: row,
          seatNumber: seat,
        },
      });
    }
  }
  console.log('80 seats have been successfully created');
};

const main = async () => {
  try {
    await createTrainSeats();
  } catch (e) {
    console.error('Error seeding data: ', e);
  } finally {
    await prisma.$disconnect();
  }
};

main();
