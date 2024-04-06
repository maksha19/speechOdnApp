// Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !mobile || !password || !repeatPassword) {
            alert('Please fill in all required fields');
            return;
        }

        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('YOUR_BACKEND_SIGNUP_API_ENDPOINT', {
                name,
                email,
                mobile,
                password
            });
            if (response.data.success) {
                navigate('/home');
            } else {
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred while signing up');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="block mb-2">Name</label>
                            <input type="text" className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Email (optional)</label>
                            <input type="email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Mobile Number</label>
                            <input type="text" className="border p-2 w-full" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input type="password" className="border p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Repeat Password</label>
                            <input type="password" className="border p-2 w-full" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">Signup</button>
                    </form>
                </div>
                <div className="text-center">
                    <Link to="/" className="text-blue-500">Back to login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
