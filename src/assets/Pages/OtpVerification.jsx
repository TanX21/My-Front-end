import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function OtpVerification() {
    const { state } = useLocation(); // Get the email from the previous page
    const [email, setEmail] = useState(state?.email || ''); // Email from the state
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(() => {
        const storedTimer = localStorage.getItem('otpTimer');
        // console.log('Stored Timer:', storedTimer);
        return storedTimer && parseInt(storedTimer, 10) > 0 ? parseInt(storedTimer, 10) : 300;  // Set to 300 seconds if storedTimer is invalid or 0
    });
    const [loading, setLoading] = useState(false); // Loading state for preventing multiple submits
    const navigate = useNavigate();

    useEffect(() => {
        if (!state?.email) {
            toast.error('Invalid request! Login');
            navigate('/login');
        }
    }, [state, navigate]);

    // Reset timer in localStorage if invalid or 0
    useEffect(() => {
        const storedTimer = localStorage.getItem('otpTimer');
        if (storedTimer === null || storedTimer === '0') {
            localStorage.setItem('otpTimer', '300');
        }
    }, []);

    // Start the countdown timer only when the page is loaded or refreshed
    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    // console.log('Decremented Timer:', newTimer);  // Log the new timer value
                    localStorage.setItem('otpTimer', newTimer);  // Store updated timer value in localStorage
                    return newTimer;
                });
            }, 1000);
        } else {
            // OTP expired, show error toast and redirect
            toast.error('OTP has expired. Please sign up again.');
            navigate('/signup');
        }

        // Cleanup interval on component unmount or when timer reaches 0
        return () => clearInterval(interval);
    }, [timer, navigate]);

    // Format the remaining time to MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleOtpSubmit = useCallback(async (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        if (loading) return; // If already loading, prevent further submission
    
        console.log("Email:", email, "OTP:", otp); // Debug log
    
        setLoading(true); // Set loading to true
    
        try {
            const res = await axios.post(
                'http://localhost:3005/api/user/verify-otp',
                { email, otp }
            );
    
            if (res.status === 200) {
                toast.success('OTP verified successfully.');
                navigate('/login'); // Redirect to login page after successful verification
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Invalid OTP or error occurred.');
        } finally {
            setLoading(false); // Reset loading state
        }
    }, [email, otp, navigate, loading]);

    useEffect(() => {
        const otpInput = document.getElementById('otp-input');
        otpInput?.focus(); // Auto-focus OTP input
    }, []);

    return (
        <div className='bg-[url(https://images3.alphacoders.com/130/thumb-1920-1305890.jpeg)] h-screen w-full items-center flex justify-center'>
            <div className='childx'>
                <div className='box1'>
                <h3 className='text-12px text-emerald-400 underline p-0 m-0'>Sign-up</h3>
                    <h1 className='text-3xl text-white underline'>OTP Verification</h1>
                </div>

                <div className='box2'>
                    <form onSubmit={handleOtpSubmit}>
                        {/* Display the email the user is verifying */}
                        <div>
                            <label htmlFor="email" className="text-white">Email: </label>
                            <span>{email}</span> {/* Display email */}
                        </div>

                        <label htmlFor="otp" className="text-white">Enter OTP</label>
                        <input
                            id="otp-input"
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                            placeholder="Enter the OTP"
                        />
                        <div>
                            <p className="text-white p-3">Time Remaining: {formatTime(timer)}</p>
                        </div>
                        <button
                            className="cursor-pointer  bg-emerald-500 p-1.5"
                            type="submit"
                            disabled={timer === 0 || loading} // Disable when timer is 0 or during loading
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OtpVerification;
