import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
  
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        setToken(storedToken);
    }, [])

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3001/users/login', {
          username,
          password,
        });

        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        console.log('Logged in:', response.data);

        router.replace('/dashboard')
      } catch (error) {
        setError('Invalid credentials');
      }
    };
  
    return (
      !token ? (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 mt-2">
                Login
            </button>
            </div>
        </div>

      ) : (
        <div>
            <h1>Already logged in!!!</h1>
        </div>
      )
    );
}

export default Login