import React, { useEffect, useState } from "react";
import axios from "axios";
import api from '../../axiosIntance.js';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users", { withCredentials: true });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-3">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-none space-y-6">
          {users.map((user) => (
            <li
              key={user._id}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition ${user.role === "admin" ? "border-2 border-gray-700 bg-gray-800" : "bg-white"}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row items-center md:mb-0">
                  {/* User Profile Picture */}
                  <img
                    src={user.profilePictureUrl || "https://via.placeholder.com/50"}
                    alt={user.username}
                    className="w-20 h-20 rounded-full mb-2 md:mb-0 md:mr-6"
                  />
                  <div className="text-center p-1 md:text-left">
                    <h3 className={`text-xl font-semibold ${user.role === "admin" ? "text-white" : "text-black"}`}>
                      {user.username}
                    </h3>
                    <p className={`text-gray-600 ${user.role === "admin" ? "text-white" : "text-black"} text-xs sm:text-sm md:text-base`}>
                      {user.email}
                    </p>
                    <p className={`text-sm ${user.role === "admin" ? "text-white" : "text-gray-500"} text-xs sm:text-sm md:text-base`}>
                      Role: {user.role}
                    </p>
                    <p className="text-green-500 font-semibold text-xs sm:text-sm md:text-base">
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                </div>
                <button className="bg-yellow-300 text-blue-600 py-2 px-6 rounded-lg hover:bg-yellow-400 transition duration-300 mt-2 md:mt-0">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
