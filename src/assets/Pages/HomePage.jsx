import React, { useEffect, useState } from 'react';
import api from '../../axiosIntance.js';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Import toast
import '../../index.css';
import axios from 'axios';
import { useSearch } from '../context/SearchContext.jsx';

const HomePage = ({ addFavorite }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { searchQuery } = useSearch();  // Search query from context

  // Genres for HomePage (same as BrowseBooksPage)
  const genres = [
    { name: "Fiction", color: "#4A90E2", image: "https://images.csmonitor.com/csm/2020/12/1112756_1_1209-best-2020-fiction_standard.jpg?alias=standard_900x600" },
    { name: "Fantasy", color: "#E94E77", image: "https://media.istockphoto.com/id/873507500/photo/image-of-open-antique-book-on-wooden-table-with-glitter-overlay.jpg?s=612x612&w=0&k=20&c=clB-tJl5j44IqVLlCELHVP6G-kJjeNt_nNmQi48aEKo=" },
    { name: "Mystery", color: "#9013FE", image: "https://humanitiesscholars.com/wp-content/uploads/2022/08/pexels-photo-3109168.jpeg?w=1088" }
  ];

  // Fetch books data from Google Books API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=best+books&maxResults=18&key=AIzaSyBJ_lsJaj7MJS9Lgyic6OJcTczDjiVJnlQ');
        setBooks(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the books:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Show loading spinner if books are being fetched
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // Show error message if there's an issue fetching books
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    (book.volumeInfo.title && book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (book.volumeInfo.authors && book.volumeInfo.authors.some((author) =>
      author.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  // Handle adding a book to the favorites list with toast notifications
  const handleAddFavorite = async (book) => {
    const isBookAlreadyInFavorites = favorites.some(fav => fav.id === book.id);

    if (isBookAlreadyInFavorites) {
      toast.error('This book is already in your favorites!');
      return; // Exit early without adding the book
    }

    const bookData = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      imageUrl: book.volumeInfo.imageLinks?.thumbnail,
      description: book.volumeInfo.description || "No description available",
    };

    try {
      const res = await api.post(
        '/favorites/add',
        { book: bookData },
      );
      // Update the favorites state with the new favorite book
      setFavorites((prevFavorites) => [...prevFavorites, res.data.favorite]);
      toast.success('Book added to favorites!');
    } catch (error) {
      console.log('Error adding favorite:', error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || 'Failed to add favorite.');
      } else {
        toast.error('Failed to add favorite.');
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <Toaster position="bottom-right" reverseOrder={false} /> {/* Toast container */}

      {/* Hero Section */}
      <section className="bg-[url(https://as2.ftcdn.net/v2/jpg/06/59/36/77/1000_F_659367778_NdVI1v6c7furKJE8DrEnRkVC52cHbvv1.jpg)] text-white py-35">
        <div className="container mx-auto text-center ">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-8 p-1">Welcome to Book Store</h1>
          <p className="text-lg md:text-xl ">Discover your next great read!</p>
        </div>
      </section>

      {/* Genre Containers Section (Same as BrowseBooksPage) */}
      <section className="py-8 pt-8">
        <div className="container mx-auto text-center">
            {/* Display the message if no books match the search query */}
            {filteredBooks.length === 0 && searchQuery && (
              <div className="text-center text-xl text-red-500 mb-8">
                No books found matching "{searchQuery}". Please try a different search.
              </div>
            )}
          <h2 className="text-3xl font-bold mb-5">Browse By Genre</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
            {genres.map(({ name, color, image }) => (
              <Link 
                key={name} 
                to={`/genre/${name.toLowerCase().replace(/\s+/g, '-')}`} 
                className="flex items-center justify-center p-25 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: color,
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',
                  color: 'white', // Text color
                }}
              >
                <span className="text-3xl font-semibold">{name}</span>
              </Link>
            ))}
          </div>

          {/* Browse More Button moved below the genre containers */}
          <div className="text-center">
            <Link to="/browsebooks" className="bg-yellow-300 text-blue-600 font-semibold py-2 px-8 rounded hover:bg-orange-400 transition duration-300">
              Browse More Books
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-5">Featured Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
            

            {/* Display books if available */}
            {filteredBooks.length > 0 && filteredBooks.map((book) => (
              <div key={book.id} className="bg-white pt-8 shadow-lg rounded-lg overflow-hidden">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/300x400'}
                  alt={book.volumeInfo.title || 'Untitled'}
                  className="w-full h-64 object-contain"
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold">{book.volumeInfo.title || 'Untitled'}</h3>
                  <p className="text-gray-600">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                  <p className="mt-2">{book.volumeInfo.description?.substring(0, 100) || 'No description available'}</p>
                  <Link to={`/read/${book.id}`} className="text-blue-600 hover:underline mt-4 inline-block">Read More</Link><br />
                  <button
                    onClick={() => handleAddFavorite(book)} // Handle favorite click with toast
                    className="bg-yellow-300 text-blue-600 font-semibold py-2 px-4 rounded mt-4 hover:bg-yellow-400 transition duration-300"
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
