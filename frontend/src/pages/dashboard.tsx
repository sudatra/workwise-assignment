'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatPicker from '../components/SeatPicker';


const Dashboard = () => {
  const [seats, setSeats] = useState<any[]>([]);
  const [seatCount, setSeatCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(Number(storedUserId));
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
    <>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Seat Booking</h2>
            <SeatPicker seats={seats} />
        </div>

        <div className='p-4 flex flex-1 justify-center'>
            <div className='flex gap-2 justify-between'>
                <input 
                    type='number'
                    className='p-2 mb-2 border'
                    placeholder='Enter no of seats to book'
                    value={seatCount}
                    onChange={(e) => setSeatCount(Number(e.target.value))}
                />
                {error && <p className="text-red-500">{error}</p>}

                <button onClick={handleSeatBooking} className='w-full bg-blue-500 text-white px-2 h-full'>
                    Book
                </button>
            </div>
        </div>
    </>
  );
};

export default Dashboard;