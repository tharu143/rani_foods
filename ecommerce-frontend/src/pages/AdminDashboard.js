import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear any authentication tokens or session data here (if implemented)
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-dark-green text-center mb-6">Admin Dashboard</h1>

      {/* Dashboard Actions */}
      <div className="space-y-4">
        <button
          className="w-full bg-dark-green text-white py-2 rounded-md hover:bg-light-green"
          onClick={() => navigate('/manage-products')}
        >
          Manage Products
        </button>

        <button
          className="w-full bg-dark-green text-white py-2 rounded-md hover:bg-light-green"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
