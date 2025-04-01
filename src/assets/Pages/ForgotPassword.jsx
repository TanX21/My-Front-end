import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import '../../Login.css';  // Adjust the path accordingly

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3005/api/user/forgot-password', { email });
            toast.success('OTP sent to your email');
            // Navigate to ForgetPasswordOtp after OTP is sent, passing email via state
            navigate('/reset-verification', { state: { email } });  // Pass email through state
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className='bg-[url(https://images3.alphacoders.com/130/thumb-1920-1305890.jpeg)] h-screen w-full items-center flex justify-center'>
            <div className='child'>
                <div className='box1'>
                    <h1 className='text-3xl text-white underline'>Forgot Password</h1>
                </div>

                <div className='box2'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="Enter your email"
                        />
                        <button className='lbtn' type="submit">Send OTP</button>
                    </form>
                </div>
                    <Link to="/login" className="text-blue-600 hover:underline mt-4 inline-block">Back to Login</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
