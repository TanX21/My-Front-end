import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactFormList = () => {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/admin/contact-forms", { withCredentials: true });
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-none space-y-4">
          {contactForms.map((form) => (
            <li key={form._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{form.name}</h3>
                  <p className="text-gray-600">{form.email}</p>
                  <p className="mt-2">{form.message}</p>
                </div>
                <button className="bg-yellow-300 text-blue-600 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300">
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
