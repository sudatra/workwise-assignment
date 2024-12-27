import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()
  
    const handleSignup = async () => {
      try {
        const response = await axios.post('http://localhost:3001/users/signup', {
          username,
          password,
        });

        localStorage.setItem('userId', response.data.userId);
        console.log('Signed up:', response.data);

        router.replace('/dashboard');
      } catch (error) {
        setError('Error during signup');
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={handleSignup} className="w-full bg-blue-500 text-white p-2 mt-2">
            Signup
          </button>
        </div>
      </div>
    );
}

export default Signup