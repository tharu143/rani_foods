import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'All fields are required';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // API call to register admin
      const response = await axios.post('http://localhost:5000/api/admin/create', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccess('Registration successful. Redirecting to login...');
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-dark-green mb-6 text-center">Register</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-dark-green text-white py-2 rounded-md hover:bg-light-green"
          >
            Register
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-light-green hover:underline">Login here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
