import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineManageAccounts } from 'react-icons/md';  // Import the logo icon
import { useSearch } from '../context/SearchContext';

const Navbar = ({ favoritesCount, user, onLogout }) => {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [genreDropdownTimeout, setGenreDropdownTimeout] = useState(null);
  const [accountDropdownTimeout, setAccountDropdownTimeout] = useState(null);
  const { searchQuery, updateSearchQuery } = useSearch();
  

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

  // Handle hover for genre dropdown
  const handleGenreHover = () => {
    if (!isGenreDropdownOpen) {
      setIsGenreDropdownOpen(true);
    }
    if (genreDropdownTimeout) {
      clearTimeout(genreDropdownTimeout); // Clear any previous timeout
    }
  };

  const handleGenreLeave = () => {
    if (!isGenreDropdownOpen) return;
    // Set a 5-second delay before closing the genre dropdown
    const timeout = setTimeout(() => {
      setIsGenreDropdownOpen(false);
    }, 2000);
    setGenreDropdownTimeout(timeout);
  };

  // Handle hover for account dropdown
  const handleAccountHover = () => {
    if (!isAccountDropdownOpen) {
      setIsAccountDropdownOpen(true);
    }
    if (accountDropdownTimeout) {
      clearTimeout(accountDropdownTimeout); // Clear any previous timeout
    }
  };

  const handleAccountLeave = () => {
    if (!isAccountDropdownOpen) return;
    // Set a 5-second delay before closing the account dropdown
    const timeout = setTimeout(() => {
      setIsAccountDropdownOpen(false);
    }, 2000);
    setAccountDropdownTimeout(timeout);
  };

  const handleGenreClick = () => {
    setIsGenreDropdownOpen(prevState => !prevState);
  };

  const handleAccountClick = () => {
    setIsAccountDropdownOpen(prevState => !prevState);
  };

  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);  // Update the search query
  };

  // useEffect(() => {
  //   let timeout;
  //   if (isMenuOpen) {
  //     timeout = setTimeout(() => {
  //       setIsMenuOpen(false);  // Close the menu after 3 seconds
  //     }, 3000);
  //   }

  //   return () => {
  //     if (timeout) clearTimeout(timeout);  // Cleanup timeout on component unmount or when menu state changes
  //   };
  // }, [isMenuOpen])
  const menuRef = useRef(null);

  // Close the mobile menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if click is outside of it
      }
    };

    // Add event listener for clicks outside the menu
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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
            onChange={handleSearchChange}
          />
          <Link to="/" className="text-white hover:text-yellow-300">Home</Link>

          <div className="relative">
            <Link 
              to="#" 
              className="text-white hover:text-yellow-300" 
              onClick={handleGenreClick}  // Toggle dropdown on click
              onMouseEnter={handleGenreHover}  // Open on hover
              onMouseLeave={handleGenreLeave}  // Close on hover leave
            >
              Genre
            </Link>
            {isGenreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40  bg-black text-white rounded shadow-lg">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index} className="px-4 py-2.5 hover:bg-yellow-300 hover:text-black">
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
              <div className="relative flex items-center">
                <span className="mr-2 text-white">Welcome, {user.username}</span>
                {user.profilePictureUrl && (
                  <img
                    src={user.profilePictureUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                <div className='relative'>
                {/* Add Manage Accounts Logo */}
                <button 
                  className="text-white hover:text-yellow-300 mr-2" 
                  onClick={handleAccountClick}  // Toggle dropdown on click
                  onMouseEnter={handleAccountHover}  // Open on hover
                  onMouseLeave={handleAccountLeave}  // Close on hover leave
                >
                  <MdOutlineManageAccounts className="w-6 h-6" />
                </button>
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded shadow-lg">
                    <ul>
                      <li className="px-4 py-2.5 hover:bg-yellow-300 hover:text-black">
                        <Link to="/account" className="block">Manage Account</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-yellow-300 hover:text-black">
                        <button onClick={onLogout} className="block w-full ">Logout</button>
                      </li>
                    </ul>
                  </div>
                )}</div>
              </div>
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
        <div ref={menuRef} className="md:hidden bg-black p-4">
          {/* Search Bar for Mobile */}
          <input
            type="text"
            placeholder="Search Books..."
            className="p-2 w-full mb-4 border border-gray-400 rounded text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Link to="/" className="block text-white hover:text-yellow-300 mb-2">Home</Link>
          <div className="relative mb-2">
            <Link 
              to="#" 
              className="block text-white hover:text-yellow-300" 
              onClick={handleGenreClick}  // Toggle dropdown on click
              // onMouseEnter={handleGenreHover}  // Open on hover
              onMouseLeave={handleGenreLeave}  // Close on hover leave
            >
              Genre
            </Link>
            {isGenreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-black text-white rounded shadow-lg">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index} className="px-4 py-2.5 hover:bg-yellow-300 hover:text-black">
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
              {user.profilePictureUrl && (
                <img
                  src={user.profilePictureUrl}
                  alt="Profile"
                  className="w-auto h-auto rounded-full mb-2 p-10 object-cover"
                />
              )}
              <div className="relative">
                <button 
                  className="block text-white hover:text-yellow-300 w-full" 
                  onClick={handleAccountClick}  // Toggle dropdown on click
                  // onMouseEnter={handleAccountHover}  // Open on hover
                  onMouseLeave={handleAccountLeave}  // Close on hover leave
                >
                  Account Options
                </button>
                {isAccountDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-black text-white rounded shadow-lg">
                    <ul>
                      <li className="px-4 py-2.5 hover:bg-yellow-300 hover:text-black">
                        <Link to="/account" className="block">Manage Account</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-yellow-300 hover:text-black">
                        <button onClick={onLogout} className="block w-full text-left">Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
