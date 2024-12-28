'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatPicker from '../components/SeatPicker';

const Dashboard = () => {
  const [seats, setSeats] = useState<any[]>([]);
  const [seatCount, setSeatCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [highlightedSeats, setHighlightedSeats] = useState<number[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(Number(storedUserId));
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    setToken(storedToken);
  }, [])

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trains/seats');
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    fetchSeats();
  }, []);

  const findBestSeats = (availableSeats: any[], numberOfSeats: number) => {
    const rows: any[] = availableSeats.reduce((acc: any, seat: any) => {
      if(!acc[seat.rowNumber]) {
        acc[seat.rowNumber] = [];
      }

      acc[seat.rowNumber].push(seat);
      return acc;
    }, {});

    for (const row of Object.values(rows)) {
      if (row.length >= numberOfSeats) {
        return row.slice(0, numberOfSeats).map((seat: any) => seat.id);
      }
    }

    return availableSeats.slice(0, numberOfSeats).map((seat: any) => seat.id);
  };

  const handlePreviewSeats = () => {
    const availableSeats = seats.filter((seat) => !seat.isReserved);
    if(seatCount < 1 || seatCount > 7) {
      setError('You can only book between 1 and 7 seats.');
      return;
    }
    if (availableSeats.length < seatCount) {
      setError('Not enough seats available.');
      return;
    }
    const bestSeats = findBestSeats(availableSeats, seatCount);
    setHighlightedSeats(bestSeats);
    setError('');
  };

  const handleSeatBooking = async () => {
    try {
        const response = await axios.post('http://localhost:3001/trains/book', {
            userId: userId,
            numberOfSeats: seatCount
        });

        console.log('Booking Successfully created:', response.data);
    }
    catch(error) {
        setError('Error during seat booking');
    }
  }

  return (
    token ? (
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Seat Booking</h2>
                <SeatPicker seats={seats} highlightedSeats={highlightedSeats} />
            </div>

            <div className='p-4 flex flex-1 justify-center'>
                <div className='flex flex-col'>
                    <input 
                        type='text'
                        className='p-2 mb-2 border'
                        placeholder='Enter no of seats to book'
                        value={seatCount}
                        onChange={(e) => setSeatCount(Number(e.target.value))}
                    />
                    {error && <p className="text-red-500">{error}</p>}

                    <div className='flex flex-1 justify-end gap-2'>
                        <button onClick={handlePreviewSeats} className='rounded-md bg-blue-500 text-white px-2 h-full'>
                            Preview Seats
                        </button>

                        <button onClick={handleSeatBooking} className='bg-blue-500 rounded-md text-white px-2 h-full'>
                            Book
                        </button>
                    </div>

                </div>
            </div>
        </>
    ) : (
        <div>
            <h1>Please Login!!!</h1>
        </div>
    )
  );
};

export default Dashboard;