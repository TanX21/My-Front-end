import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../Login.css'; // Reuse the same CSS

function ResetPassword() {
    const { state } = useLocation();  // Get email from state
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!state?.email) {
            toast.error('Invalid reset password request');
            navigate('/forgot-password');
        }
    }, [state, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('http://localhost:3005/api/user/reset-password', {
                email: state.email,
                newPassword
            });
            toast.success('Password reset successful');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[url(https://images3.alphacoders.com/130/thumb-1920-1305890.jpeg)] h-screen w-full items-center flex justify-center">
            <div className="child m-6">
                <div className="box1 p-5">
                    <h1 className="text-3xl text-white underline">Reset Password</h1>
                </div>

                <div>
                    {/* Display the email */}
                    <div>
                        <label htmlFor="email" className="text-white">Email: </label>
                        <span className="text-white">{state?.email}</span> {/* Display email */}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newPassword" className="text-white">New Password</label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        
                        <label htmlFor="confirmPassword" className="text-white">Confirm New Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        
                        <button className="lbtn" type="submit" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
