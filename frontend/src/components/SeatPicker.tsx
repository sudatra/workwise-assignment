import React from 'react';

const SeatPicker = ({ seats }: { seats: any[] }) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {seats.map((seat) => (
        <button
          key={seat.id}
          className={`p-2 ${seat.isReserved ? 'bg-gray-500' : 'bg-green-500'}`}
          disabled={seat.isReserved}
        >
          {seat.seatNumber}
        </button>
      ))}
    </div>
  );
};

export default SeatPicker;