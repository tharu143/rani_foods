import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      // If login is successful, redirect to the admin dashboard
      if (response.data.success) {
        setError('');
        navigate('/admin-dashboard'); // Redirect to dashboard
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-dark-green mb-6 text-center">Login</h2>

      {/* Error message */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mt-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 mt-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-dark-green text-white py-2 rounded-md hover:bg-light-green"
          >
            Login
          </button>
        </div>
      </form>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-light-green hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
