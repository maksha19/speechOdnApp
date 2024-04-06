// Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        // Simulating successful login in local environment
        if (process.env.NODE_ENV === 'development') {
            // Navigate to home page directly in local environment
            navigate('/home');
            return;
        }

        try {
            const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', { username, password });
            // Assuming backend returns a success message upon successful login
            if (response.data.success) {
                // Redirect to home page upon successful login
                navigate('/home');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred while logging in');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block mb-2">Username</label>
                            <input type="text" className="border p-2 w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input type="password" className="border p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">Login</button>
                    </form>
                </div>
                <div className="text-center">
                    <Link to="/signup" className="text-blue-500">Sign up for an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
