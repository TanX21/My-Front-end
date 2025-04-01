import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Import toast and Toaster from react-hot-toast
import '../../index.css'; // Adjust the path accordingly

const FavoriteBooksPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the favorite books of the user
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/favorites', { withCredentials: true });
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load your favorite books.");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Handle removing a book from favorites
  const handleRemoveFromFavorites = async (bookId) => {
    try {
      // Use _id from the book (or change this to 'id' if needed)
      const response = await axios.delete(`http://localhost:3005/api/favorites/remove/${bookId}`, { withCredentials: true });

      // Filter out the removed book from the favorites state
      setFavorites(favorites.filter((book) => book._id !== bookId));

      // Show success toast
      toast.success("Book removed from favorites successfully!");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setError("Failed to remove the book from your favorites.");
      toast.error("Failed to remove the book from favorites.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading your favorite books...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Favorite Books</h1>
          <p className="text-lg md:text-xl mb-8">Here are all the books you've added to your favorites!</p>
        </div>
      </section>

      {/* Favorite Books Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Your Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
            {favorites.length > 0 ? (
              favorites.map((book) => (
                <div key={book._id} className="bg-white pt-8 shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={book.imageUrl || "https://via.placeholder.com/300x400"}
                    alt={book.title}
                    className="w-full h-64 object-contain"
                  />
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-600">{book.authors?.join(', ')}</p>
                    <p className="mt-2">{book.description?.substring(0, 100)}...</p>
                    <Link to={`/read/${book.id}`} className="text-blue-600 hover:underline mt-4 inline-block">
                      Read More
                    </Link><br />

                    {/* Remove from favorites button */}
                    <button
                      onClick={() => handleRemoveFromFavorites(book._id)} // Ensure correct usage of _id here
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-red-600 transition duration-300"
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No favorite books yet. Start adding some!</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* Your footer code here */}

      {/* Toast Container (This will manage all toast notifications) */}
      <Toaster />
    </div>
  );
};

export default FavoriteBooksPage;
