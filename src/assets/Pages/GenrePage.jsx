import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSearch } from '../context/SearchContext';

const GenrePage = ({ addFavorite }) => {
  const { genreName } = useParams(); // Get genre from URL parameter
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalItems, setTotalItems] = useState(0); // Total number of books available
  const { searchQuery } = useSearch(); // Get the search query from context

  const resultsPerPage = 21;

  // Fetch books when the component mounts or when the page/genre changes
  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const startIndex = (currentPage - 1) * resultsPerPage;
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${genreName}&maxResults=${resultsPerPage}&startIndex=${startIndex}&key=AIzaSyBJ_lsJaj7MJS9Lgyic6OJcTczDjiVJnlQ`
        );
        setBooks(response.data.items);
        setTotalItems(response.data.totalItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books by genre:', error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooksByGenre();
  }, [genreName, currentPage]); // Add currentPage to the dependency array to trigger re-fetch on page change

  // Handle next page
  const handleNextPage = () => {
    if (currentPage * resultsPerPage < totalItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading books...</div>;
  }

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

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 mt-8">
          {genreName.charAt(0).toUpperCase() + genreName.slice(1)} Books
        </h1>

        {/* Show message when no books match the search query */}
        {filteredBooks.length === 0 && searchQuery && (
          <div className="text-center text-xl text-red-500 mb-8">
            No books found matching "{searchQuery}". Please try a different search.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
          {filteredBooks.map((book) => (
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

                {/* Read More Link */}
                <Link to={`/read/${book.id}`} className="text-blue-600 hover:underline mt-4 inline-block">
                  Read More
                </Link>
                <br />
                {/* Add to Favorites Button */}
                <button
                  onClick={() => addFavorite(book)} // Handle favorite click
                  className="bg-yellow-300 text-blue-600 font-semibold py-2 px-4 rounded mt-4 hover:bg-yellow-400 transition duration-300"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handlePrevPage}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg">{`Page ${currentPage}`}</span>
          <button
            onClick={handleNextPage}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={currentPage * resultsPerPage >= totalItems}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
