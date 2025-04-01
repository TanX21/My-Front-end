import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../Login.css'; // Adjust the path accordingly
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../../axiosIntance';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post(
        '/user/login',
        { username, password },
        {
          headers: {
            "Content-Type": 'application/json',
          },
          withCredentials: true,  // Allow cookies if your backend uses cookies for sessions
        }
      );

      if (res.status === 200) {
        // Store the token and user role in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user.role);  // Save role in localStorage

        toast.success("Login successful");

        // Redirect user based on their role
        if (res.data.user.role === 'admin') {
          navigate('/admin'); // Navigate to admin dashboard
        } else {
          navigate('/');  // Redirect to normal user home page
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className='bg-[url(https://images3.alphacoders.com/130/thumb-1920-1305890.jpeg)] h-screen w-full items-center flex justify-center'>
      <div className='child'>
        <div className='box1'>
          <h1 className='text-3xl text-white underline'>Login</h1>
        </div>

        <div className='box2'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Username</label>
            <input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='lbtn' type='submit'>Submit</button>
          </form>
        </div>
        <Link to={`/forgot-password`} className="text-blue-600 hover:underline mt-4 inline-block">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}

export default Login;
