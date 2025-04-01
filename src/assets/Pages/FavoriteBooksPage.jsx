import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Import toast and Toaster from react-hot-toast
import '../../index.css'; // Adjust the path accordingly
import api from '../../axiosIntance.js';
import { useSearch } from '../context/SearchContext.jsx'; // Import the search context

const FavoriteBooksPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch(); // Get the search query from context

  // Fetch the favorite books of the user
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites', { withCredentials: true });
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
      const response = await api.delete(`/favorites/remove/${bookId}`, { withCredentials: true });

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

  // Filter books based on search query
  const filteredFavorites = favorites.filter((book) =>
    (book.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (book.authors && book.authors.some((author) =>
      author.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  // Check if there are no favorites at all
  const noFavorites = favorites.length === 0;

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 p-3">
        <div className="container mx-auto text-center mt-8">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">Favorite Books</h1>
          <p className="text-lg md:text-xl">Here are all the books you've added to your favorites!</p>
        </div>
      </section>

      {/* Favorite Books Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Your Favorites</h2>

          {/* Show a message if no books match the search */}
          {filteredFavorites.length === 0 && searchQuery && (
            <div className="text-center text-xl text-red-500 mb-8 mt-8">
              No books found matching "{searchQuery}". Please try a different search.
            </div>
          )}

          {/* Display a message if there are no favorite books */}
          {noFavorites && !loading && !error && (
            <div className="text-center text-xl text-gray-500 mb-8">
              No favorite books yet. Start adding some!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
            {/* Display filtered favorites */}
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map((book) => (
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
              <p></p>
            )}
          </div>
        </div>
      </section>

      {/* Toast Container (This will manage all toast notifications) */}
      <Toaster />
    </div>
  );
};

export default FavoriteBooksPage;
