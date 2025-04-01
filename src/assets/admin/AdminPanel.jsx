import React from "react";
import UserList from "./UserListsAdmin";
import ContactFormList from "./ContactAdmin";
import AdminFavorites from "./FavoritesAdmin"; // Import the new AdminFavorites component

const AdminPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[url(https://as2.ftcdn.net/v2/jpg/06/59/36/77/1000_F_659367778_NdVI1v6c7furKJE8DrEnRkVC52cHbvv1.jpg)] text-white py-40">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Admin Panel</h1>
          <p className="text-lg md:text-xl">Manage users and contact submissions</p>
        </div>
      </section>

      {/* Admin Content Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Admin Dashboard</h2>

          {/* Stack the components vertically */}
          <div className="space-y-8 p-10">
            {/* User List Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Users</h3>
                <UserList />
              </div>
            </div>

            {/* Contact Form Submissions Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Contact Form Submissions</h3>
                <ContactFormList />
              </div>
            </div>

            {/* All Users' Favorites Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">All Users' Favorites</h3>
                <AdminFavorites /> {/* This is where the favorites component is displayed */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
