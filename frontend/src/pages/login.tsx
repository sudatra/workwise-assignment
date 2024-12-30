import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

        toast.success('Logged in', {
            position: "top-center",
            hideProgressBar: false,
        })
      } catch (error) {
        toast.error('Unable to login', {
            position: "top-center",
            hideProgressBar: false
        })
      }
    };
  
    return (
      !token ? (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className='flex flex-1 h-screen justify-center items-center'>
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

                    <div>
                        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 mt-2">
                            Login
                        </button>

                        <div className='flex gap-1 justify-center mt-2'>
                            <p className='font-semibold'>Don't have an account?</p>
                            <Link href='/signup' className='font-semibold text-violet-800'>Signup</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>

      ) : (
        <div className='flex flex-1 h-screen justify-center items-center'>
            <p className='font-bold text-lg'>Already logged in!!!</p>
        </div>
      )
    );
}

export default Login