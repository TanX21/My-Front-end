import React from 'react';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../../index.css'; // Assuming you are using a global stylesheet

const ContactPage = () => {
  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="bg-[url(https://as2.ftcdn.net/v2/jpg/06/59/36/77/1000_F_659367778_NdVI1v6c7furKJE8DrEnRkVC52cHbvv1.jpg)] text-white py-40">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">Contact Us</h1>
          <p className="text-lg md:text-2xl mb-10 max-w-4xl mx-auto">
            We’d love to hear from you! Reach out to us with any questions, suggestions, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Get in Touch</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            We value your feedback and are here to help with anything you need. Reach out to us directly via phone or email.
          </p>

          <div className="space-y-4">
            <p className="text-xl font-semibold">Tanmay Dhiman</p>
            <p className="text-lg">Phone: <a href="tel:+917000184797" className="text-blue-600 hover:underline">7000184797</a></p>
            <p className="text-lg">Email: <a href="mailto:tanmay213@gmail.com" className="text-blue-600 hover:underline">tanmay213@gmail.com</a></p>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Our Core Values</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            Our mission is to create a seamless and enriching experience for our users. Here’s what we stand for:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-10">
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Customer Focused</h3>
              <p className="text-lg text-gray-700">
                We prioritize the needs and satisfaction of our customers, ensuring we offer a personalized experience that meets their expectations.
              </p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Innovation</h3>
              <p className="text-lg text-gray-700">
                We are committed to continuously improving our services and adapting to the evolving needs of our users.
              </p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Integrity</h3>
              <p className="text-lg text-gray-700">
                We operate with honesty and transparency, ensuring we build trust with our users and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">1. How can I contact you?</h3>
              <p>You can reach out to us through the contact details provided on this page. We're available by email or phone.</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">2. What is your response time?</h3>
              <p>We aim to respond to all inquiries within 1-2 business days. Your questions and concerns are important to us!</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">3. Do you have social media channels?</h3>
              <p>Yes, follow us on our social media platforms for updates, new releases, and more!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">Stay Connected</h2>
        <p className="text-lg mb-8">Follow us on our social media platforms for updates, book recommendations, and more!</p>

        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-white hover:text-yellow-300 transition">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-white hover:text-yellow-300 transition">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-white hover:text-yellow-300 transition">
            <FaInstagram />
          </a>
        </div>
      </section>

      <Toaster position="bottom-right" reverseOrder={false} /> {/* Toast container */}
    </div>
  );
};

export default ContactPage;
