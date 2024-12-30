import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SeatPicker = ({ seats, highlightedSeats }: { seats: any[]; highlightedSeats: number[] }) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`p-2 text-center font-semibold rounded-md w-30
            ${seat.isReserved ? 'bg-gray-500 pointer-events-none' : highlightedSeats.includes(seat.id) ? 'bg-yellow-500' : 'bg-green-500'}`
        }
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default SeatPicker;