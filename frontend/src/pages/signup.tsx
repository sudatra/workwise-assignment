import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        setToken(storedToken);
    }, [])

  
    const handleSignup = async () => {
      try {
        const response = await axios.post('http://localhost:3001/users/signup', {
          username,
          password,
        });

        localStorage.setItem('userId', response.data.userId);
        console.log('Signed up:', response.data);

        router.replace('/dashboard');

        toast.success('Logged in', {
            position: "top-center",
            hideProgressBar: false,
        })
      } catch (error) {
        toast.error('Error in signing up', {
            position: "top-center",
            hideProgressBar: false
        })
      }
    };
  
    return (
      !token ? (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className='h-screen flex flex-1 justify-center items-center'>
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

                    <div>
                        <button onClick={handleSignup} className="w-full bg-blue-500 text-white p-2 mt-2">
                            Signup
                        </button>
                        
                        <div className='flex gap-1 justify-center mt-2'>
                            <p className='font-semibold'>Already have an account?</p>
                            <Link href='/login' className='font-semibold text-violet-800'>Login</Link>
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

export default Signup