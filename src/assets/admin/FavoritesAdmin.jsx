import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import api from '../../axiosIntance.js';


const AdminFavorites = () => {
  const [favoritesData, setFavoritesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllFavorites = async () => {
      try {
        const res = await api.get('/admin/favorites', {
          withCredentials: true,  // Ensure cookies (for JWT token) are sent with request
        });
        setFavoritesData(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching all users' favorites");
        setLoading(false);
        toast.error('Access Denied ! Only Admins');
      }
    };

    fetchAllFavorites();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>All Users' Favorites</h1> */}
      {error && <div className="error">{error}</div>}
      <ul>
        {favoritesData.length > 0 ? (
          favoritesData.map((userFavorites, index) => (
            <li key={index}>
              <h2 className='text-2xl font-semibold mt-8'>{userFavorites.username}'s Favorites:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userFavorites.favorites.map((favorite, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">{favorite.title}</h3>
                    <img
                      src={favorite.imageUrl}
                      alt={favorite.title}
                      className="w-full h-40 object-cover rounded-lg mt-2"
                    />
                    {/* You can optionally add a description here */}
                    {/* <p>{favorite.description}</p> */}
                  </div>
                ))}
              </div>
            </li>
          ))
        ) : (
          <div>No favorites found for any user.</div>
        )}
      </ul>
    </div>
  );
};

export default AdminFavorites;
