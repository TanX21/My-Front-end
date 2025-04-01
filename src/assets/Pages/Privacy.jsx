import React from 'react';
import '../../index.css'; // Assuming you are using a global stylesheet

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="bg-[url(https://as2.ftcdn.net/v2/jpg/06/59/36/77/1000_F_659367778_NdVI1v6c7furKJE8DrEnRkVC52cHbvv1.jpg)] text-white py-40">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">Privacy Policy</h1>
          {/* <p className="text-lg md:text-2xl mb-10 max-w-4xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p> */}
        </div>
      </section>

      {/* Privacy Policy Overview */}
      <section className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Privacy Policy Overview</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or interact with our services. We are committed to protecting your privacy and ensuring your personal information is handled securely.
          </p>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Information We Collect</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            We collect personal information such as your email, phone number, browsing behavior, and transaction details when you use our website or services.
          </p>
        </div>
      </section>

      {/* How We Use Your Information */}
      <section className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">How We Use Your Information</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            We use your information to provide, personalize, and improve our services, respond to inquiries, and process transactions. We may also send promotional emails, but you can opt-out anytime.
          </p>
        </div>
      </section>

      {/* How We Protect Your Information */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">How We Protect Your Information</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            We use industry-standard security measures to protect your personal information, including encryption and secure storage. However, no online transmission is 100% secure, so we cannot guarantee absolute security.
          </p>
        </div>
      </section>

      {/* Sharing Your Information */}
      <section className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Sharing Your Information</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            We will not share your personal information with third parties except when required by law or to protect our rights and safety. We may share it with third-party service providers under strict confidentiality agreements.
          </p>
        </div>
      </section>

      {/* Your Rights and Choices */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Your Rights and Choices</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            You have the right to access, update, and request the deletion of your personal information. You can also opt-out of receiving marketing communications at any time.
          </p>
        </div>
      </section>

      {/* Changes to This Privacy Policy */}
      <section className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Changes to This Privacy Policy</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the effective date will be clearly indicated.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600">Contact Us</h2>
          <p className="text-lg text-gray-800 max-w-6xl mx-auto mb-8">
            If you have any questions or concerns about this Privacy Policy, feel free to contact us:
          </p>
          <p className="text-lg text-gray-700">
            Email: <a href="mailto:tanmay213@gmail.com" className="text-blue-600 hover:underline">tanmay213@gmail.com</a>
          </p>
          <p className="text-lg text-gray-700">Phone: 700-018-4797</p>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicyPage;
