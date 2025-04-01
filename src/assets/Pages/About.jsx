import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const AboutPage = () => {
  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="bg-[url(https://as2.ftcdn.net/v2/jpg/06/59/36/77/1000_F_659367778_NdVI1v6c7furKJE8DrEnRkVC52cHbvv1.jpg)] text-white py-40">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">About Us</h1>
          <p className="text-lg md:text-2xl mb-10 max-w-4xl mx-auto">
            Discover how we aim to make book discovery simple, fun, and accessible for all readers around the world!
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-8 text-blue-600">Our Mission</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            At Book Store, we are passionate about making books more accessible and enjoyable. We believe that books can transform lives, fuel imaginations, and connect people to new worlds. Our goal is to create a platform where readers can explore an extensive library, discover hidden gems, and track their favorite reads effortlessly.
          </p>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto">
            Whether you're a casual reader or a bookworm, we provide a seamless experience that helps you find books that align with your taste, genre preference, and reading history. Our handpicked categories, advanced search options, and personalized book recommendations aim to help you uncover books you might not have found otherwise.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-10">
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Browse Books</h3>
              <p className="text-lg text-gray-700">
                Explore a vast library of books across various genres, including fiction, fantasy, mystery, and more. Whether you’re looking for something new or want to explore a specific genre, we’ve got you covered. The search bar and intuitive filters make it easy to find your next read.
              </p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Add to Favorites</h3>
              <p className="text-lg text-gray-700">
                When you find a book that excites you, simply add it to your favorites! Our platform allows you to save books you’re interested in for future reference. This way, you’ll never lose track of a book that piques your interest, making it easy to revisit them whenever you want.
              </p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Read More</h3>
              <p className="text-lg text-gray-700">
                Dive deeper into each book with detailed descriptions, reviews, and ratings. Whether you’re reading a sample or researching the author’s background, you’ll have all the information you need to make an informed decision about your next purchase or read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">Contact Us</h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto mb-6">
            We value your feedback and would love to hear from you! Whether you have a suggestion, need assistance, or just want to say hello, we’re here to help.
          </p>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto mb-8">
            Reach out to us via email or phone, and we’ll get back to you as soon as possible. Your experience matters to us, and we’re committed to providing you with the best possible service.
          </p>
          <div className="text-lg text-gray-700">
            <p>Email: <a href="mailto:info@bookstore.com" className="text-blue-600">tanmay213@gmail.com</a></p>
            <p>Phone: 700-018-4797</p>
            <p>Follow us on social media for updates, book recommendations, and more!</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">Start Your Reading Journey Today</h2>
        <p className="text-lg mb-8">Join our community of book lovers and discover books that will ignite your passion for reading!</p>
        <Link
          to="/browsebooks"
          className="bg-yellow-300 text-blue-600 font-bold py-4 px-12 rounded-lg shadow-xl hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
        >
          Browse Books Now
        </Link>
      </section>

    </div>
  );
};

export default AboutPage;
