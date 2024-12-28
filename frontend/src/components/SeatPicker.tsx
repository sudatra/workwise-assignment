import React, { useEffect } from 'react';

const SeatPicker = ({ seats, highlightedSeats }: { seats: any[]; highlightedSeats: number[] }) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {seats.map((seat) => (
        <button
          key={seat.id}
          className={`p-2 ${seat.isReserved ? 'bg-gray-500' : highlightedSeats.includes(seat.id) ? 'bg-yellow-500' : 'bg-green-500'}`}
          disabled={seat.isReserved}
        >
          {seat.id}
        </button>
      ))}
    </div>
  );
};

export default SeatPicker;