import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ favoritesCount, searchQuery, onSearchChange, user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [user, setUser] = useState(null);
  
  const genres = [
    "Fiction",
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Biography",
    "History",
    "Technology",
    "Religion"
  ];
  // console.log("Profile Picture URL:", user.profilePictureUrl);
  // console.log("User object:", user);
  console.log("Favorites", favoritesCount);
  



  return (
    <nav className={`bg-black p-4 fixed top-0 left-0 w-full z-50 ${isMenuOpen ? 'mb-32' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo - Text-based */}
        <Link to="/" className="text-white text-2xl font-bold">BookStore</Link>
        
        {/* Desktop View */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar with Input Field */}
          <input
            type="text"
            placeholder="Search Books..."
            className="p-2 w-80 mr-4 border border-gray-400 rounded text-white"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <Link to="/" className="text-white hover:text-yellow-300">Home</Link>

          <div className="relative">
            <Link to="#" className="text-white hover:text-yellow-300" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Genre
            </Link>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-black text-white rounded shadow-lg">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-yellow-300 hover:text-black">
                      <Link to={`/genre/${encodeURIComponent(genre.toLowerCase().replace(/\s+/g, '-'))}`} className="block">
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {user ? (
            <>
              <Link to="/favorites" className="text-white hover:text-yellow-300 flex items-center">
                <span className="mr-2">Favorites</span>
                {favoritesCount > 0 ? (
                  <span className="bg-yellow-300 text-black rounded-full px-1 py-0.5">{favoritesCount}</span>
                ) : (
                  <span className="text-gray-400">No favorites</span>
                )}
              </Link>
              <span className="text-white">Welcome, {user.username}</span>
              <span>
                      {/* Profile Picture */}
              {user.profilePictureUrl && (
                <img
                  src={user.profilePictureUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              </span>
              <button onClick={onLogout} className="bg-black text-amber-600 hover:text-yellow-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-yellow-300">Login</Link>
              <Link to="/signup" className="text-white hover:text-yellow-300">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile View - Hamburger Icon */}
        <div className="md:hidden flex items-center h-0">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none m-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black p-4">
          {/* Search Bar for Mobile */}
          <input
            type="text"
            placeholder="Search Books..."
            className="p-2 w-full mb-4 border border-gray-400 rounded text-white"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <Link to="/" className="block text-white hover:text-yellow-300 mb-2">Home</Link>
          <div className="relative mb-2">
            <Link to="#" className="block text-white hover:text-yellow-300" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Genre
            </Link>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-black text-white rounded shadow-lg">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-yellow-300 hover:text-black">
                      <Link to={`/genre/${encodeURIComponent(genre.toLowerCase().replace(/\s+/g, '-'))}`} className="block">
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {user ? (
            <>
              <Link to="/favorites" className="block text-white hover:text-yellow-300 mb-2">Favorites</Link>
              <span className="text-white mb-2">Welcome, {user.username}</span>
              {/* Profile Picture for Mobile */}
              {user.profilePictureUrl && (
                <img
                  src={user.profilePictureUrl}
                  alt="Profile"
                  className="w-auto h-auto rounded-full mb-2 p-10 object-cover"
                />
              )}
              <button onClick={onLogout} className="bg-black text-amber-600 hover:text-yellow-300 w-full pt-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white hover:text-yellow-300 mb-2">Login</Link>
              <Link to="/signup" className="block text-white hover:text-yellow-300">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
