import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdDeleteForever } from 'react-icons/md';
import api from '../../axiosIntance.js';

const ManageAccountPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false); // Manage the password prompt
  const [password, setPassword] = useState(''); // Store the entered password
  const [passwordError, setPasswordError] = useState(''); // Error message for password validation

  useEffect(() => {
    if (user) {
      setNewEmail(user.email || '');
      setProfilePicture(user.profilePictureUrl || '');
      setNewUsername(user.username || '');
    }
  }, [user]);

  if (!user) {
    return <div className="p-40 mt-8 text-xl justify-center flex">Loading...</div>;
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUser = { username: newUsername, email: newEmail, profilePictureUrl: profilePicture };
      await api.put('/user/update', updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
    }
  };

  const handleDeleteAccount = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }
    setShowPasswordPrompt(true); // Show the password prompt after confirmation
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    try {
      // Call an API endpoint to verify the user's password before deleting account
      const response = await api.post('/user/verify-password', { password });

      if (response.data.success) {
        // Proceed with account deletion
        await api.delete('/user/delete');
        onLogout();
        toast.success('Account deleted successfully');
        navigate('/');
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    } catch (error) {
      toast.error('Error deleting account. Please try again.');
    } finally {
      setPassword(''); // Clear the password field after the submission attempt
    }
  };

  return (
    <div className="bg-gray-100 mx-auto my-auto py-15 px-10 pt-25">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Manage Your Account</h1>

        {/* Profile Picture Section */}
        <div className="flex flex-col justify-center items-center mb-4">
          <img
            src={profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              className="p-8"
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>

        {/* Username & Email Update Form */}
        <div className="mb-4">
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        {/* Save Changes Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mb-6">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Change Password?
          </Link>
        </div>

        {/* Delete Account Section */}
        <div className="flex flex-col items-center bg-red-100 p-6 rounded-lg mt-6 text-center">
          <h3 className="font-semibold text-red-600 mb-2">Delete Your Account</h3>
          <p className="text-red-500 mb-4">
            This action is irreversible. If you wish to delete your account, click below.
          </p>
          <button
            onClick={handleDeleteAccount}
            className={`flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300`}
          >
            {isDeleting ? 'Are you sure?' : 'Delete Account'}
            <MdDeleteForever className="ml-2" />
          </button>
        </div>

        {/* Password Prompt Modal */}
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 p-3">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-4">Please enter your password to confirm account deletion:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <div className="flex justify-between">
                <button
                  onClick={() => setShowPasswordPrompt(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Confirm Deletion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccountPage;
