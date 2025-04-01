import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation (you can expand this)
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('All fields are required.');
      toast.error('Please fill in all fields.'); // Toast on error
      setIsSubmitting(false);
      return;
    }

    try {
      // Send form data to the backend API using axios
      const response = await axios.post('http://localhost:3005/api/favorites/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setFormStatus(response.data.success);
        setFormData({ name: '', email: '', message: '' }); // Clear form
        toast.success('Message sent successfully!'); // Toast on success
      } else {
        setFormStatus(response.data.error || 'An error occurred.');
        toast.error(response.data.error || 'An error occurred.'); // Toast on error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('An error occurred while sending your message.');
      toast.error('An error occurred while sending your message.'); // Toast on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-r from-gray-800 to-black text-white py-10">
        <div className="container mx-auto px-4 lg:px-10">
          {/* Main Flex Container */}
          <div className="flex flex-col lg:flex-row justify-evenly items-start">
            {/* Footer Links (Left Section) */}
            <div className="flex flex-col space-y-4 mb-6 lg:mb-0 lg:w-1/3">
              <span className="text-5xl font-bold mt-12">
                BookStore
              </span>
              <div className="space-y-2 flex flex-col mt-4">
                <a href="/about" className="hover:text-yellow-300 transition duration-300">About Us</a>
                <a href="/contact" className="hover:text-yellow-300 transition duration-300">Contact</a>
                <a href="/privacy" className="hover:text-yellow-300 transition duration-300">Privacy Policy</a>
                <a href="/terms" className="hover:text-yellow-300 transition duration-300">Terms & Conditions</a>
                <a href="/admin" className="hover:text-yellow-300 transition duration-300">Admin Panel</a>
              </div>
            </div>

            {/* Contact Form (Right Section) */}
            <div className="max-w-lg w-full lg:w-2/3 flex flex-col mb-6 lg:ml-10">
              <h1 className="text-2xl font-semibold mb-4 text-center mt-10">Contact Us</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    rows="4"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-yellow-300 text-blue-600 font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>

              {/* Status Message */}
              {formStatus && (
                <p className={`mt-4 ${formStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                  {formStatus}
                </p>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-6 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-yellow-300 transition duration-300">
              <FaFacebookF className="mr-1" /> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-yellow-300 transition duration-300">
              <FaTwitter className="mr-1" /> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-yellow-300 transition duration-300">
              <FaInstagram className="mr-1" /> Instagram
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center lg:text-left">
            &copy; {new Date().getFullYear()} BookStore. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Toast Container */}
      <Toaster position="top-center" /> {/* This renders the toast notifications */}
    </>
  );
};

export default Footer;
