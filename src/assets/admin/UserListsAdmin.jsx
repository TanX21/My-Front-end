import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/admin/users", { withCredentials: true });
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-none space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition ${user.role === "admin" ? "border-2 bg-gray-600" : "bg-white"}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {/* User Profile Picture */}
                  <img
                    src={user.profilePictureUrl || "https://via.placeholder.com/50"}
                    alt={user.username}
                    className="w-15 h-15 rounded-full mr-4"
                  />
                  <div>
                    <h3 className={`text-xl font-semibold ${user.role === "admin" ? "text-white" : "text-black"}`}>
                      {user.username}
                    </h3>
                    {/* <p className="text-gray-600">{user.email}</p> */}
                    <p className={`text-gray-600 ${user.role === "admin" ? "text-white" : "text-black"}`}>{user.email}</p>
                    <p className={`text-sm ${user.role === "admin" ? "text-white" : "text-gray-500"}`}>Role : {user.role}</p>
                    <p className="text-sm text-green-500 font-semibold">{user.isVerified ? "Verified" : "Not Verified"}</p>
                  </div>
                </div>
                <button className="bg-yellow-300 text-blue-600 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300">
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
