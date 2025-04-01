import React, { useEffect, useState } from "react";
import api from '../../axiosIntance.js';

const ContactFormList = () => {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        const response = await api.get("/admin/contact-forms", { withCredentials: true });
        setContactForms(response.data.contactForms);
      } catch (error) {
        console.error("Error fetching contact forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactForms();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <ul className="list-none space-y-4">
          {contactForms.map((form) => (
            <li
              key={form._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-4 sm:mb-0 sm:w-3/4">
                  <h3 className="text-xl font-semibold text-gray-900">{form.name}</h3>
                  <p className="text-gray-600">{form.email}</p>
                  <p className="mt-2 text-gray-700">{form.message}</p>
                </div>
                <button className="bg-yellow-300 text-blue-600 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300 mt-4 sm:mt-0 sm:w-auto w-full text-center">
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactFormList;
