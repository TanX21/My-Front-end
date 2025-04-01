import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Signup.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../../axiosIntance';

function Signup() {
    // const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // Added state for confirm password
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    // Handle signup form submission
    async function handleSubmit(e) {
        e.preventDefault();

        // Check if profile picture is uploaded
        if (!profilePicture) {
            toast.error('Please upload a profile picture');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture);

        try {
            const res = await api.post(
                '/user/signup',
                formData,
                {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    },
                    withCredentials: true,
                }
            );
            // console.log("Signup Response:", res.data);

            if (res.status === 201) {
                toast.success("Sign-up successful, OTP sent to your email.");
                navigate('/verification', { state: { email } }); // Passing email to OTP page
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }

    // Handle the profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Handle clicking on profile picture for upload
    const handleProfilePictureClick = () => {
        document.getElementById('profilePictureInput').click();
    };
    
    return (
        <div className='bg-[url(https://images3.alphacoders.com/130/thumb-1920-1305890.jpeg)] h-screen w-full items-center flex justify-center'>
            <div className='childx'>
                <div className='box1'>
                    <h1 className='text-3xl text-white underline'>Sign-up</h1>
                </div>

                <div className='box2'>
                    <form onSubmit={handleSubmit}>
                        {/* Display the profile picture preview or placeholder */}
                        <div className='profile-image-preview'>
                            {imagePreview ? (
                                <div className="profile-picture-container">
                                    <img src={imagePreview} alt="Profile Preview" className="profile-picture" />
                                    <div className="change-icon" onClick={handleProfilePictureClick}>
                                        <span className="change-icon-text">✏️</span> {/* Edit icon */}
                                    </div>
                                </div>
                            ) : (
                                <div className="profile-picture-placeholder cursor-pointer" onClick={handleProfilePictureClick}>
                                    <span className="profile-icon">+</span> {/* "+" icon */}
                                </div>
                            )}
                        </div>
                           
                        {/* Hidden file input */}
                        <input 
                            type="file" 
                            id="profilePictureInput" 
                            onChange={handleProfilePictureChange} 
                            style={{ display: 'none' }} // Hide the file input
                        />

                        <label htmlFor="username">Username</label>
                        <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                        
                        <label htmlFor="email">Email</label>
                        <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" required onChange={(e) => setPassword(e.target.value)} />

                        {/* Confirm Password */}
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            required 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />

                        <button className='sbtn cursor-pointer' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
