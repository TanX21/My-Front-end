import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const TermsConditionsPage = () => {
  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="bg-[url(https://as2.ftcdn.net/v2/jpg/06/59/36/77/1000_F_659367778_NdVI1v6c7furKJE8DrEnRkVC52cHbvv1.jpg)] text-white py-40">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-1 tracking-wide">Terms and Conditions</h1>
          <p className="text-lg md:text-2xl max-w-4xl mx-auto p-3">
            Please read our terms and conditions carefully before using our services.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center p-2">
          <h2 className="text-5xl font-extrabold mb-8 text-blue-600">Introduction</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            Welcome to BookStore. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using this site, you agree to comply with these terms. If you disagree with any part of the terms, please refrain from using our website.
          </p>
        </div>
      </section>

      {/* User Responsibilities Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">User Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Account Creation</h3>
              <p className="text-lg text-gray-700">
                Users must create an account to access certain features of the site, such as saving favorites or making purchases. You are responsible for maintaining the confidentiality of your account and password.
              </p>
            </div>
            <div className="bg-white p-10 shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">Acceptable Use</h3>
              <p className="text-lg text-gray-700">
                You agree not to use the platform for any unlawful or prohibited activities. This includes activities that may harm or disrupt the services, systems, or network of the website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright and Intellectual Property Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center p-2">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">Intellectual Property</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            All content, including text, images, logos, graphics, and software, is the property of BookStore or its licensors and is protected by copyright laws. You are granted a limited, non-transferable license to access and use the website for personal, non-commercial purposes only.
          </p>
        </div>
      </section>

      {/* Limitations of Liability Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center p-2">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">Limitations of Liability</h2>
          <p className="text-lg text-gray-700 max-w-6xl mx-auto mb-8">
            BookStore will not be held liable for any damages resulting from the use of our services, including direct, indirect, or consequential damages. This includes any errors or omissions in the content or interruptions in service.
          </p>
        </div>
      </section>

      {/* Governing Law Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center p-2">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">Governing Law</h2>
          <p className="text-lg text-gray-700 max-w-6xl mx-auto mb-8">
            These terms are governed by and construed in accordance with the laws of your country or jurisdiction. Any disputes arising under these terms will be subject to the exclusive jurisdiction of the courts in that jurisdiction.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 bg-white p-2">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-600">Contact Us</h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto mb-6">
            If you have any questions about these Terms and Conditions, please feel free to contact us.
          </p>
          <div className="text-lg text-gray-700">
            <p>Email: <a href="mailto:info@bookstore.com" className="text-blue-600">tanmay213@gmail.com</a></p>
            <p>Phone: 700-018-4797</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-blue-600 text-center text-white p-2">
        <h2 className="text-4xl font-extrabold mb-6">Join Our Community</h2>
        <p className="text-lg mb-8">Sign up today to start your reading journey with us!</p>
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

export default TermsConditionsPage;
