// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './assets/Pages/signup';
import HomePage from './assets/Pages/HomePage';
import { Toaster, toast } from 'react-hot-toast';
import Login from './assets/Pages/login';
import BookDetails from './assets/Pages/BookCard';
import Navbar from './assets/Component/Navbar';
import axios from 'axios';
import FavoriteBooksPage from './assets/Pages/FavoriteBooksPage';
import Footer from './assets/Component/Footer';
import OtpVerification from './assets/Pages/OtpVerification';
import GenrePage from './assets/Pages/GenrePage';
import ResetPassword from './assets/Pages/ResetPassword';
import ForgetPasswordOtp from './assets/Pages/ForgetPasswordOtp';
import ForgotPassword from './assets/Pages/ForgotPassword';
import BrowseBooksPage from './assets/Pages/BrowseBooksPage';
import AdminPanel from './assets/admin/AdminPanel';
import AboutPage from './assets/Pages/About';
import ContactPage from './assets/Pages/Contact';
import PrivacyPolicyPage from './assets/Pages/Privacy';
import api from './axiosIntance';
import TermsConditionsPage from './assets/Pages/TermsConditions';
import { useSearch } from './assets/context/SearchContext';
import ManageAccountPage from './assets/Pages/ManageAccount';
import ScrollToTop from './assets/context/ScrollTop';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { searchQuery, updateSearchQuery } = useSearch(); // This should now work because it's inside the SearchProvider

  // Fetch the logged-in user's data (username) if they are authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user', { withCredentials: true });
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setUser(null);
        } else {
          console.log('Error fetching user data:', error);
        }
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch the favorites data when the user is authenticated
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const res = await api.get('/favorites', { withCredentials: true });
          setFavorites(res.data);
        } catch (error) {
          console.log('Error fetching favorites:', error);
          toast.error('Failed to load favorites.');
        }
      };
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addFavorite = async (book) => {
    const isBookAlreadyInFavorites = favorites.some(fav => fav.id === book.id);

    if (isBookAlreadyInFavorites) {
      toast.error('This book is already in your favorites!');
      return;
    }

    const bookData = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      imageUrl: book.volumeInfo.imageLinks?.thumbnail,
      description: book.volumeInfo.description || "No description available",
    };

    try {
      const res = await api.post('/favorites/add', { book: bookData }, { withCredentials: true });
      setFavorites(prevFavorites => [...prevFavorites, res.data.favorite]);
      toast.success('Book added to favorites!');
    } catch (error) {
      console.log('Error adding favorite:', error);
      toast.error('Failed to add favorite.');
    }
  };

  const removeFavorite = async (bookId) => {
    try {
      await api.delete(`/favorites/${bookId}`, { withCredentials: true });
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== bookId));
      toast.success('Book removed from favorites!');
    } catch (error) {
      console.log('Error removing favorite:', error);
      toast.error('Failed to remove favorite.');
    }
  };

  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await api.post('/user/logout', {}, { withCredentials: true });
      setUser(null);
      setFavorites([]);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.log('Error logging out:', error);
      toast.error('Failed to log out.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar
          favoritesCount={favorites.length}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          user={user}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} addFavorite={addFavorite} />} />
          <Route path="/read/:bookId" element={<BookDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/favorites" element={<FavoriteBooksPage favorites={favorites} removeFavorite={removeFavorite} />} />
          <Route path="/genre/:genreName" element={<GenrePage addFavorite={addFavorite} />} />
          <Route path="/verification" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-verification" element={<ForgetPasswordOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/browsebooks" element={<BrowseBooksPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/account" element={<ManageAccountPage user={user} />} />

        </Routes>

        <Footer />
      </div>

      <Toaster />
    </Router>
  );
}

export default App;
