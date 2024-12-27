import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatPicker from '../components/SeatPicker';

const Dashboard = () => {
  const [seats, setSeats] = useState([]);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seat Booking</h2>
      <SeatPicker seats={seats} />
    </div>
  );
};

export default Dashboard;