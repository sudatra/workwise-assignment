'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatPicker from '../components/SeatPicker';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const [seats, setSeats] = useState<any[]>([]);
  const [seatCount, setSeatCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [highlightedSeats, setHighlightedSeats] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [fetchingSeats, setFetchingSeats] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(Number(storedUserId));
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    setToken(storedToken);
  }, [])
  
  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:3001/trains/seats');
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, [showPreview, fetchingSeats]);

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
      toast.error("You can only book between 1 and 7 seats.", {
        position: "top-center",
        hideProgressBar: false
      });

      return;
    }
    if (availableSeats.length < seatCount) {
      setError('Not enough seats available.');
      return;
    }
    const bestSeats = findBestSeats(availableSeats, seatCount);
    setHighlightedSeats(bestSeats);
    setShowPreview(true);

    toast.success("Successfully selected seats", {
        position: "top-center",
        hideProgressBar: false
    });
    setError('');
  };

  const handleSeatBooking = async () => {
    try {
        const response = await axios.post('http://localhost:3001/trains/book', {
            userId: userId,
            numberOfSeats: seatCount
        });

        setFetchingSeats(true);
        toast.success("Successfully selected seats", {
            position: "top-center",
            hideProgressBar: false
        });
        console.log('Booking Successfully created:', response.data);
    }
    catch(error) {
        setError('Error during seat booking');
        toast.error("Error Booking seats", {
            position: "top-center",
            hideProgressBar: false
        });
    }
    finally {
        setFetchingSeats(false)
    }
  }

  const handleBookingReset = async () => {
    try {
        const response = await axios.post('http://localhost:3001/trains/reset');

        toast.success("Successfully reset booking", {
            position: "top-center",
            hideProgressBar: false
        });
        console.log('Bookings Successfully reset:', response.data)
    }
    catch(error) {
        setError('Error resetting seats');
        toast.error("Error Resetting seats", {
            position: "top-center",
            hideProgressBar: false
        });
    }
  }

  return (
    token ? (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="p-4">
                <div className='flex flex-1 justify-between'>
                    <h2 className="text-2xl font-bold mb-6">Seat Booking</h2>

                    <div className='flex justify-between gap-2'>
                        <button 
                            onClick={() => { localStorage.removeItem('jwtToken'); localStorage.removeItem('userId'); router.replace('/login') }} 
                            className='rounded-md bg-blue-950 text-white p-2 h-[40px] text-md font-semibold'
                        >
                            Logout
                        </button>

                        <button
                            onClick={handleBookingReset}
                            className='rounded-md bg-blue-950 text-white p-2 h-[40px] text-md font-semibold'
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <SeatPicker seats={seats} highlightedSeats={highlightedSeats} />
            </div>

            <div className='p-4 flex flex-1 justify-center'>
                <div className='flex flex-col'>
                    <input 
                        type='text'
                        className='p-2 mb-2 border w-60 border-blue-950'
                        placeholder='Enter no of seats to book'
                        value={seatCount}
                        onChange={(e) => setSeatCount(Number(e.target.value))}
                    />

                    <div className='flex flex-1 justify-center gap-3'>
                        <button onClick={handlePreviewSeats} className='rounded-md bg-blue-950 text-white p-2 h-[50px] text-md font-semibold'>
                            Preview Seats
                        </button>

                        <button onClick={handleSeatBooking} className='bg-blue-950 rounded-md text-white p-2 h-[50px] text-md font-semibold'>
                            Book Seats
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